import {memo} from "react";
import { Link } from 'react-router-dom';
import "./style.scss"
const Login = () => {
    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Đăng nhập</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Tài khoản hoặc Email:</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className="button-submit">Đăng nhập</button>
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