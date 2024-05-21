import React, { memo, useEffect, useState } from "react";
import "./style.scss";
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import { formatter } from "../../../utils/formatter";
import axios from "axios";
import { useParams } from "react-router-dom";

const DetailProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch product details from the backend API
        axios.get(`http://localhost:8080/api/products/${productId}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the product details!", error);
            });
    }, [productId]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-details">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="product__details__pic">
                            <div className="product__details__pic__item">
                                <img className="product__details__pic__item--large" src={product.imageUrl} alt={product.name} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="product__details__text">
                            <h3>{product.name}</h3>
                            <div className="product__details__price">{formatter(product.price)}</div>
                            <p>{product.description}</p>
                            <div className="product__details__quantity">
                                <div className="quantity">
                                    <div className="pro-qty">
                                        <input type="number" value="1" />
                                    </div>
                                </div>
                            </div>
                            <a href="#" className="primary-btn">Thêm vào giỏ hàng</a>
                            <ul>
                                <li><b>Loại:</b> <span>{product.categoryName}</span></li>
                                <li><b>Số lượng còn lại:</b> <span>{product.quantityAvailable}</span></li>
                                <li><b>Trọng lượng:</b> <span>{product.weight} {product.unit}</span></li>
                                <li><b>Share on</b>
                                    <div className="share">
                                        <a href=""><AiFillFacebook /></a>
                                        <a href=""><AiOutlineInstagram /></a>
                                        <a href=""><AiFillGooglePlusCircle /></a>
                                        <a href=""><AiFillTwitterSquare /></a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(DetailProduct);