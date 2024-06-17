import { memo } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "./style.scss";
import {formatter} from "../../../utils/formatter";

const ListOrder = () =>{
    return (
        <div className="container">
            <div className="featured">
                <div className="section-title">
                    <Tabs>
                        <TabList>
                            <Tab>Tất cả</Tab>
                            <Tab>Đơn hàng đang giao</Tab>
                            <Tab>Đơn hàng đã giao</Tab>
                        </TabList>

                        <TabPanel>
                            <table style={{width:"100%"}} className="list-order" >
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
                                <tr>
                                    <td>-</td>
                                    <td>1</td>
                                    <td>Hai Dang</td>
                                    <td>0987654321</td>
                                    <td>2024-05-29 15:29:07</td>
                                    <td>Trảng Bom, Đồng Nai</td>
                                    <td>{formatter(10000)}</td>
                                    <td>Đang giao</td>
                                    <td>Đã thanh toán</td>
                                </tr>
                            </table>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );

};
export default memo(ListOrder);