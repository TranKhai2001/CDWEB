import {memo} from "react";
import "./style.scss";
import Item1 from "assets/users/image/trai_cay/dau_tay.jpg";
import {formatter} from "../../../utils/formatter";
const OrderConfirm = () =>{
    return (
        <div class="container mt-5 mb-5">
            <div class="row d-flex justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="text-left logo p-2 px-5"><h1 style={{textAlign:`center`,padding:`25px`}}>Xác nhận đơn hàng!</h1> </div>
                        <div class="invoice p-5">
                            <span class="font-weight-bold d-block mt-4">Hello, </span> <span>Đơn đặt hàng của bạn đã được xác nhận và sẽ được giao trong vài ngày tới!</span>
                            <div class="payment border-top mt-3 mb-3 border-bottom table-responsive">
                                <table class="table table-borderless">
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div class="py-2"> <span class="d-block text-muted">Ngày đặt hàng</span> <br/> <span>20-11-2001</span> </div>
                                        </td>
                                        <td>
                                            <div class="py-2"> <span class="d-block text-muted">Mã đặt hàng</span> <br/> <span>MT222</span> </div>
                                        </td>
                                        <td>
                                            <div class="py-2"> <span class="d-block text-muted">Hình thức thanh toán</span> <br/><span>Thanh toán khi nhận hàng</span> </div>
                                        </td>
                                        <td>
                                            <div class="py-2"> <span class="d-block text-muted">Địa chỉ</span> <br/><span>Bắc sơn , trảng bom , Đồng Nai</span> </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="product border-bottom table-responsive">
                                <table class="table table-borderless">
                                    <tbody >
                                    <tr>
                                        <td style={{ width: '20%'  }}> <img src={Item1} className="img-product"/> </td>
                                        <td style={{ width: '40%' }}> <span class="font-weight-bold"></span>
                                            <div class="product-qty"> <span class="d-block" style={{color:`black`,fontSize:`14px`}} >Số lượng:11</span></div>
                                        </td>
                                        <td style={{ width: '20%' }}>
                                            <div class="text-right"> <span class="font-weight-bold"> {formatter(100000)}</span> </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row d-flex justify-content-end">
                            <div class="col-md-5">
                                <table class="table table-borderless">
                                    <tbody class="totals">
                                    <tr>
                                        <td>
                                            <div class="text-left"> <span class="text-muted">Tạm tính</span> </div>
                                        </td>
                                        <td>
                                            <div class="text-right"> <span> VNĐ</span> </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="text-left"> <span class="text-muted">Phí ship</span> </div>
                                        </td>
                                        <td>
                                            <div class="text-right"> <span> VNĐ</span> </div>
                                        </td>
                                    </tr>
                                    <tr class="border-top border-bottom">
                                        <td>
                                            <div class="text-left"> <span class="font-weight-bold">Tổng cộng</span> </div>
                                        </td>
                                        <td>
                                            <div class="text-right"> <span class="font-weight-bold"> VNĐ</span> </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <p>Chúng tôi sẽ gửi email xác nhận vận chuyển khi hàng được vận chuyển thành công!</p>
                        <p class="font-weight-bold mb-0">Cảm ơn đã mua sắm với chúng tôi!</p>
                    </div>
                </div>
            </div>
        </div>
</div>
);

};
export default memo(OrderConfirm);