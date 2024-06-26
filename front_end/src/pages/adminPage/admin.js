import { memo } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "./style.scss";
const AdminPage = () => {
    return (
        <div className="container">
            <div className="featured">
                <div className="section-title">
                    <Tabs>
                        <TabList>
                            <Tab>Danh sách người dùng</Tab>
                            <Tab>Danh sách sản phẩm</Tab>
                            <Tab>Danh sách đơn hàng</Tab>
                        </TabList>

                        <TabPanel>
                            <table style={{width:"100%"}}>
                                <tr>
                                    <th>Xóa</th>
                                    <th>STT</th>
                                    <th>Tên người dùng</th>
                                    <th>Mật khẩu</th>
                                    <th>Ngày sinh</th>
                                    <th>Giới tính</th>
                                    <th>Email</th>
                                    <th>Họ tên</th>
                                    <th>SĐT</th>
                                    <th>Ngày đăng ký tài khoản</th>
                                    <th>Trạng thái</th>
                                    <th>Role</th>
                                </tr>
                                <tr>
                                    <td>-</td>
                                    <td>1</td>
                                    <td>haidang3</td>
                                    <td>33333333</td>
                                    <td>1995-02-15 00:00:00.000000</td>
                                    <td>MALE</td>
                                    <td>haidang1@example.com</td>
                                    <td>Hai Dang</td>
                                    <td>0987654321</td>
                                    <td>2024-05-29 15:29:07</td>
                                    <td>INACTIVE</td>
                                    <td>USER</td>
                                </tr>
                            </table>
                        </TabPanel>
                        <TabPanel>
                            <table style={{width:"100%"}}>
                                <tr>
                                    <th>Xóa</th>
                                    <th>STT</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Mô tả</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Loại</th>
                                    <th>Link ảnh</th>
                                    <th>Trọng lượng</th>
                                    <th>Đơn vị</th>
                                    <th>Trạng thái</th>
                                </tr>
                                <tr>
                                    <td>-</td>
                                    <td>1</td>
                                    <td>Bí đỏ</td>
                                    <td>Bí đỏ sạch từ vườn</td>
                                    <td>2</td>
                                    <td>100</td>
                                    <td>1</td>
                                    <td>1.pnj</td>
                                    <td>0.20</td>
                                    <td>kg</td>
                                    <td>ACTIVE</td>
                                </tr>
                            </table>
                            <div className="add-product">
                                <div>
                                    <label>Tên sản phẩm:</label>
                                    <input type="text"/>
                                </div>
                                <div>
                                    <label>Mô tả:</label>
                                    <input type="text"/>
                                </div>
                                <div>
                                    <label>Giá:</label>
                                    <input type="text"/>
                                </div>
                                <div>
                                    <label>Số lượng:</label>
                                    <input type="text"/>
                                </div>
                                <div>
                                    <label>Loại:</label>
                                    <input type="text"/>
                                </div>
                                <div>
                                    <label>Link ảnh:</label>
                                    <input type="text"/>
                                </div>
                                <div>
                                    <label>Trọng lượng:</label>
                                    <input type="text"/>
                                </div>
                                <div>
                                    <label>Đơn vị:</label>
                                    <input type="text"/>
                                </div>
                                <div>
                                    <label>Trạng thái:</label>
                                    <input type="text"/>
                                </div>
                                <div>
                                    <button>Thêm sản phẩm</button>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <table style={{width:"100%"}}>
                                <tr>
                                    <th>Xóa</th>
                                    <th>STT</th>
                                    <th>Tên người dùng</th>
                                    <th>Mật khẩu</th>
                                    <th>Ngày sinh</th>
                                    <th>Giới tính</th>
                                    <th>Email</th>
                                    <th>Họ tên</th>
                                    <th>SĐT</th>
                                    <th>Ngày đăng ký tài khoản</th>
                                    <th>Trạng thái</th>
                                    <th>Role</th>
                                </tr>
                                <tr>
                                    <td>-</td>
                                    <td>1</td>
                                    <td>haidang3</td>
                                    <td>33333333</td>
                                    <td>1995-02-15 00:00:00.000000</td>
                                    <td>MALE</td>
                                    <td>haidang1@example.com</td>
                                    <td>Hai Dang</td>
                                    <td>0987654321</td>
                                    <td>2024-05-29 15:29:07</td>
                                    <td>INACTIVE</td>
                                    <td>USER</td>
                                </tr>
                            </table>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default memo(AdminPage);
