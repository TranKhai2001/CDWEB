import {memo} from "react";
import {Link} from "react-router-dom";
import "./style.scss";

const ChangePassword = () =>{
    return (
        <div className="changepassword-container">
            <div className="changepassword-form">
                <h2>Đổi Mật Khẩu</h2>

                <form >
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu cũ:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu mới:</label>
                        <input type="password" id="password" name="password" required  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Nhập lại mật khẩu:</label>
                        <input type="password" id="confirm-password" name="confirmPassword" required />

                    </div>
                    <button type="submit" className="button-submit">Đổi mật khẩu</button>
                    <button type="submit" className="button-submit">Trở về</button>
                </form>
            </div>
        </div>
    );
};

export default memo(ChangePassword);