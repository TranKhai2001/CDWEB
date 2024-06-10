import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./style.scss";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch the order history from the backend
        axios.get('http://localhost:8080/api/order/history', {
            withCredentials: true // Include credentials for authorization
        })
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the order history!', error);
            });
    }, []);

    return (
        <div className="order-history-container">
            <h2>Lịch Sử Đơn Hàng</h2>
            <table className="order-history-table">
                <thead>
                <tr>
                    <th>Mã đơn hàng</th>
                    <th>Ngày đặt hàng</th>
                    <th>Giá đơn hàng</th>
                    <th>Địa chỉ giao hàng</th>
                    <th>Trạng thái đơn hàng</th>
                    <th>trạng thái thanh toán</th>
                    <th>Tùy chọn</th> {/* New column header */}
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.orderId}>
                        <td>{order.orderId}</td>
                        <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                        <td>{order.totalAmount}</td>
                        <td>{order.deliveryAddress}</td>
                        <td>{order.status}</td>
                        <td>{order.paymentStatus}</td>
                        <td>
                            <button className="action-button">Đã nhận được hàng</button>
                            <button className="action-button">Chi tiết</button>
                            <button className="action-button">Mua lại</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderHistory;