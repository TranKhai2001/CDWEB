import { memo, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./style.scss"

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                navigate('/');
            } else {
                setError('Đăng nhập thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu đăng nhập:', error);
            setError('Lỗi khi gửi yêu cầu đăng nhập');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Đăng nhập</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Tài khoản hoặc Email:</label>
                        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="button-submit">Đăng nhập</button>
                    {error && <div className="error">{error}</div>}
                </form>
                <div className="links">
                    <Link to="/register">Đăng ký</Link>
                    <Link to="/forgot-password">Quên mật khẩu?</Link>
                </div>
            </div>
        </div>
    );
};

export default memo(Login);