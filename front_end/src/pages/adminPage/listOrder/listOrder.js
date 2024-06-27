import React, { memo, useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "./style.scss";
import { formatter } from "../../../utils/formatter";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListOrder = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedTab, setSelectedTab] = useState('PENDING');
    const [currentPage, setCurrentPage] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');
    const ordersPerPage = 10;
    const navigate = useNavigate();

    const fetchOrders = () => {
        axios.get('http://localhost:8080/api/order/orders', { withCredentials: true })
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the orders!", error);
            });
    };

    useEffect(() => {
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

        checkLogin();
    }, [navigate]);

    useEffect(() => {
        if (currentUser && currentUser.role === 'ADMIN') {
            fetchOrders();
        }
    }, [currentUser]);

    useEffect(() => {
        const interval = setInterval(fetchOrders, 10000); // Fetch orders every 60 seconds
        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);

    useEffect(() => {
        const filtered = orders.filter(order => order.status === selectedTab);
        setFilteredOrders(filtered);
        setCurrentPage(0); // Reset to first page whenever filter changes
    }, [orders, selectedTab]);

    const handleTabSelect = (index) => {
        const tabStatus = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
        setSelectedTab(tabStatus[index]);
    };

    const handleStatusChange = (orderId, newStatus) => {
        axios.put(`http://localhost:8080/api/order/update-status/${orderId}`, { status: newStatus }, { withCredentials: true })
            .then(response => {
                setOrders(orders.map(order =>
                    order.orderId === orderId ? { ...order, status: newStatus } : order
                ));
            })
            .catch(error => {
                console.error("There was an error updating the order status!", error);
            });
    };

    const handlePageClick = (newPage) => {
        setCurrentPage(newPage);
    };

    const pageCount = Math.ceil(filteredOrders.length / ordersPerPage);
    const displayedOrders = filteredOrders.slice(currentPage * ordersPerPage, (currentPage + 1) * ordersPerPage);

    return (
        <div className="container">
            <h2>Quản lí Đơn Hàng</h2>
            {error ? <div>{error}</div> : null}
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
                            <OrderTable orders={displayedOrders} onStatusChange={handleStatusChange} />
                        </TabPanel>
                        <TabPanel>
                            <OrderTable orders={displayedOrders} onStatusChange={handleStatusChange} />
                        </TabPanel>
                        <TabPanel>
                            <OrderTable orders={displayedOrders} onStatusChange={handleStatusChange} />
                        </TabPanel>
                        <TabPanel>
                            <OrderTable orders={displayedOrders} onStatusChange={handleStatusChange} />
                        </TabPanel>
                        <TabPanel>
                            <OrderTable orders={displayedOrders} onStatusChange={handleStatusChange} />
                        </TabPanel>
                    </Tabs>
                    <Pagination pageCount={pageCount} onPageChange={handlePageClick} currentPage={currentPage} />
                </div>
            </div>
        </div>
    );
};

const OrderTable = ({ orders, onStatusChange }) => {
    const navigate = useNavigate();

    const handleDetailClick = (orderId) => {
        navigate(`/chi-tiet-don-hang-admin/${orderId}`);
    };

    return (
        <table style={{ width: "100%" }} className="list-order">
            <thead>
            <tr>
                <th>Mã đơn hàng</th>
                <th>Họ tên</th>
                <th>SĐT</th>
                <th>Ngày đặt hàng</th>
                <th>Địa chỉ</th>
                <th>Tổng tiền</th>
                <th>Thao tác</th>
                <th>Trạng thái thanh toán</th>
                <th>Tùy chọn</th>
            </tr>
            </thead>
            <tbody>
            {orders.map((order, index) => (
                <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.userName}</td>
                    <td>{order.phoneNumber}</td>
                    <td>{new Date(order.orderDate).toLocaleString()}</td>
                    <td>{order.deliveryAddress}</td>
                    <td>{formatter(order.totalAmount + 10000)}</td>
                    <td>
                        {order.status === 'PENDING' && (
                            <>
                                <button className="action-buttons" onClick={() => onStatusChange(order.orderId, 'PROCESSING')}>Xác nhận</button>
                                <button className="action-buttons" onClick={() => onStatusChange(order.orderId, 'CANCELLED')}>Hủy</button>
                            </>
                        )}
                        {order.status === 'PROCESSING' && (
                            <>
                                <button className="action-buttons" onClick={() => onStatusChange(order.orderId, 'SHIPPED')}>Giao</button>
                                <button className="action-buttons" onClick={() => onStatusChange(order.orderId, 'CANCELLED')}>Hủy</button>
                            </>
                        )}
                        {order.status === 'SHIPPED' && (
                            <>
                                <button className="action-buttons" onClick={() => onStatusChange(order.orderId, 'DELIVERED')}>Giao hàng thành công</button>
                                <button className="action-buttons" onClick={() => onStatusChange(order.orderId, 'CANCELLED')}>Hủy</button>
                            </>
                        )}
                        {order.status === 'CANCELLED' && (
                            <span>Đơn hàng đã bị hủy</span>
                        )}
                        {order.status === 'DELIVERED' && (
                            <span>Đã giao hàng thành công</span>
                        )}
                    </td>
                    <td>{getPaymentStatus(order.paymentStatus)}</td>
                    <td>
                        <button className="action-button" onClick={() => handleDetailClick(order.orderId)}>
                            Chi tiết
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
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

export default memo(ListOrder);