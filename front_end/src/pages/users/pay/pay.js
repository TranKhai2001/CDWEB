import {memo} from "react";
import "./style.scss";
const Pay = () =>{
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
                                <input type="text" value=""/>
                                <p>Số điện thoại: </p>
                                <input type="text" value=""/>
                                <p>Tỉnh/Thành phố:</p>
                                <input type="text" value=""/>
                                <p>Quận/Huyện:</p>
                                <input type="text" value=""/>
                                <p>Phường/Xã:</p>
                                <input type="text" value=""/>
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
                            <div class="Product-Element">
                            {/*<img src="" alt="">*/}
                                <div class="Infor-Product">
                                    <p class="Name-Product"></p>
                                    <p class="Price">11111</p>
                                    <p class="Price"> 1111VNĐ</p>
                                </div>
                            </div>
                            <div class="Money-Element">
                                <div class="Money">
                                    <p>Tổng tiền sản phẩm:</p>
                                    <p class="Price"> VNĐ</p>
                                </div>
                                <div class="Money">
                                    <p>Phí giao hàng:</p>
                                    <p class="Price"> VNĐ</p>
                                </div>
                            </div>
                            <div class="Total-Money">
                                <div class="Money">
                                    <p>Tổng tiền:</p>
                                    <p class="Price"> VNĐ</p>
                                </div>
                            </div>
                            <div class="Button" routerLink="/order-confirmed" routerLinkActive="active" >
                                <p>Đặt hàng</p>
                            </div>
                            <div><a href=""></a></div>
                        </div>
                    </div>
                </div>

        </div>
            ) }
export default memo(Pay);