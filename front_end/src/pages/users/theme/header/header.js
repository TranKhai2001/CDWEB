import React, { memo, useState, useEffect } from 'react';
import "./style.scss"
import { AiFillFacebook, AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlinePhone } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { formatter } from "utils/formatter"
import { ROUTERS } from "utils/router"
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import SearchBar from "./searchBar";

const Header = () => {
    const [isShowHumberger, setShowHumberger] = useState(false)
    const [user, setUser] = useState(null); // Lưu trữ thông tin người dùng
    const [cartQuantity, setCartQuantity] = useState(0);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch('http://localhost:8080/check-login', {
                    method: 'GET',
                    credentials: 'include'
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Lỗi khi kiểm tra đăng nhập:', error);
            }
        };

        const fetchCartQuantity = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/cart/total-quantity', {
                    method: 'GET',
                    credentials: 'include'
                });
                if (response.ok) {
                    const totalQuantity = await response.json();
                    setCartQuantity(totalQuantity);
                } else {
                    setCartQuantity(0);
                }
            } catch (error) {
                console.error('Lỗi khi lấy tổng số lượng sản phẩm trong giỏ hàng:', error);
            }
        };

        checkLoginStatus();
        fetchCartQuantity();

        const intervalId = setInterval(fetchCartQuantity, 3000);

        return () => clearInterval(intervalId);
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/logout', {
                method: 'POST',
                credentials: 'include'
            });
            if (response.ok) {
                setUser(null);
                navigate(ROUTERS.USER.HOME)
            } else {
                console.error('Đăng xuất không thành công');
            }
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
        }
    };

    const [menus, setMenus] = useState([
        {
            name: "Trang chủ",
            path: ROUTERS.USER.HOME
        },
        {
            name: "Sản phẩm",
            path: ROUTERS.USER.HOME,
            isShowSubmenu: false,
            child: [
                {
                    name: "Rau củ",
                    path: "/products/vegetables"
                },
                {
                    name: "Trái cây",
                    path: "/products/fruits"
                },
                {
                    name: "Nước trái cây",
                    path: "/products/juice"
                },
                {
                    name: "Trái cây sấy",
                    path: "/products/dried-fruits"
                }
            ]
        },
        {
            name: "Bài viết",
            path: ROUTERS.USER.HOME
        },
        {
            name: "Liên hệ",
            path: ROUTERS.USER.HOME
        }
    ]);

    useEffect(() => {
        if (user?.role === 'ADMIN') {
            setMenus((prevMenus) => [
                ...prevMenus,
                {
                    name: "Quản lý",
                    path: "",
                    isShowSubmenu: false,
                    child: [
                        {
                            name: "Quản lý người dùng",
                            path: ROUTERS.USER.LISTUSER
                        },
                        {
                            name: "Quản lý sản phẩm",
                            path: ROUTERS.USER.LISTPRODUCT
                        },
                        {
                            name: "Quản lý đơn hàng",
                            path:   ROUTERS.USER.LISTODER
                        }
                    ]
                }
            ]);
        } else {
            setMenus((prevMenus) => prevMenus.filter(menu => menu.name !== "Quản lý"));
        }
    }, [user]);

    return (
        <>
            <div className={`humberger_menu_overlay${isShowHumberger ? " active" : ""}`} onClick={() => setShowHumberger(false)} />
            <div className={`humberger_menu_wrapper${isShowHumberger ? " show" : ""}`} >
                <div className="header_logo">My Shop</div>
                <div className="humberger_menu_cart">
                    <div className="header_cart_price">Giỏ hàng:</div>
                    <ul>
                        <li>
                            <Link to={ROUTERS.USER.CART}><AiOutlineShoppingCart /><span>{cartQuantity}</span></Link>
                        </li>
                    </ul>
                </div>
                <div className="humberger_menu_widget">
                    <div className="header_top_right_auth">
                        {user ? (
                            <>
                                <li>
                                    <span onClick={() => setDropdownOpen(!isDropdownOpen)}>{user.fullName}</span> | <a href="#" onClick={handleLogout}>Đăng xuất</a>
                                    {isDropdownOpen && (
                                        <div className="dropdown_menu">
                                            <Link to={ROUTERS.USER.ORDERHISTORY}>Lịch sử đơn hàng</Link>
                                            <Link to={ROUTERS.USER.PROFILE}>Thông tin cá nhân</Link>
                                            <Link to={ROUTERS.USER.CHANGEPASSWORD}>Đổi mật khẩu</Link>
                                        </div>
                                    )}
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to={ROUTERS.USER.LOGIN}><AiOutlineUser /> <span> Đăng nhập</span></Link>
                            </li>
                        )}
                    </div>
                </div>
                <div className="humberger_menu_nav">
                    <ul>
                        {menus.map((menu, menuKey) => (
                            <li key={menuKey} onTouchMove={menu.path}>
                                <Link to={menu.path}>
                                    {menu.name}
                                </Link>
                                {menu.child &&
                                    (
                                        <ul className="header_menu_dropdown">
                                            {menu.child.map((childItem, childKey) => (
                                                <li key={`${menuKey}-${childKey}`}>
                                                    <Link to={childItem.path}>{childItem.name}</Link>
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
                            <i className="fa fa-envelope" /> <AiOutlineMail /> raucuqua@gmail.com
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
                            <ul className="user-actions">
                                <li>
                                    <a href=""><AiFillFacebook /></a>
                                </li>
                                <li>
                                    <a href=""><AiOutlineInstagram /></a>
                                </li>
                                <li>
                                    <a href=""><AiFillGooglePlusCircle /></a>
                                </li>
                                <li>
                                    <a href=""><AiFillTwitterSquare /></a>
                                </li>
                                {user ? (
                                    <li className={isDropdownOpen ? "dropdown-open" : ""}>
      <span onClick={() => setDropdownOpen(!isDropdownOpen)}>
        {user.fullName}
      </span> | <a href="#" onClick={handleLogout}>Đăng xuất</a>
                                        {isDropdownOpen && (
                                            <div className="dropdown_menu">
                                                <Link to={ROUTERS.USER.ORDERHISTORY}>Lịch sử đơn hàng</Link>
                                                <Link to={ROUTERS.USER.PROFILE}>Thông tin cá nhân</Link>
                                                <Link to={ROUTERS.USER.CHANGEPASSWORD}>Đổi mật khẩu</Link>
                                            </div>
                                        )}
                                    </li>
                                ) : (
                                    <li>
                                        <Link to={ROUTERS.USER.LOGIN}>
                                            <AiOutlineUser /> <span>Đăng nhập</span>
                                        </Link>
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
                                    menus?.map((menu, menuKey) => (
                                        <li key={menuKey} className={menuKey === 0 ? "active" : ""}>
                                            <Link to={menu?.path}>{menu?.name}</Link>
                                            {
                                                menu.child && (
                                                    <ul className="header_menu_dropdown">
                                                        {
                                                            menu.child.map((childItem, childKey) => (
                                                                <li key={`${menuKey}-${childKey}`}>
                                                                    <Link to={childItem.path}>{childItem.name}</Link>
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
                            <div className="header_cart_price">Giỏ hàng:</div>
                            <ul>
                                <li>
                                    <Link to={ROUTERS.USER.CART}><AiOutlineShoppingCart /></Link>
                                    <span>{cartQuantity}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="humberger_open">
                            <AiOutlineMenu onClick={() => setShowHumberger(true)} />
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
                                <Link to="">Rau củ</Link>
                            </li>
                            <li>
                                <Link to="">Trái cây</Link>
                            </li>
                            <li>
                                <Link to="">Nước trái cây</Link>
                            </li>
                            <li>
                                <Link to="">Trái cây sấy</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-9  col-md-12 col-sm-12 col-sm-12 hero_seach_container">
                        <div className="hero_seach ">
                            <SearchBar></SearchBar>
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
                                <h2>Rau quả <br /> sạch 100%</h2>
                                <p>Miễn phí giao hàng tận nơi</p>
                                <Link to="" className="primary-btn"> Mua ngay</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(Header);