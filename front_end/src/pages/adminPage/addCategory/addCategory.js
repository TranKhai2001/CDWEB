import React, { useState, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./style.scss";

const AddCategory = () => {
    const [category, setCategory] = useState({
        name: '',
        status: 'ACTIVE'
    });
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({
            ...category,
            [name]: value
        });
    };

    const handleSave = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/categories/admin', category, {
                withCredentials: true
            });
            setCategory(response.data);
            navigate('/danh-sach-danh-muc');
        } catch (error) {
            console.error('Error adding category:', error);
            setError('Có lỗi khi thêm danh mục');
        }
    };

    const handleCancel = () => {
        navigate('/danh-sach-danh-muc');
    };

    return (
        <div className="categorypage-container">
            <div className="categorypage-form">
                <h2>Thêm Danh Mục Sản Phẩm</h2>

                {error && <p className="error-message">{error}</p>}

                <form>
                    <div className="form-group">
                        <label htmlFor="name">Tên Danh Mục:</label>
                        <input type="text" id="name" name="name" required value={category.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Trạng Thái:</label>
                        <select id="status" name="status" value={category.status} onChange={handleChange}>
                            <option value="ACTIVE">Hoạt động</option>
                            <option value="INACTIVE">Không hoạt động</option>
                        </select>
                    </div>
                    <button type="button" className="button-submit" onClick={handleSave}>Lưu</button>
                    <button type="button" className="button-submit" onClick={handleCancel}>Trở về</button>
                </form>
            </div>
        </div>
    );
};

export default memo(AddCategory);