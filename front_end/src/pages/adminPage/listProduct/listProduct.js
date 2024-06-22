import React, {memo, useEffect, useState} from "react";
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

    const handleAddProduct = () => {
        const productData = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            price: document.getElementById('price').value,
            quantityAvailable: document.getElementById('quantityAvailable').value,
            categoryName: document.getElementById('categoryName').value,
            imageUrl: document.getElementById('imageUrl').value,
            weight: document.getElementById('weight').value,
            unit: document.getElementById('unit').value,
            status: document.getElementById('status').value
        };

        axios.post('http://localhost:8080/api/products/add', productData)
            .then(response => {
                console.log("Product added successfully");
                // Optionally, navigate to a different page or refresh product list
                // For simplicity, we can reload the entire product list
                axios.get('http://localhost:8080/api/products')
                    .then(response => {
                        setProducts(response.data);
                    })
                    .catch(error => {
                        console.error("Error refreshing product list after adding!", error);
                    });
            })
            .catch(error => {
                console.error("Error adding product!", error);
            });
    };


    return (
        <div className="container">
            <div className="section-title">
                <h2>Danh sách sản phẩm</h2>
            </div>
            <table style={{width:"100%"}} className="list-product">
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
                    <input type="text" id="name"/>
                </div>
                <div>
                    <label>Mô tả:</label>
                    <input type="text" id="description"/>
                </div>
                <div>
                    <label>Giá:</label>
                    <input type="text" id="price"/>
                </div>
                <div>
                    <label>Số lượng:</label>
                    <input type="text"  id="quantityAvailable" />
                </div>
                <div>
                    <label>Loại:</label>
                    <select id="categoryName">
                        <option value="rau củ">rau củ</option>
                        <option value="INACTIVE">trái cây</option>
                    </select>
                </div>
                <div>
                    <label>Link ảnh:</label>
                    <input type="text" id="imageUrl"/>
                </div>
                <div>
                    <label>Trọng lượng:</label>
                    <input type="text" id="weight"/>
                </div>
                <div>
                    <label>Đơn vị:</label>
                    <input type="text" id="unit" />
                </div>
                <div>
                    <label>Trạng thái:</label>
                    <select id="status">
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                    </select>
                </div>
                <div>
                    <button onClick={handleAddProduct} >Thêm sản phẩm</button>
                </div>
            </div>
        </div>
    );

};
export default memo(ListProduct);