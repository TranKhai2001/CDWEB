import {memo, useEffect, useState} from "react";
import "./style.scss";
import axios from "axios";
import {formatter} from "../../../utils/formatter";
import {useNavigate} from "react-router-dom";

// Hàm gọi API lấy thông tin giỏ hàng
const getCartDetails = async () => {
    const API_URL = 'http://localhost:8080/api/cart/details'; // Đổi thành URL backend của bạn
    try {
        const response = await axios.get(API_URL, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch cart details:', error);
        throw error;
    }
};
const Pay = () =>{
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const navige = useNavigate();
    const shinpMonney = 10000;

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

    // -------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------
    const [userInfo, setUserInfo] = useState({
        userId: '',
    });

    useEffect(() => {
        // Lấy thông tin userInfo từ session hoặc từ API
        const userFromSession = JSON.parse(sessionStorage.getItem('user'));
        console.log('Submitting', userFromSession);
        if (userFromSession && userFromSession.userId) {
            setUserInfo(prevUserInfo => ({
                ...prevUserInfo,
                userId: userFromSession.userId
            }));
        }
    }, []);

    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const addressData = {
            city: city,
            district: district,
            ward: ward,
            userId: userInfo.userId
        };

        console.log('Submitting', addressData); // Log dữ liệu để kiểm tra

        try {
            await axios.post('http://localhost:8080/address/saveAddress', addressData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('Address saved successfully');
            navige("/xac-nhan-don-hang");
        } catch (error) {
            console.error('There was an error saving the address!', error);
        }
    };
    // -------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------

    return (
        <div className="container">
                <div class="Frame-Element row">
                    <div class="Infor-Input ">
                        <div class="Frame-pay">
                            <div class="Title">
                                <h1>Thanh toán và giao hàng</h1>
                            </div>
                            <div class="Infor-Customer">
                                <p>Họ tên:</p>
                                <input type="text" value="" required/>
                                <p>Số điện thoại: </p>
                                <input type="text" value="" required/>
                                // -------------------------------------------------------------------------------------
                                // -------------------------------------------------------------------------------------
                                <p>Tỉnh/Thành phố:</p>
                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
                                <p>Quận/Huyện:</p>
                                <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} required />
                                <p>Phường/Xã:</p>
                                <input type="text" value={ward} onChange={(e) => setWard(e.target.value)} required />
                                // -------------------------------------------------------------------------------------
                                // -------------------------------------------------------------------------------------
                                <p>Địa chỉ nhận hàng:</p>
                                <input type="text" value=""/>
                            </div>
                        </div>
                    </div>
                    <div class="Product ">
                        <div class="Frame-Product">
                            <div class="Title-Product">
                                <h2>Đơn hàng của bạn:</h2>
                            </div>
                            {cartItems.map((item, index) => (
                                <div className="Product-Element" key={index}>
                                    <img src={item.imageUrl} alt={item.productName} />
                                    <div className="Infor-Product">
                                        <p className="Name-Product">{item.productName}</p>
                                        <p className="Price">Số lượng: {item.quantity}</p>
                                        <p className="Price">Giá: {formatter(item.price*item.quantity)}</p>
                                    </div>
                                </div>
                            ))}

                            <div class="Money-Element">
                                <div class="Money">
                                    <p>Tổng tiền sản phẩm:</p>
                                    <p class="Price"> {formatter(total)}</p>
                                </div>
                                <div class="Money">
                                    <p>Phí giao hàng:</p>
                                    <p class="Price"> {formatter(shinpMonney)}</p>
                                </div>
                            </div>
                            <div class="Total-Money">
                                <div class="Money">
                                    <p>Tổng tiền:</p>
                                    <p class="Price"> {formatter(total + shinpMonney)}</p>
                                </div>
                            </div>
                            // -------------------------------------------------------------------------------------
                            // -------------------------------------------------------------------------------------
                            <div class="Button"  routerLinkActive="active"  onClick={handleSubmit}>
                                <p>Đặt hàng</p>
                            </div>
                            // -------------------------------------------------------------------------------------
                            // -------------------------------------------------------------------------------------
                            <div><a href=""></a></div>
                        </div>
                    </div>
                </div>

        </div>
            ) }
export default memo(Pay);