import React, {memo} from "react";
import "./style.scss";
import {AiFillFacebook} from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import Item1 from "assets/users/image/trai_cay/dau_tay.jpg";
import {formatter} from "../../../utils/formatter";
const DetailProduct = () =>{
    return (
        <div className="product-details">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="product__details__pic">
                            <div className="product__details__pic__item">
                                <img className="product__details__pic__item--large"
                                     src={Item1} alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="product__details__text">
                            <h3>Dâu tây</h3>
                            <div className="product__details__price">{formatter(100000)}</div>
                            <p>Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam
                                vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet
                                quam vehicula elementum sed sit amet dui. Proin eget tortor risus.</p>
                            <div className="product__details__quantity">
                                <div className="quantity">
                                    <div className="pro-qty">
                                        <input type="number" value="1" />
                                    </div>
                                </div>
                            </div>
                            <a href="#" className="primary-btn">Thêm vào giỏ hàng</a>
                            <ul>
                                <li><b>Trạng thái:</b> <span>còn hàng</span></li>
                                <li><b>Trọng lượng:</b> <span>0.5 kg</span></li>
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