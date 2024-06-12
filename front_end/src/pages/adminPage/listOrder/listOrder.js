import { memo } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "./style.scss";

const ListOrder = () =>{
    return (
        <div className="container">
            <div className="section-title">
                <h2>Danh sách đơn hàng</h2>
            </div>
            <table style={{width:"100%"}}>
                <tr>
                    <th>Xóa</th>
                    <th>STT</th>
                    <th>Tên người dùng</th>
                    <th>Địa chỉ</th>
                    <th>Ngày đặt hàng</th>
                    <th>Trạng thái</th>
                    <th>Chi tiết</th>
                </tr>
                <tr>
                    <td>-</td>
                    <td>1</td>
                    <td>Trần Khải</td>
                    <td>tphcm, thủ đức, linh trung, </td>
                    <td>2024-05-29 08:53:24</td>
                    <td>ACTIVE</td>
                    <td><a href="">Click</a></td>
                </tr>
            </table>
        </div>
    );

};
export default memo(ListOrder);