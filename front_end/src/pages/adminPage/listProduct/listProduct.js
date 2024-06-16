import React, {memo, useEffect, useState} from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "./style.scss";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const ListProduct = () =>{
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch products from the backend API
        axios.get('http://localhost:8080/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });

        // Fetch categories from the backend API
        axios.get('http://localhost:8080/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the categories!", error);
            });
    }, []);
    const handleDelete = (productId) => {
        axios.put(`http://localhost:8080/api/products/${productId}`)
            .then(response => {
                console.log("Product marked as inactive successfully");
                setProducts(products.filter(product => product.productId !== productId));
            })
            .catch(error => {
                console.error("There was an error marking the product as inactive!", error);
            });
    };

    return (
        <div className="container">
            <div className="section-title">
                <h2>Danh sách sản phẩm</h2>
            </div>
            <table style={{width:"100%"}}>
                <tr>
                    <th>Xóa</th>
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>Mô tả</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Loại</th>
                    <th>Trạng thái</th>
                    <th>Chi tết</th>
                </tr>
                { products.map((item, index) => (
                    <tr key={item.productId}>
                        <td onClick={() => handleDelete(item.productId)}>-</td>
                        <td>{item.productId}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        <td>{item.quantityAvailable}</td>
                        <td>{item.categoryName}</td>
                        <td>{item.status}</td>
                        <td><Link to={`/chi-tiet-san-pham/${item.productId}`}>Click</Link></td>
                    </tr>
                ))}

            </table>
            <div className="add-product">
                <div className="section-title">
                    <h2>Thêm sản phẩm</h2>
                </div>
                <div>
                    <label>Tên sản phẩm:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Mô tả:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Giá:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Số lượng:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Loại:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Link ảnh:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Trọng lượng:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Đơn vị:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Trạng thái:</label>
                    <input type="text"/>
                </div>
                <div>
                    <button>Thêm sản phẩm</button>
                </div>
            </div>
        </div>
    );

};
export default memo(ListProduct);