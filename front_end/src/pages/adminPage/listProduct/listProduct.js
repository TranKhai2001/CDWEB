import { memo } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "./style.scss";

const ListProduct = () =>{
    return (
        <div className="container">
            <div className="section-title">
                <h2>Danh sách sản phẩm</h2>
            </div>
            <table style={{width:"100%"}}>
                <tr>
                    <th>Xóa</th>
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>Mô tả</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Loại</th>
                    <th>Trạng thái</th>
                    <th>Chi tết</th>
                </tr>
                <tr>
                    <td>-</td>
                    <td>1</td>
                    <td>Bí đỏ</td>
                    <td>Bí đỏ sạch từ vườn</td>
                    <td>2</td>
                    <td>100</td>
                    <td>1</td>
                    <td>ACTIVE</td>
                    <td><a href="">Click</a></td>
                </tr>
            </table>
        </div>
    );

};
export default memo(ListProduct);