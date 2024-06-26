import React, { useState, useEffect, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.scss";
import {formatter} from "../../../utils/formatter";
import axios from 'axios';

const ProductDetailAdmin = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [updatedProduct, setUpdatedProduct] = useState({
        name: "",
        description: "",
        price: "",
        quantityAvailable: "",
        weight: "",
        unit: "",
        status: "",
        imageUrl: "",
        categoryId: ""  // Thêm trạng thái cho danh mục
    });

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch('http://localhost:8080/check-login', {
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setCurrentUser(data);
                } else {
                    console.error('Failed to fetch current user');
                    setError('Bạn không có quyền truy cập');
                    navigate('/dang-nhap');
                }
            } catch (error) {
                console.error('Error fetching current user:', error);
                navigate('/dang-nhap');
            }
        };

        fetchCurrentUser();
    }, [navigate]);

    const fetchProductDetails = async () => {
        if (currentUser && currentUser.role !== 'ADMIN') {
            setError('Bạn không có quyền truy cập');
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/api/products/admin/${productId}`, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setProduct(data);
                setUpdatedProduct({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    quantityAvailable: data.quantityAvailable,
                    weight: data.weight,
                    unit: data.unit,
                    status: data.status,
                    imageUrl: data.imageUrl,
                    categoryId: data.categoryId  // Lấy ID danh mục hiện tại của sản phẩm
                });
            } else if (response.status === 404) {
                setError('Product not found');
            } else {
                setError('Failed to fetch product details');
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
            setError('Error fetching product details');
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, [productId]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct({ ...updatedProduct, [name]: value });
    };

    const handleSave = async () => {
        if (currentUser && currentUser.role !== 'ADMIN') {
            setError('Bạn không có quyền truy cập');
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/api/products/update/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(updatedProduct)
            });
            if (response.ok) {
                alert("Product details updated successfully");
                await fetchProductDetails();
                setIsEditing(false);
            } else {
                throw new Error("Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Tên sản phẩm sau chỉnh sửa đã tồn tại");
            // setError("Error updating product");
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail-container">
            <div className="product-detail-header">
                <h2>Chi Tiết Sản Phẩm</h2>
            </div>
            <div className="product-detail-content">
                <div className="product-image">
                    <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="product-info">
                    <h3>{isEditing ? <input type="text" name="name" value={updatedProduct.name} onChange={handleChange} /> : product.name}</h3>
                    <p><strong>Mô tả:</strong> {isEditing ? <textarea name="description" value={updatedProduct.description} onChange={handleChange}></textarea> : product.description}</p>
                    <p><strong>Giá:</strong> {isEditing ? <input type="number" name="price" value={updatedProduct.price} onChange={handleChange} /> : `${formatter(product.price)}`}</p>
                    <p><strong>Số lượng có sẵn:</strong> {isEditing ? <input type="number" name="quantityAvailable" value={updatedProduct.quantityAvailable} onChange={handleChange} /> : product.quantityAvailable}</p>
                    <p><strong>Đã bán:</strong> {product.sold}</p>
                    <p><strong>Loại:</strong> {isEditing ? (
                        <select name="categoryId" value={updatedProduct.categoryId} onChange={handleChange}>
                            {categories.map(category => (
                                <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
                            ))}
                        </select>
                    ) : product.categoryName}</p>
                    <p><strong>Trọng lượng:</strong> {isEditing ? <input type="text" name="weight" value={updatedProduct.weight} onChange={handleChange} /> : `${product.weight} ${product.unit}`}</p>
                    <p><strong>Ngày tạo:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
                    <p><strong>Trạng thái:</strong> {isEditing ? <select name="status" value={updatedProduct.status} onChange={handleChange}>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                    </select> : product.status}</p>
                </div>
            </div>
            <div className="product-detail-actions">
                {isEditing ? (
                    <>
                        <button onClick={handleSave}>Lưu</button>
                        <button onClick={handleCancel}>Trở về</button>
                    </>
                ) : (
                    <>
                    <button onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
                        <button onClick={() => navigate('/danh-sach-san-pham')}>Quay lại</button>
                    </>
                )}

            </div>
        </div>
    );
};

export default memo(ProductDetailAdmin);