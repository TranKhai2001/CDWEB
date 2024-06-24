import React, { useState, useEffect, memo } from 'react';
import './style.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            alert('Mật khẩu mới và mật khẩu xác nhận không khớp nhau');
            return;
        }

        try {
            const response = await axios.put('http://localhost:8080/change-password', {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            }, {
                withCredentials: true
            });
            alert('Mật khẩu đã được thay đổi thành công');
            navigate('/');
        } catch (error) {
            alert('Nhập sai mật khẩu cũ hãy kiểm tra lại');
        }
    };

    return (
        <div className="changepassword-container">
            <div className="changepassword-form">
                <h2>Đổi Mật Khẩu</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="currentPassword">Mật khẩu cũ:</label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">Mật khẩu mới:</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Nhập lại mật khẩu:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="button-submit">Đổi mật khẩu</button>
                </form>
            </div>
        </div>
    );
};

export default memo(ChangePassword);