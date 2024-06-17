import React, {memo, useEffect, useState} from 'react';
import axios from 'axios';
import "./style.scss";
import {useNavigate } from 'react-router-dom';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;
    const navigate = useNavigate();
    const shippingMoney = 10000;

    useEffect(() => {
        axios.get('http://localhost:8080/api/order/history', {
            withCredentials: true
        })
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the order history!', error);
            });
    }, []);

    const handleDetailClick = (orderId) => {
        navigate(`/chi-tiet-don-hang/${orderId}`);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(orders.length / ordersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="order-history-container container">
            <h2>Lịch Sử Đơn Hàng</h2>
            <table className="order-history-table">
                <thead>
                <tr>
                    <th>Mã đơn hàng</th>
                    <th>Ngày đặt hàng</th>
                    <th>Giá đơn hàng</th>
                    <th>Địa chỉ giao hàng</th>
                    <th>Trạng thái đơn hàng</th>
                    <th>Trạng thái thanh toán</th>
                    <th>Tùy chọn</th>
                </tr>
                </thead>
                <tbody>
                {currentOrders.map(order => (
                    <tr key={order.orderId}>
                        <td>{order.orderId}</td>
                        <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                        <td>{order.totalAmount + shippingMoney}</td>
                        <td>{order.deliveryAddress}</td>
                        <td>{order.status}</td>
                        <td>{order.paymentStatus}</td>
                        <td>
                            <button className="action-button">Đã nhận được hàng</button>
                            <button className="action-button" onClick={() => handleDetailClick(order.orderId)}>Chi tiết</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`page-number ${currentPage === number ? 'active' : ''}`}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default memo(OrderHistory);