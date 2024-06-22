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
                            <OrderTable orders={filteredOrders} onStatusChange={handleStatusChange} />
                        </TabPanel>
                        <TabPanel>
                            <OrderTable orders={filteredOrders} onStatusChange={handleStatusChange} />
                        </TabPanel>
                        <TabPanel>
                            <OrderTable orders={filteredOrders} onStatusChange={handleStatusChange} />
                        </TabPanel>
                        <TabPanel>
                            <OrderTable orders={filteredOrders} onStatusChange={handleStatusChange} />
                        </TabPanel>
                        <TabPanel>
                            <OrderTable orders={filteredOrders} onStatusChange={handleStatusChange} />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

const OrderTable = ({ orders, onStatusChange }) => (
    <table style={{ width: "100%" }} className="list-order">
        <thead>
        <tr>
            <th>Xóa</th>
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
                <td>-</td>
                <td>{index + 1}</td>
                <td>{order.userName}</td>
                <td>{order.phoneNumber}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>{order.deliveryAddress}</td>
                <td>{formatter(order.totalAmount)}</td>
                <td>
                    <select
                        value={order.status}
                        onChange={(e) => onStatusChange(order.orderId, e.target.value)}
                    >
                        <option value="PENDING">PENDING</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                    </select>
                </td>
                <td>{order.paymentStatus === 'PAID' ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
            </tr>
        ))}
        </tbody>
    </table>
);

export default memo(ListOrder);
