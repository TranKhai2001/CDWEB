import React, { useState, useEffect, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import "./style.scss";

const CategoryDetail = () => {
    const [category, setCategory] = useState({});
    const [initialCategory, setInitialCategory] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const { categoryId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch('http://localhost:8080/check-login', {
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.role === 'ADMIN') {
                        setCurrentUser(data);
                    } else {
                        setError('Bạn không có quyền truy cập');
                        navigate('/');
                    }
                } else {
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
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/categories/admin/${categoryId}`, {
                    withCredentials: true
                });
                setCategory(response.data);
                setInitialCategory(response.data); // Lưu trữ trạng thái ban đầu của danh mục
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        if (currentUser && currentUser.role === 'ADMIN') {
            fetchCategory();
        }
    }, [categoryId, currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({
            ...category,
            [name]: value
        });
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/categories/admin/${categoryId}`, category, {
                withCredentials: true
            });
            setCategory(response.data);
            setInitialCategory(response.data); // Cập nhật trạng thái ban đầu khi lưu
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving category:', error);
        }
    };

    const handleCancel = () => {
        setCategory(initialCategory); // Khôi phục trạng thái ban đầu của danh mục
        setIsEditing(false);
    };

    return (
        <div className="categorypage-container">
            <div className="categorypage-form">
                <h2>Chi Tiết Danh Mục Sản Phẩm</h2>

                {error && <p className="error-message">{error}</p>}

                <form>
                    <div className="form-group">
                        <label htmlFor="name">Tên Danh Mục:</label>
                        <input type="text" id="name" name="name" required value={category.name || ''} onChange={handleChange} readOnly={!isEditing} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Trạng Thái:</label>
                        <select id="status" name="status" value={category.status || ''} onChange={handleChange} disabled={!isEditing}>
                            <option value="ACTIVE">Hoạt động</option>
                            <option value="INACTIVE">Không hoạt động</option>
                        </select>
                    </div>
                    {isEditing ? (
                        <>
                            <button type="button" className="button-submit" onClick={handleSave}>Lưu</button>
                            <button type="button" className="button-submit" onClick={handleCancel}>Hủy</button>
                        </>
                    ) : (
                        <>
                            <button type="button" className="button-submit" onClick={() => setIsEditing(true)}>Cập nhật</button>
                            <button onClick={() => navigate('/danh-sach-danh-muc')} className="button-submit">Trở về</button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default memo(CategoryDetail);