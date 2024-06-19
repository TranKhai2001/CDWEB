import React, {memo, useState} from 'react';
import './style.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra mật khẩu mới và mật khẩu xác nhận có khớp nhau không
        if (formData.newPassword !== formData.confirmPassword) {
            alert('Mật khẩu mới và mật khẩu xác nhận không khớp nhau');
            return;
        }

        try {
            const response = await axios.put('http://localhost:8080/change-password', {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            }, {
                withCredentials: true // Điều này đảm bảo rằng cookie phiên được gửi cùng yêu cầu
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