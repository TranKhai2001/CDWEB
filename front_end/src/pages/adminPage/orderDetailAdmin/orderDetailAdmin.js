import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./style.scss";
import {formatter} from "../../../utils/formatter";

const OrderDetailAdmin = () => {
    const { orderId } = useParams();
    const [orderDetail, setOrderDetail] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const shippingMoney = 10000;

    const checkLogin = async () => {
        try {
            const response = await axios.get('http://localhost:8080/check-login', { withCredentials: true });
            if (response.status === 200) {
                setCurrentUser(response.data);
                if (response.data.role !== 'ADMIN') {
                    navigate('/');
                }
            } else {
                navigate('/dang-nhap');
            }
        } catch (error) {
            console.error("Error checking login status:", error);
            navigate('/dang-nhap');
        }
    };

    useEffect(() => {
        checkLogin();
    }, [navigate]);

    useEffect(() => {
        if (currentUser && currentUser.role === 'ADMIN') {
            axios.get(`http://localhost:8080/api/order/admin/detail/${orderId}`, {
                withCredentials: true
            })
                .then(response => {
                    setOrderDetail(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the order detail!', error);
                });
        }
    }, [orderId, currentUser]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleStatusChange = (orderId, newStatus) => {
        axios.put(`http://localhost:8080/api/order/update-status/${orderId}`, { status: newStatus }, { withCredentials: true })
            .then(response => {
                setOrderDetail({ ...orderDetail, status: newStatus });
            })
            .catch(error => {
                console.error("There was an error updating the order status!", error);
            });
    };

    if (!orderDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="cart-section mt-150 mb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 col-xl-12 col-md-12 col-sm-12">
                            <div className="cart-table-wrap">
                                <table className="cart-table">
                                    <thead className="cart-table-head">
                                    <tr className="table-head-row">
                                        <th className="product-image">Ảnh minh họa</th>
                                        <th className="product-name">Tên</th>
                                        <th className="product-price">Giá</th>
                                        <th className="product-quantity">Số lượng</th>
                                        <th className="product-total">Tổng cộng</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orderDetail.items.map(item => (
                                        <tr className="table-body-row" key={item.productId}>
                                            <td className="product-image"><img src={item.imageUrl} alt={item.productName} /></td>
                                            <td className="product-name">{item.productName}</td>
                                            <td className="product-price">{formatter(item.price)}</td>
                                            <td className="product-quantity">{item.quantity}</td>
                                            <td className="product-total">{formatter(item.price * item.quantity)}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="col-lg-3 col-xl-12 col-md-12 col-sm-12">
                            <div className="total-section">
                                <table className="total-table">
                                    <thead className="total-table-head">
                                    <tr className="table-total-row">
                                        <th>Tất cả</th>
                                        <th>Giá</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="total-data">
                                        <td><strong>Tạm tính: </strong></td>
                                        <td>{formatter(orderDetail.totalAmount)}</td>
                                    </tr>
                                    <tr className="total-data">
                                        <td><strong>Phí ship: </strong></td>
                                        <td>{formatter(shippingMoney)}</td>
                                    </tr>
                                    <tr className="total-data">
                                        <td><strong>Tổng cộng: </strong></td>
                                        <td>{formatter(orderDetail.totalAmount + shippingMoney)}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className="cart-buttons">

                                    {orderDetail.status === 'PENDING' && (
                                        <>
                                            <button className="boxed-btn" onClick={() => handleStatusChange(orderDetail.orderId, 'PROCESSING')}>Xác nhận</button>
                                            <button className="boxed-btn" onClick={() => handleStatusChange(orderDetail.orderId, 'CANCELLED')}>Hủy</button>
                                        </>
                                    )}
                                    {orderDetail.status === 'PROCESSING' && (
                                        <>
                                            <button className="boxed-btn" onClick={() => handleStatusChange(orderDetail.orderId, 'SHIPPED')}>Giao</button>
                                            <button className="boxed-btn" onClick={() => handleStatusChange(orderDetail.orderId, 'CANCELLED')}>Hủy</button>
                                        </>
                                    )}
                                    {orderDetail.status === 'SHIPPED' && (
                                        <>
                                            <button className="boxed-btn" onClick={() => handleStatusChange(orderDetail.orderId, 'DELIVERED')}>Giao hàng thành công</button>
                                            <button className="boxed-btn" onClick={() => handleStatusChange(orderDetail.orderId, 'CANCELLED')}>Hủy</button>
                                        </>
                                    )}
                                    {orderDetail.status === 'CANCELLED' && (
                                        <span>Đơn hàng đã bị hủy</span>
                                    )}
                                    {orderDetail.status === 'DELIVERED' && (
                                        <span>Đã giao hàng thành công</span>
                                    )}
                                    <button onClick={handleGoBack} className="boxed-btn">Trở về</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(OrderDetailAdmin);