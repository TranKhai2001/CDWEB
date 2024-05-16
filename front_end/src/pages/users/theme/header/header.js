import {memo, useEffect} from "react";
import "./style.scss"
import {AiFillFacebook, AiOutlineDownCircle, AiOutlineUpCircle} from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlinePhone } from "react-icons/ai";
import {formatter} from "utils/formatter"
import {ROUTERS} from "utils/router"
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import React, { useState } from 'react';
import {BiUser} from "react-icons/bi";
const Header = () =>{
    const [isShowHumberger,setShowHumberger] = useState(false)
    const [user, setUser] = useState(null); // Lưu trữ thông tin người dùng

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch('http://localhost:8080/check-login', {
                    method: 'GET',
                    credentials: 'include'
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData); // Cập nhật thông tin người dùng
                } else {
                    setUser(null); // Đặt người dùng về null nếu không đăng nhập
                }
            } catch (error) {
                console.error('Lỗi khi kiểm tra đăng nhập:', error);
            }
        };

        checkLoginStatus();
    }, []); // Sử dụng mảng rỗng để đảm bảo useEffect chỉ chạy một lần sau khi render lần đầu tiên

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/logout', {
                method: 'POST',
                credentials: 'include'
            });
            if (response.ok) {
                setUser(null); // Đặt người dùng về null sau khi đăng xuất
            } else {
                console.error('Đăng xuất không thành công');
            }
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
        }
    };
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
            <div className={`humberger_menu_overlay${isShowHumberger ? " active":""}`} onClick={()=>setShowHumberger(false)}/>
            <div className={`humberger_menu_wrapper${isShowHumberger ? " show":""}`} >
                <div className="header_logo">My Shop</div>
                <div className="humberger_menu_cart">
                    <ul>
                        <li>
                            <a href=""><AiOutlineShoppingCart/><span>1</span></a>
                        </li>
                    </ul>
                    <div className="header_cart_price">Giỏ hàng: <span>{formatter(1111111)}</span></div>
                </div>
                <div className="humberger_menu_widget">
                    <div className="header_top_right_auth">
                        <a href="">
                            <BiUser/>
                            Đăng nhập
                        </a>
                    </div>
                </div>
                <div className="humberger_menu_nav">
                    <ul>
                        {menus.map((menu,menuKey)=> (
                            <li key={menuKey} onTouchMove={menu.path}>
                                <a href={menu.path}>
                                    {menu.name}
                                </a>
                                {menu.child &&
                                    (
                                        <ul className="header_menu_dropdown">
                                            {menu.child.map((childItem,childKey)=> (
                                                <li key={`${menuKey}-${childKey}`}>
                                                    <a href={childItem.path}>{childItem.name}</a>
                                                </li>
                                            ))}

                                        </ul>
                                    )
                                }
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="header_top_right_social">
                    <a href=""><AiFillFacebook /></a>
                    <a href=""><AiOutlineInstagram /></a>
                    <a href=""><AiFillGooglePlusCircle /></a>
                    <a href=""><AiFillTwitterSquare /></a>
                </div>
                <div className="humberger_menu_contact">
                    <ul>
                        <li>
                            <i className="fa fa-envelope"/> <AiOutlineMail /> raucuqua@gmail.com
                        </li>
                        <li>
                            Miễn phí giao hàng từ đơn {formatter(200000)}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="header-top">
                <div className="container">
                    <div className="row">
                        <div className="col-6 header-top-left">
                            <ul>
                                <li><AiOutlineMail />Shoprauqua@gmail.com</li>
                                <li>Miễn phí giao hàng từ đơn {formatter(200000)}</li>
                            </ul>
                        </div>
                        <div className="col-6 header-top-right">
                            <ul>
                                <li><a href=""><AiFillFacebook /></a></li>
                                <li><a href=""><AiOutlineInstagram /></a></li>
                                <li><a href=""><AiFillGooglePlusCircle /></a></li>
                                <li><a href=""><AiFillTwitterSquare /></a></li>
                                {/*Hiển thị tên người dùng và link đăng xuất nếu có người đăng nhập */}
                                {user ? (
                                    <>
                                        <li><span>{user.fullName}</span> | <a href="#" onClick={handleLogout}>Đăng xuất</a></li>
                                    </>
                                ) : (
                                    // Hiển thị nút Đăng nhập nếu chưa có người đăng nhập
                                    <li>
                                        <Link to={ROUTERS.USER.LOGIN}><AiOutlineUser /> <span> Đăng nhập</span></Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 ">
                        <div className="header_logo">
                            <h1>My Shop</h1>
                        </div>
                    </div>
                    <div className="col-lg-6">
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
                    <div className="col-lg-3 ">
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
                        <div className="humberger_open">
                            <AiOutlineMenu onClick={()=>setShowHumberger(true)}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row hero_categories_container">
                    <div className="col-lg-3 col-md-12 col-sm-12 col-sm-12 hero_categories" >
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
                    <div className="col-lg-9  col-md-12 col-sm-12 col-sm-12 hero_seach_container">
                        <div className="hero_seach ">
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