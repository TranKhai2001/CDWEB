import {memo, useEffect, useState} from "react";
import "./style.scss";
import Item1 from "assets/users/image/trai_cay/dau_tay.jpg";
import {formatter} from "../../../utils/formatter";
import axios from "axios";
import {useNavigate} from "react-router-dom";

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
const OrderConfirm = () =>{

    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
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
                                    <tbody>
                                    {cartItems.map((item,index)=>(
                                        <tr>
                                            <td><img style={{width: '70px',height:`70px`}} src={item.imageUrl} alt={item.productName} /></td>
                                            <td>{item.productName}</td>
                                            <td style={{width: '40%'}}><span className="font-weight-bold"></span>
                                                <div className="product-qty"><span className="d-block" style={{
                                                    color: `black`,
                                                    fontSize: `14px`
                                                }}>{item.quantity}</span></div>
                                            </td>
                                            <td style={{width: '20%'}}>
                                                <div className="text-right"><span
                                                    className="font-weight-bold"> {formatter(item.quantity * item.price)}</span></div>
                                            </td>
                                        </tr>
                                    ))}

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
                                            <div class="text-right"> <span> {formatter(total)}</span> </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="text-left"> <span class="text-muted">Phí ship</span> </div>
                                        </td>
                                        <td>
                                            <div class="text-right"> <span> {formatter(shinpMonney)}</span> </div>
                                        </td>
                                    </tr>
                                    <tr class="border-top border-bottom">
                                        <td>
                                            <div class="text-left"> <span class="font-weight-bold">Tổng cộng</span> </div>
                                        </td>
                                        <td>
                                            <div class="text-right"> <span class="font-weight-bold"> {formatter(total + shinpMonney)}</span> </div>
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