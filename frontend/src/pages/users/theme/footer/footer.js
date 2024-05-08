import {memo} from "react";
// import React, { useState } from 'react';
import "./style.scss"
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";

const Footer = () =>{
    return(
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                        <div className="footer_about">
                            <h1 className="footer_about_logo">My Shop</h1>
                            <ul>
                                <li>Linh Trung, Thủ Đức, TP.HCM</li>
                                <li>Phone: 1234567890</li>
                                <li>Shoprauqua@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <div className="footer_widget">
                            <h6>Thông tin</h6>
                            <ul>
                                <li>
                                    <a href="">Giới thiệu</a>
                                </li>
                                <li>
                                    <a href="">Chứng nhận</a>
                                </li>
                                <li>
                                    <a href="">Sản phẩm kinh doanh</a>
                                </li>

                            </ul>
                            <ul>
                                <li>
                                    <a href="">Chính sách bảo mật</a>
                                </li>
                                <li>
                                    <a href="">Điều khoản sử dụng</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                        <div className="footer_widget">
                            <h6>Khuyễn mãi & ưu đãi</h6>
                            <p>Đăng ký nhận thông tin tại đây</p>
                            <form action="#">
                                <div className="input-group">
                                    <input type="text" placeholder="Nhập email"/>
                                    <button type="submit" className="button-submit">
                                        Đăng ký
                                    </button>
                                </div>
                                <div className="footer_widget_social">
                                        <div><AiFillFacebook /></div>
                                        <div><AiOutlineInstagram /></div>
                                        <div><AiFillGooglePlusCircle /></div>
                                        <div><AiFillTwitterSquare /></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )


};
export default memo(Footer);