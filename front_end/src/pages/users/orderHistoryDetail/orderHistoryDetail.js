import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import "./style.scss";
import {Link, useNavigate} from "react-router-dom";


const OrderHistoryDetail = () => {

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
                                        <th className="product-image">Ảnh minh họa</th>
                                        <th className="product-name">Tên</th>
                                        <th className="product-price">Giá</th>
                                        <th className="product-quantity">Số lượng</th>
                                        <th className="product-total">Tổng cộng</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                            <tr className="table-body-row" >
                                                <td className="product-image"></td>
                                                <td className="product-name"></td>
                                                <td className="product-price"> VND</td>
                                                <td className="product-quantity">
                                                    <input
                                                        type="number"
                                                    />
                                                </td>
                                                <td className="product-total"> VND</td>
                                            </tr>



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
                                        <td> </td>
                                    </tr>
                                    <tr className="total-data">
                                        <td><strong>Phí ship: </strong></td>
                                        <td> VND</td> {/* Thay đổi nếu có phí ship */}
                                    </tr>
                                    <tr className="total-data">
                                        <td><strong>Tổng cộng: </strong></td>
                                        <td> VND</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className="cart-buttons">
                                    <a href="/lich-su-don-hang" className="boxed-btn">Trở về</a>
                                    <a href="" className="boxed-btn black">Mua lại</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(OrderHistoryDetail);