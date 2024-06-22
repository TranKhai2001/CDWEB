import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import "./style.scss";
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;
    const navigate = useNavigate();
    const shippingMoney = 10000;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/order/history', {
                    withCredentials: true
                });
                // Sắp xếp các đơn hàng theo ngày đặt hàng từ mới đến cũ
                const sortedOrders = response.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
                setOrders(sortedOrders);
            } catch (error) {
                console.error('There was an error fetching the order history!', error);
            }
        };

        fetchOrders();

        const intervalId = setInterval(fetchOrders, 3000);

        return () => clearInterval(intervalId);
    }, []);

    const handleDetailClick = (orderId) => {
        navigate(`/chi-tiet-don-hang/${orderId}`);
    };

    const handleReceivedClick = (orderId) => {
        axios.put(`http://localhost:8080/api/order/update-status/${orderId}`, { status: 'CANCELLED' }, {
            withCredentials: true
        })
            .then(response => {
                setOrders(prevOrders => prevOrders.map(order =>
                    order.orderId === orderId ? { ...order, status: 'CANCELLED' } : order
                ));
            })
            .catch(error => {
                console.error('There was an error updating the order status!', error);
            });
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

    const getOrderStatus = (status) => {
        switch (status) {
            case "PENDING":
                return "Chờ xác nhận";
            case "PROCESSING":
                return "Đã xác nhận";
            case "SHIPPED":
                return "Đang giao hàng";
            case "DELIVERED":
                return "Đã giao hàng";
            case "CANCELLED":
                return "Đơn hàng đã bị hủy";
            default:
                return status;
        }
    };

    const getPaymentStatus = (paymentStatus) => {
        switch (paymentStatus) {
            case "PENDING":
                return "Chưa thanh toán";
            case "PAID":
                return "Đã thanh toán";
            case "FAILED":
                return "Thanh toán thất bại";
            default:
                return paymentStatus;
        }
    };

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
                        <td>{getOrderStatus(order.status)}</td>
                        <td>{getPaymentStatus(order.paymentStatus)}</td>
                        <td>
                            {order.status === 'PENDING' && (
                                <button className="action-button" onClick={() => handleReceivedClick(order.orderId)}>
                                    Hủy đơn
                                </button>
                            )}
                            <button className="action-button" onClick={() => handleDetailClick(order.orderId)}>
                                Chi tiết
                            </button>
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