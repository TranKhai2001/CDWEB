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
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        const fullnameRegex = /^[a-zA-ZÀ-ỹ\s]{8,20}$/;
        const phoneRegex = /^\d{10,15}$/;
        const usernameRegex = /^[a-zA-Z0-9]{8,16}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

        if (!fullnameRegex.test(formData.fullname)) {
            newErrors.fullname = 'Họ và tên phải có từ 8-20 ký tự, không chứa ký tự đặc biệt trừ dấu tiếng Việt.';
        }
        if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Số điện thoại phải là số và có từ 10-15 số.';
        }
        if (!usernameRegex.test(formData.username)) {
            newErrors.username = 'Tài khoản phải có từ 8-16 ký tự, không chứa ký tự đặc biệt kể cả dấu tiếng Việt.';
        }
        if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Mật khẩu phải có từ 8-20 ký tự, chứa cả số và chữ, không chứa ký tự đặc biệt kể cả dấu tiếng Việt.';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu và xác nhận mật khẩu không khớp';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const { email, fullname, phone, gender, dob, username, password } = formData;
        try {
            const response = await axios.post('http://localhost:8080/register', {
                email,
                fullName: fullname,
                phoneNumber: phone,
                gender,
                dateOfBirth: new Date(dob).toISOString(),
                username,
                password
            });

            if (response.status === 201) {
                navigate('/dang-nhap');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                setErrors({ general: 'Đăng ký không thành công, vui lòng thử lại.' });
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Đăng ký</h2>
                {errors.general && <p className="error-message">{errors.general}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullname">Họ và tên:</label>
                        <input type="text" id="fullname" name="fullname" required value={formData.fullname} onChange={handleChange} />
                        {errors.fullname && <p className="error-message">{errors.fullname}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại:</label>
                        <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} />
                        {errors.phone && <p className="error-message">{errors.phone}</p>}
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
                        {errors.username && <p className="error-message">{errors.username}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu:</label>
                        <input type="password" id="password" name="password" required value={formData.password} onChange={handleChange} />
                        {errors.password && <p className="error-message">{errors.password}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Nhập lại mật khẩu:</label>
                        <input type="password" id="confirm-password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} />
                        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
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