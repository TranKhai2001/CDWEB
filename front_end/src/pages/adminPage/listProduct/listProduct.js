import React, { memo, useEffect, useState } from "react";
import 'react-tabs/style/react-tabs.css';
import "./style.scss";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatter } from "../../../utils/formatter";

const ListProduct = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState("");
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        quantityAvailable: "",
        categoryName: "",
        imageUrl: "",
        weight: "",
        unit: "",
        status: "ACTIVE"
    });
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 10;

    const navigate = useNavigate();

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

    useEffect(() => {
        if (currentUser && currentUser.role !== 'ADMIN') {
            setError('Bạn không có quyền truy cập');
            return;
        }
        // Fetch products from the backend API
        axios.get('http://localhost:8080/api/products/admin', { withCredentials: true })
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    setMessage("Unauthorized access. Please log in as admin.");
                    navigate('/');
                } else {
                    console.error("There was an error fetching the products!", error);
                }
            });

        // Fetch categories from the backend API
        axios.get('http://localhost:8080/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the categories!", error);
            });
    }, [currentUser, navigate]);

    const handleAddProduct = () => {
        axios.post('http://localhost:8080/api/products/add', productData, { withCredentials: true })
            .then(response => {
                console.log("Product added successfully");
                setMessage("Product added successfully!");
                // Reset form data
                setProductData({
                    name: "",
                    description: "",
                    price: "",
                    quantityAvailable: "",
                    categoryName: "",
                    imageUrl: "",
                    weight: "",
                    unit: "",
                    status: "ACTIVE"
                });
                // Reload the product list
                axios.get('http://localhost:8080/api/products/admin', { withCredentials: true })
                    .then(response => {
                        setProducts(response.data);
                    })
                    .catch(error => {
                        console.error("Error refreshing product list after adding!", error);
                    });
            })
            .catch(error => {
                if (error.response && error.response.status === 409) {
                    setMessage("Product already exists!");
                } else if (error.response && error.response.status === 401) {
                    setMessage("Unauthorized access. Please log in as admin.");
                    navigate('/');
                } else {
                    setMessage("Error adding product!");
                }
                console.error("Error adding product!", error);
            });
    };

    const handleDeleteProduct = (productId) => {
        axios.delete(`http://localhost:8080/api/products/delete/${productId}`, { withCredentials: true })
            .then(response => {
                console.log("Product deleted successfully");
                setMessage("Product deleted successfully!");
                // Reload the product list
                axios.get('http://localhost:8080/api/products/admin', { withCredentials: true })
                    .then(response => {
                        setProducts(response.data);
                    })
                    .catch(error => {
                        console.error("Error refreshing product list after deletion!", error);
                    });
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    setMessage("Unauthorized access. Please log in as admin.");
                    navigate('/');
                } else {
                    setMessage("Error deleting product!");
                }
                console.error("Error deleting product!", error);
            });
    };

    const handleDetailClick = (productId) => {
        navigate(`/chi-tiet-san-pham-admin/${productId}`);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setProductData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handlePageClick = (newPage) => {
        setCurrentPage(newPage);
    };

    const pageCount = Math.ceil(products.length / productsPerPage);
    const displayedProducts = products.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage);

    return (
        <div className="container">
            <div className="section-title">
                <h2>Danh sách sản phẩm</h2>
            </div>
            {message && <div className="message">{message}</div>}
            <table style={{ width: "100%" }} className="list-product">
                <thead>
                <tr>
                    <th>Xóa</th>
                    <th>ID</th>
                    <th>Tên sản phẩm</th>
                    <th>Mô tả</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Loại</th>
                    <th>Trạng thái</th>
                    <th>Chi tiết</th>
                </tr>
                </thead>
                <tbody>
                {displayedProducts.map((item, index) => (
                    <tr key={item.productId}>
                        <td><AiFillDelete onClick={() => handleDeleteProduct(item.productId)} /></td>
                        <td>{item.productId}</td>
                        <td>{item.name}</td>
                        <td>{item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}</td>
                        <td>{formatter(item.price)}</td>
                        <td>{item.quantityAvailable}</td>
                        <td>{item.categoryName}</td>
                        <td>{item.status}</td>
                        <td>
                            <button onClick={() => handleDetailClick(item.productId)}>
                                Chi tiết
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination pageCount={pageCount} onPageChange={handlePageClick} currentPage={currentPage} />
            <div className="add-product">
                <div className="section-title">
                    <h2>Thêm sản phẩm</h2>
                </div>
                <div>
                    <label>Tên sản phẩm:</label>
                    <input type="text" id="name" value={productData.name} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Mô tả:</label>
                    <input type="text" id="description" value={productData.description} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Giá:</label>
                    <input type="text" id="price" value={productData.price} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Số lượng:</label>
                    <input type="text" id="quantityAvailable" value={productData.quantityAvailable} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Loại:</label>
                    <select id="categoryName" value={productData.categoryName} onChange={handleInputChange}>
                        <option value="">Chọn loại</option> {/* Thêm dòng này */}
                        {categories.map(category => (
                            <option key={category.categoryId} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Link ảnh:</label>
                    <input type="text" id="imageUrl" value={productData.imageUrl} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Trọng lượng:</label>
                    <input type="text" id="weight" value={productData.weight} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Đơn vị:</label>
                    <input type="text" id="unit" value={productData.unit} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Trạng thái:</label>
                    <select id="status" value={productData.status} onChange={handleInputChange}>
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                    </select>
                </div>
                <div>
                    {message && <div className="message">{message}</div>}
                    <button onClick={handleAddProduct}>Thêm sản phẩm</button>
                </div>
            </div>
        </div>
    );
};

const Pagination = ({ pageCount, onPageChange, currentPage }) => {
    const pages = Array.from({ length: pageCount }, (_, i) => i);
    return (
        <div className="pagination">
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={page === currentPage ? "active" : ""}
                >
                    {page + 1}
                </button>
            ))}
        </div>
    );
};

export default memo(ListProduct);