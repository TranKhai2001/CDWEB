import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { FaRegWindowMinimize } from "react-icons/fa";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { ROUTERS } from "../../../utils/router";

// Hàm gọi API lấy thông tin giỏ hàng
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

// Hàm gọi API cập nhật số lượng sản phẩm trong giỏ hàng
const updateCartItemQuantity = async (cartItemDTO) => {
    const API_URL = 'http://localhost:8080/api/cart/update';
    try {
        await axios.put(API_URL, cartItemDTO, { withCredentials: true });
    } catch (error) {
        console.error('Failed to update cart item quantity:', error);
        throw error;
    }
};

// Hàm gọi API xóa sản phẩm trong giỏ hàng
const removeCartItem = async (productId) => {
    const API_URL = `http://localhost:8080/api/cart/remove?productId=${productId}`;
    try {
        await axios.delete(API_URL, { withCredentials: true });
    } catch (error) {
        console.error('Failed to remove cart item:', error);
        throw error;
    }
};

// Hàm gọi API lấy số lượng còn lại của sản phẩm
const getProductQuantity = async (productId) => {
    const API_URL = `http://localhost:8080/api/products/${productId}/quantity`;
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch product quantity:', error);
        throw error;
    }
};

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [productQuantities, setProductQuantities] = useState({});
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const shippingMoney = 10000;

    useEffect(() => {
        const fetchCartDetails = async () => {
            try {
                const data = await getCartDetails();
                setCartItems(data);
                calculateTotal(data);

                // Fetch quantities for each product in the cart
                const quantities = {};
                for (let item of data) {
                    const quantity = await getProductQuantity(item.productId);
                    quantities[item.productId] = quantity;
                }
                setProductQuantities(quantities);
            } catch (error) {
                console.error('Error fetching cart details:', error);
            }
        };

        fetchCartDetails();
    }, []);

    const calculateTotal = (items) => {
        const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotal(totalAmount);
    };

    const handleQuantityChange = async (productId, newQuantity) => {
        const maxQuantity = productQuantities[productId];
        if (newQuantity < 0 || newQuantity > maxQuantity) {
            alert(`Số lượng sản phẩm mau không được lớn hơn số lượng sản phẩm còn lại ${maxQuantity}`);
            return;
        }

        if (newQuantity === 0) {
            handleRemoveCartItem(productId);
            return;
        }

        const updatedItems = cartItems.map(item => {
            if (item.productId === productId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedItems);
        calculateTotal(updatedItems);

        const cartItemDTO = { productId, quantity: newQuantity };
        try {
            await updateCartItemQuantity(cartItemDTO);
        } catch (error) {
            console.error('Error updating cart item quantity:', error);
        }
    };

    const handleRemoveCartItem = async (productId, event) => {
        if (event) event.preventDefault();
        try {
            await removeCartItem(productId);
            const updatedItems = cartItems.filter(item => item.productId !== productId);
            setCartItems(updatedItems);
            calculateTotal(updatedItems);
        } catch (error) {
            console.error('Error removing cart item:', error);
        }
    };

    const handleCheckout = async (event) => {
        event.preventDefault();
        try {
            for (let item of cartItems) {
                const productResponse = await axios.get(`http://localhost:8080/api/products/${item.productId}/quantity`);
                const quantityAvailable = productResponse.data;
                if (item.quantity > quantityAvailable) {
                    alert(`Số lượng sản phẩm "${item.productName}" còn lại không đủ`);
                    return;
                }
            }
            navigate("/thanh-toan");
        } catch (error) {
            console.error('Error during checkout:', error);
            alert("Có lỗi xảy ra khi kiểm tra số lượng sản phẩm");
        }
    };

    return (
        <div className="container">
            <div className="cart-section mt-150 mb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 col-xl-12 col-md-12 col-sm-12">
                            <div className="cart-table-wrap">
                                <table className="cart-table">
                                    <thead className="cart-table-head">
                                    <tr className="table-head-row">
                                        <th className="product-remove">Xóa</th>
                                        <th className="product-image">Ảnh minh họa</th>
                                        <th className="product-name">Tên</th>
                                        <th className="product-price">Giá</th>
                                        <th className="product-quantity">Số lượng</th>
                                        <th className="product-total">Tổng cộng</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cartItems.length > 0 ? (
                                        cartItems.map(item => (
                                            <tr className="table-body-row" key={item.productId}>
                                                <td className="product-remove">
                                                    <a href="#" onClick={(event) => handleRemoveCartItem(item.productId, event)}>
                                                        <FaRegWindowMinimize />
                                                    </a>
                                                </td>
                                                <td className="product-image"><img src={item.imageUrl} alt={item.productName} /></td>
                                                <td className="product-name">{item.productName}</td>
                                                <td className="product-price">{item.price} VND</td>
                                                <td className="product-quantity">
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                                                        max={productQuantities[item.productId]} // Set max quantity
                                                    />
                                                </td>
                                                <td className="product-total">{item.price * item.quantity} VND</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className="table-body-row">
                                            <td colSpan="6">Không có sản phẩm trong giỏ hàng!</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="col-lg-3 col-xl-12 col-md-12 col-sm-12">
                            <div className="total-section">
                                <table className="total-table">
                                    <thead className="total-table-head">
                                    <tr className="table-total-row">
                                        <th>Tất cả</th>
                                        <th>Giá</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="total-data">
                                        <td><strong>Tạm tính: </strong></td>
                                        <td>{total} </td>
                                    </tr>
                                    <tr className="total-data">
                                        <td><strong>Phí ship: </strong></td>
                                        <td>{shippingMoney} VND</td> {/* Thay đổi nếu có phí ship */}
                                    </tr>
                                    <tr className="total-data">
                                        <td><strong>Tổng cộng: </strong></td>
                                        <td>{total + shippingMoney} VND</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className="cart-buttons">
                                    <a href="/" className="boxed-btn">Tiếp tục mua</a>
                                    <a href="" onClick={handleCheckout} className="boxed-btn black">Đặt hàng</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Cart);