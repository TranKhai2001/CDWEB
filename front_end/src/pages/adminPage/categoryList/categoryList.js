import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.scss';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/check-login', {
                    withCredentials: true
                });
                if (response.status === 200) {
                    setCurrentUser(response.data);
                    if (response.data.role !== 'ADMIN') {
                        navigate('/');
                    }
                } else {
                    navigate('/dang-nhap');
                }
            } catch (error) {
                navigate('/dang-nhap');
            }
        };

        fetchCurrentUser();
    }, [navigate]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/categories/admin', {
                    withCredentials: true
                });
                setCategories(response.data);
            } catch (error) {
                console.error('There was an error fetching the categories!', error);
            }
        };

        if (currentUser && currentUser.role === 'ADMIN') {
            fetchCategories();
        }
    }, [currentUser]);

    const handleDetailClick = (categoryId) => {
        navigate(`/chi-tiet-danh-muc/${categoryId}`);
    };

    const handleAddCategoryClick = () => {
        navigate('/them-danh-muc');
    };

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h2>Danh Sách Danh Mục Sản Phẩm</h2>
            <button className="add-category-button" onClick={handleAddCategoryClick}>
                Thêm Danh Mục Sản Phẩm
            </button>
            <div className="category-list">
                <table className="list-category">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên Danh Mục</th>
                        <th>Trạng Thái</th>
                        <th>Tùy Chọn</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map(category => (
                        <tr key={category.categoryId}>
                            <td>{category.categoryId}</td>
                            <td>{category.name}</td>
                            <td>{category.status}</td>
                            <td>
                                <button className="action-button" onClick={() => handleDetailClick(category.categoryId)}>
                                    Chi Tiết
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default memo(CategoryList);