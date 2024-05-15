import {memo} from "react";
import { Link } from 'react-router-dom';
import "./style.scss"

const Register = () => {
    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Đăng ký</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại:</label>
                        <input type="tel" id="phone" name="phone" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Giới tính:</label>
                        <select id="gender" name="gender">
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Ngày sinh:</label>
                        <input type="date" id="dob" name="dob" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Tài khoản:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Nhập lại mật khẩu:</label>
                        <input type="password" id="confirm-password" name="confirm-password" required />
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