import { memo, useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "./style.scss";
import { formatter } from "../../../utils/formatter";
import axios from "axios";

const ListOrder = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedTab, setSelectedTab] = useState('PENDING');
    const [currentPage, setCurrentPage] = useState(0);
    const ordersPerPage = 10;

    useEffect(() => {
        // Fetch orders from the backend API
        axios.get('http://localhost:8080/api/order/orders')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the orders!", error);
            });
    }, []);

    useEffect(() => {
        // Filter orders based on the selected tab
        const filtered = orders.filter(order => order.status === selectedTab);
        setFilteredOrders(filtered);
        setCurrentPage(0);  // Reset to first page whenever filter changes
    }, [orders, selectedTab]);

    const handleTabSelect = (index) => {
        const tabStatus = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
        setSelectedTab(tabStatus[index]);
    };

    const handleStatusChange = (orderId, newStatus) => {
        axios.put(`http://localhost:8080/api/order/update-status/${orderId}`, { status: newStatus })
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

const OrderTable = ({ orders, onStatusChange }) => (
    <table style={{ width: "100%" }} className="list-order">
        <thead>
        <tr>
            <th>STT</th>
            <th>Họ tên</th>
            <th>SĐT</th>
            <th>Ngày đặt hàng</th>
            <th>Địa chỉ</th>
            <th>Tổng tiền</th>
            <th>Trạng thái đơn hàng</th>
            <th>Trạng thái thanh toán</th>
        </tr>
        </thead>
        <tbody>
        {orders.map((order, index) => (
            <tr key={order.orderId}>
                <td>{index + 1}</td>
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
                <td>{order.paymentStatus === 'PAID' ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
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

export default memo(ListOrder);