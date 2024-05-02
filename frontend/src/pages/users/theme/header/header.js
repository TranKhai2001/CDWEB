import {memo} from "react";
import "./style.scss"
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
const Header = () =>{
    return (
        <div className="header-top">
            <div className="container">
                <div className="row">
                    <div className="col-6 header-top-left">
                        <ul>
                            <li><AiOutlineMail />Shoprauqua@gmail.com</li>
                            <li>Miễn phí giao hàng tận nơi!</li>
                        </ul>
                    </div>
                    <div className="col-6 header-top-right">
                        <ul>
                            <li><a href=""><AiFillFacebook /></a></li>
                            <li><a href=""><AiOutlineInstagram /></a></li>
                            <li><a href=""><AiFillGooglePlusCircle /></a></li>
                            <li><a href=""><AiFillTwitterSquare /></a></li>
                            <li>
                                <a href=""><AiOutlineUser /></a>
                               <span> Đăng nhập</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

};
export default memo(Header);