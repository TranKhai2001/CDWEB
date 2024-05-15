import {memo} from "react";
import "./style.scss";
import { FaRegWindowMinimize } from "react-icons/fa";
const Cart = () =>{
    return <>
        <div className="container">
            <div class="cart-section mt-150 mb-150">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-9 col-xl-12 col-md-12 col-sm-12">
                            <div class="cart-table-wrap">
                                <table class="cart-table">
                                    <thead class="cart-table-head">
                                    <tr class="table-head-row">
                                        <th class="product-remove">Xóa</th>
                                        <th class="product-image">Ảnh minh họa</th>
                                        <th class="product-name">Tên</th>
                                        <th class="product-price">Giá</th>
                                        <th class="product-quantity">Số lượng</th>
                                        <th class="product-total">Tổng cộng</th>
                                    </tr>
                                    </thead>
                                    <tbody >
                                    <tr class="table-body-row">
                                        <td class="product-remove"><a><FaRegWindowMinimize /></a></td>
                                    <td class="product-image"></td>
                                    <td class="product-name"></td>
                                    <td class="product-price"></td>
                                    <td class="product-quantity"><input type="number"/></td>
                                    <td class="product-total"></td>
                                </tr>
                            </tbody>
                            <tbody >
                            <tr class="table-body-row">
                            <td colspan="6">không có sản phẩm trong giỏ hàng!</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="col-lg-3 col-xl-12 col-md-12 col-sm-12">
                <div class="total-section">
                    <table class="total-table">
                        <thead class="total-table-head">
                        <tr class="table-total-row">
                            <th>Tất cả</th>
                            <th>Giá</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="total-data">
                            <td><strong>Tạm tính: </strong></td>
                            <td>vnd</td>
                        </tr>
                        <tr class="total-data">
                            <td><strong>Phí ship: </strong></td>
                            <td>vnd</td>
                        </tr>
                        <tr class="total-data">
                            <td><strong>Tổng cộng: </strong></td>
                            <td>vnd</td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="cart-buttons">
                        <a routerLink="/products" routerLinkActive="active" class="boxed-btn">Tiếp tục mua</a>
                        <a routerLink="/pay" routerLinkActive="active" class="boxed-btn black">Đặt hàng</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</div>
    </>;
}
export default memo(Cart);