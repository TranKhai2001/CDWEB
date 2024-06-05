import { memo, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./style.scss";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        fullname: '',
        phone: '',
        gender: 'MALE',
        dob: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu và xác nhận mật khẩu không khớp');
            return;
        }

        const { email, fullname, phone, gender, dob, username, password } = formData;
        try {
            const response = await axios.post('http://localhost:8080/register', {
                email,
                fullName: fullname,
                phoneNumber: phone,
                gender,
                dateOfBirth: new Date(dob).toISOString(), // Chuyển đổi sang định dạng ISO
                username,
                password
            });

            if (response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            setError('Đăng ký không thành công, vui lòng thử lại.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Đăng ký</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullname">Họ và tên:</label>
                        <input type="text" id="fullname" name="fullname" required value={formData.fullname} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại:</label>
                        <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Giới tính:</label>
                        <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="MALE">Nam</option>
                            <option value="FEMALE">Nữ</option>
                            <option value="OTHER">Khác</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Ngày sinh:</label>
                        <input type="date" id="dob" name="dob" required value={formData.dob} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Tài khoản:</label>
                        <input type="text" id="username" name="username" required value={formData.username} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu:</label>
                        <input type="password" id="password" name="password" required value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Nhập lại mật khẩu:</label>
                        <input type="password" id="confirm-password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} />
                    </div>
                    <button type="submit" className="button-submit">Đăng ký</button>
                </form>
                <div className="links">
                    <Link to="/login">Đăng nhập</Link>
                    <Link to="/forgot-password">Quên mật khẩu?</Link>
                </div>
            </div>
        </div>
    );
};

export default memo(Register);