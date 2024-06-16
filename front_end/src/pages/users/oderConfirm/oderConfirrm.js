import { memo, useEffect, useState } from "react";
import "./style.scss";
import { formatter } from "../../../utils/formatter";
import { useLocation } from "react-router-dom";
import axios from "axios";

const getCartDetails = async () => {
    const API_URL = 'http://localhost:8080/api/cart/details';
    try {
        const response = await axios.get(API_URL, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch cart details:', error);
        throw error;
    }
};

const OrderConfirm = () => {

    const location = useLocation();
    const { orderDate, orderId, deliveryAddress,total,shippingMoney ,cartItems} = location.state || {};

    return (
        <div className="container mt-5 mb-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="text-left logo p-2 px-5">
                            <h1 style={{ textAlign: `center`, padding: `25px` }}>Xác nhận đơn hàng!</h1>
                        </div>
                        <div className="invoice p-5">
                            <span className="font-weight-bold d-block mt-4">Hello,</span>
                            <span>Đơn đặt hàng của bạn đã được xác nhận và sẽ được giao trong vài ngày tới!</span>
                            <div className="payment border-top mt-3 mb-3 border-bottom table-responsive">
                                <table className="table table-borderless">
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div className="py-2">
                                                <span className="d-block text-muted">Ngày đặt hàng</span>
                                                <br />
                                                <span>{orderDate}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="py-2">
                                                <span className="d-block text-muted">Mã đặt hàng</span>
                                                <br />
                                                <span>{orderId}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="py-2">
                                                <span className="d-block text-muted">Hình thức thanh toán</span>
                                                <br />
                                                <span>Thanh toán khi nhận hàng</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="py-2">
                                                <span className="d-block text-muted">Địa chỉ</span>
                                                <br />
                                                <span>{deliveryAddress}</span>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="product border-bottom table-responsive">
                                <table className="table table-borderless">
                                    <tbody>
                                    {cartItems.map((item, index) => (
                                        <tr key={index}>
                                            <td><img style={{ width: '70px', height: `70px` }} src={item.imageUrl} alt={item.productName} /></td>
                                            <td>{item.productName}</td>
                                            <td style={{ width: '40%' }}>
                                                <span className="font-weight-bold"></span>
                                                <div className="product-qty">
                                                    <span className="d-block" style={{ color: `black`, fontSize: `14px` }}>SL: {item.quantity}</span>
                                                </div>
                                            </td>
                                            <td style={{ width: '20%' }}>
                                                <div className="text-right">
                                                    <span className="font-weight-bold"> Giá: {formatter(item.quantity * item.price)}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row d-flex justify-content-end">
                                <div className="col-md-5">
                                    <table className="table table-borderless">
                                        <tbody className="totals">
                                        <tr>
                                            <td>
                                                <div className="text-left">
                                                    <span className="text-muted">Tạm tính</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-right">
                                                    <span> {formatter(total)}</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="text-left">
                                                    <span className="text-muted">Phí ship</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-right">
                                                    <span> {formatter(shippingMoney)}</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-top border-bottom">
                                            <td>
                                                <div className="text-left">
                                                    <span className="font-weight-bold">Tổng cộng</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-right">
                                                    <span className="font-weight-bold"> {formatter(total+shippingMoney)}</span>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <p>Chúng tôi sẽ gửi email xác nhận vận chuyển khi hàng được vận chuyển thành công!</p>
                            <p className="font-weight-bold mb-0">Cảm ơn đã mua sắm với chúng tôi!</p>
                            <a href="/lich-su-don-hang"><p>Xem đơn hàng của bạn tại đây</p></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(OrderConfirm);
