import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import { formatter } from "../../../utils/formatter";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedTab, setSelectedTab] = useState('PENDING');
    const [currentPage, setCurrentPage] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');
    const ordersPerPage = 5;
    const navigate = useNavigate();
    const shippingMoney = 10000;

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/check-login', {
                    withCredentials: true
                });
                if (response.status === 200) {
                    setCurrentUser(response.data);
                } else {
                    navigate('/dang-nhap');
                }
            } catch (error) {
                navigate('/dang-nhap');
            }
        };

        fetchCurrentUser();
    }, [navigate]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/order/history', {
                    withCredentials: true
                });
                const sortedOrders = response.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
                setOrders(sortedOrders);
            } catch (error) {
                console.error('There was an error fetching the order history!', error);
            }
        };

        if (currentUser) {
            fetchOrders();
            const intervalId = setInterval(fetchOrders, 3000);

            return () => clearInterval(intervalId);
        }
    }, [currentUser]);

    useEffect(() => {
        const filtered = orders.filter(order => order.status === selectedTab);
        setFilteredOrders(filtered);
        setCurrentPage(0);
    }, [orders, selectedTab]);

    const handleTabSelect = (index) => {
        const tabStatus = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
        setSelectedTab(tabStatus[index]);
    };

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

    const handlePageClick = (newPage) => {
        setCurrentPage(newPage);
    };

    const pageCount = Math.ceil(filteredOrders.length / ordersPerPage);
    const displayedOrders = filteredOrders.slice(currentPage * ordersPerPage, (currentPage + 1) * ordersPerPage);

    if (error) {
        return <div>{error}</div>;
    }

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h2>Lịch Sử Đơn Hàng</h2>
            <div className="featured">
                <div className="section-title">
                    <Tabs onSelect={handleTabSelect}>
                        <TabList>
                            <Tab>Chưa xác nhận</Tab>
                            <Tab>Xác nhận</Tab>
                            <Tab>Đang vận chuyển</Tab>
                            <Tab>Đã giao</Tab>
                            <Tab>Đã hủy</Tab>
                        </TabList>

                        <TabPanel>
                            <OrderTable orders={displayedOrders} onDetailClick={handleDetailClick} onReceivedClick={handleReceivedClick} />
                        </TabPanel>
                        <TabPanel>
                            <OrderTable orders={displayedOrders} onDetailClick={handleDetailClick} onReceivedClick={handleReceivedClick} />
                        </TabPanel>
                        <TabPanel>
                            <OrderTable orders={displayedOrders} onDetailClick={handleDetailClick} onReceivedClick={handleReceivedClick} />
                        </TabPanel>
                        <TabPanel>
                            <OrderTable orders={displayedOrders} onDetailClick={handleDetailClick} onReceivedClick={handleReceivedClick} />
                        </TabPanel>
                        <TabPanel>
                            <OrderTable orders={displayedOrders} onDetailClick={handleDetailClick} onReceivedClick={handleReceivedClick} />
                        </TabPanel>
                    </Tabs>
                    <Pagination pageCount={pageCount} onPageChange={handlePageClick} currentPage={currentPage} />
                </div>
            </div>
        </div>
    );
};

const OrderTable = ({ orders, onDetailClick, onReceivedClick }) => (
    <table style={{ width: "100%" }} className="list-order">
        <thead>
        <tr>
            <th>Mã đơn hàng</th>
            <th>Ngày đặt hàng</th>
            <th>Địa chỉ</th>
            <th>Tổng tiền</th>
            <th>Trạng thái đơn hàng</th>
            <th>Trạng thái thanh toán</th>
            <th>Tùy chọn</th>
        </tr>
        </thead>
        <tbody>
        {orders.map((order, index) => (
            <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>{order.deliveryAddress}</td>
                <td>{formatter(order.totalAmount + 10000)}</td>
                <td>{getOrderStatus(order.status)}</td>
                <td>{getPaymentStatus(order.paymentStatus)}</td>
                <td>
                    {order.status === 'PENDING' && (
                        <button className="action-button" onClick={() => onReceivedClick(order.orderId)}>
                            Hủy đơn
                        </button>
                    )}
                    <button className="action-button" onClick={() => onDetailClick(order.orderId)}>
                        Chi tiết
                    </button>
                </td>
            </tr>
        ))}
        </tbody>
    </table>
);

const Pagination = ({ pageCount, onPageChange, currentPage }) => (
    <div className="pagination">
        {[...Array(pageCount)].map((_, index) => (
            <button
                key={index}
                className={`page-number ${index === currentPage ? 'active' : ''}`}
                onClick={() => onPageChange(index)}
            >
                {index + 1}
            </button>
        ))}
    </div>
);

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

export default memo(OrderHistory);