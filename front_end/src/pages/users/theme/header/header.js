import {memo} from "react";
import "./style.scss"
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlinePhone } from "react-icons/ai";
import {formatter} from "utils/formatter"
import {ROUTERS} from "utils/router"
import {Route, Routes} from "react-router-dom";
import React, { useState } from 'react';
const Header = () =>{
    const [menus, setMenus] = useState([
        {
            name : "Trang chủ",
            path :  ROUTERS.USER.HOME
        },
        {
            name : "Sản phẩm",
            path :  ROUTERS.USER.HOME,
            isShowSubmenu: false,
            child: [
                {
                    name : "Rau củ",
                    path : ""
                },
                {
                    name : "Trái cây",
                    path : ""
                },
                {
                    name : "Nước trái cây",
                    path : ""
                },
                {
                    name : "Trái cây sấy",
                    path : ""
                }
            ]

        },
        {
            name : "Bài viết",
            path :  ROUTERS.USER.HOME
        },
        {
            name : "Liên hệ",
            path :  ROUTERS.USER.HOME
        }
    ])

    return (
        <>
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
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="header_logo">
                            <h1>My Shop</h1>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <nav className="header_menu">
                            <ul>
                                {
                                    menus?.map((menu,menuKey) =>(
                                        <li key={menuKey} className={menuKey ===0 ? "active" : ""}>
                                            <a href={menu?.path}>{menu?.name}</a>
                                            {
                                                menu.child && (
                                                    <ul className="header_menu_dropdown">
                                                        {
                                                            menu.child.map((childItem, childKey)=>(
                                                                <li key={`${menuKey}-${childKey}`}>
                                                                    <a href={childItem.path}>{childItem.name}</a>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                )
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>
                    </div>
                    <div className="col-xl-3">
                        <div className="header_cart">
                            <div className="header_cart_price">
                                <span>{formatter(1111100)}</span>
                            </div>
                            <ul>
                                <li>
                                    <a href=""><AiOutlineShoppingCart /></a>
                                    <span>5</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row hero_categories_container">
                    <div className="col-lg-3 hero_categories" >
                        <div className="hero_categories_all">
                            <AiOutlineMenu />
                            Danh sách sản phẩm
                        </div>
                            <ul>
                                <li>
                                    <a href="">Rau củ</a>
                                </li>
                                <li>
                                    <a href="">Trái cây</a>
                                </li>
                                <li>
                                    <a href="">Nước trái cây</a>
                                </li>
                                <li>
                                    <a href="">Trái cây sấy</a>
                                </li>
                            </ul>


                    </div>
                    <div className="col-lg-9 hero_seach_container">
                        <div className="hero_seach">
                            <div className="hero_seach_form">
                                <form action="">
                                    <input type="text" name="" value="" placeholder="Bạn đang tìm gì?"/>
                                    <button type="submit" >Tìm kiếm</button>
                                </form>
                            </div>
                            <div className="hero_seach_phone">
                                <div className="hero_seach_phone_icon">
                                    <AiOutlinePhone />
                                </div>
                                <div className="hero_seach_phone_text">
                                    <p>0901.197.448</p>
                                    <span>Hỗ trợ 24/7</span>
                                </div>
                            </div>
                        </div>
                        <div className="hero_item">
                            <div className="hero_text">
                                <span>Trái cây tươi</span>
                                <h2>Rau quả <br/> sạch 100%</h2>
                                <p>Miễn phí giao hàng tận nơi</p>
                                <a href="" className="primary-btn"> Mua ngay</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};
export default memo(Header);