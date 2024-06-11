import { memo, useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import { formatter } from "../../../utils/formatter";
import { useNavigate } from "react-router-dom";

const getCartDetails = async () => {
    const API_URL = 'http://localhost:8080/api/cart/details'; // Change to your backend URL
    try {
        const response = await axios.get(API_URL, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch cart details:', error);
        throw error;
    }
};

const Pay = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const shippingMoney = 10000;

    useEffect(() => {
        const fetchCartDetails = async () => {
            try {
                const data = await getCartDetails();
                setCartItems(data);
            } catch (error) {
                console.error('Error fetching cart details:', error);
            }
        };
        fetchCartDetails();
    }, []);

    useEffect(() => {
        let totalAmount = 0;
        cartItems.forEach(item => {
            totalAmount += item.price * item.quantity;
        });
        setTotal(totalAmount);
    }, [cartItems]);

    const [userInfo, setUserInfo] = useState({
        fullName: '',
        phone: ''
    });

    useEffect(() => {
        const userFromSession = JSON.parse(sessionStorage.getItem('user'));
        if (userFromSession) {
            setUserInfo({
                fullName: userFromSession.fullName,
                phone: userFromSession.phone
            });
        }
    }, []);

    const handleUserInfoChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');

    const handleOrderSubmit = async () => {
        if (cartItems.length === 0) {
            alert("Giỏ hàng của bạn trống");
            return;
        }

        if (!userInfo.fullName || !userInfo.phone || !city || !district || !ward ) {
            alert("Bạn hãy điền đủ thông tin");
            return;
        }

        const orderDto = {
            deliveryAddress: `${city}, ${district}, ${ward}, ${deliveryAddress}`,
            paymentMethod: 'CASH_ON_DELIVERY',
            items: cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            }))
        };

        try {
            const response = await axios.post('http://localhost:8080/api/order/place', orderDto, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            navigate("/xac-nhan-don-hang", {
                state: {
                    orderId: response.data.orderId,
                    orderDate: response.data.orderDate,
                    deliveryAddress: `${city}, ${district}, ${ward}, ${deliveryAddress}`,
                    cartItems: cartItems,
                    total: total,
                    shippingMoney: shippingMoney
                }
            });
        } catch (error) {
            console.error('There was an error placing the order!', error);
            alert('There was an error placing the order. Please try again.');
        }
    };

    return (
        <div className="container">
            <div className="Frame-Element row">
                <div className="Infor-Input">
                    <div className="Frame-pay">
                        <div className="Title">
                            <h1>Thanh toán và giao hàng</h1>
                        </div>
                        <div className="Infor-Customer">
                            <p>Họ tên:</p>
                            <input
                                type="text"
                                name="fullName"
                                value={userInfo.fullName}
                                onChange={handleUserInfoChange}
                                required
                            />
                            <p>Số điện thoại:</p>
                            <input
                                type="text"
                                name="phone"
                                value={userInfo.phone}
                                onChange={handleUserInfoChange}
                                required
                            />
                            <p>Tỉnh/Thành phố:</p>
                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
                            <p>Quận/Huyện:</p>
                            <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} required />
                            <p>Phường/Xã:</p>
                            <input type="text" value={ward} onChange={(e) => setWard(e.target.value)} required />
                            <p>Địa chỉ nhận hàng:</p>
                            <input type="text" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} required />
                        </div>
                    </div>
                </div>
                <div className="Product">
                    <div className="Frame-Product">
                        <div className="Title-Product">
                            <h2>Đơn hàng của bạn:</h2>
                        </div>
                        {cartItems.map((item, index) => (
                            <div className="Product-Element" key={index}>
                                <img src={item.imageUrl} alt={item.productName} />
                                <div className="Infor-Product">
                                    <p className="Name-Product">{item.productName}</p>
                                    <p className="Price">Số lượng: {item.quantity}</p>
                                    <p className="Price">Giá: {formatter(item.price * item.quantity)}</p>
                                </div>
                            </div>
                        ))}
                        <div className="Money-Element">
                            <div className="Money">
                                <p>Tổng tiền sản phẩm:</p>
                                <p className="Price">{formatter(total)}</p>
                            </div>
                            <div className="Money">
                                <p>Phí giao hàng:</p>
                                <p className="Price">{formatter(shippingMoney)}</p>
                            </div>
                        </div>
                        <div className="Total-Money">
                            <div className="Money">
                                <p>Tổng tiền:</p>
                                <p className="Price">{formatter(total + shippingMoney)}</p>
                            </div>
                        </div>
                        <div className="Button" onClick={handleOrderSubmit}>
                            <p>Đặt hàng</p>
                        </div>
                        <div><a href=""></a></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Pay);
