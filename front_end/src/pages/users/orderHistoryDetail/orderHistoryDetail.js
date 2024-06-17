import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./style.scss";

const OrderHistoryDetail = () => {
    const { orderId } = useParams();
    const [orderDetail, setOrderDetail] = useState(null);
    const navigate = useNavigate();
    const shippingMoney = 10000;

    useEffect(() => {
        axios.get(`http://localhost:8080/api/order/history/${orderId}`, {
            withCredentials: true
        })
            .then(response => {
                setOrderDetail(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the order detail!', error);
            });
    }, [orderId]);

    const handleReorder = () => {
        axios.post(`http://localhost:8080/api/order/reorder/${orderId}`, {}, {
            withCredentials: true
        })
            .then(response => {
                console.log('Order placed successfully:', response.data);
                navigate('/gio-hang');
            })
            .catch(error => {
                console.error('There was an error reordering!', error);
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
                                            <td className="product-price">{item.price} VND</td>
                                            <td className="product-quantity">{item.quantity}</td>
                                            <td className="product-total">{item.price * item.quantity} VND</td>
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
                                        <td>{orderDetail.totalAmount} VND</td>
                                    </tr>
                                    <tr className="total-data">
                                        <td><strong>Phí ship: </strong></td>
                                        <td>10000 VND</td>
                                    </tr>
                                    <tr className="total-data">
                                        <td><strong>Tổng cộng: </strong></td>
                                        <td>{orderDetail.totalAmount + shippingMoney} VND</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className="cart-buttons">
                                    <a href="/lich-su-don-hang" className="boxed-btn">Trở về</a>
                                    <a onClick={handleReorder} className="boxed-btn">Mua lại</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(OrderHistoryDetail);