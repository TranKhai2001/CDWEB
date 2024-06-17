// ListUser.js
import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'react-tabs/style/react-tabs.css';
import "./style.scss";

const ListUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8080/users');
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error('Failed to fetch users');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/users/${id}`, {
                method: 'PUT',
            });

            if (response.ok) {
                setUsers(users.map(user => user.userId === id ? { ...user, status: 'INACTIVE' } : user));
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="container">
            <div className="section-title">
                <h2>Danh sách người dùng</h2>
            </div>
            <table style={{ width: "100%" }}>
                <thead>
                <tr>
                    <th>Xóa</th>
                    <th>STT</th>
                    <th>Tên người dùng</th>
                    <th>Ngày sinh</th>
                    <th>Giới tính</th>
                    <th>Email</th>
                    <th>Họ tên</th>
                    <th>SĐT</th>
                    <th>Trạng thái</th>
                    <th>Chi tiết</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={user.userId}>
                        <td onClick={() => deleteUser(user.userId)}>-</td>
                        <td>{index + 1}</td>
                        <td>{user.username}</td>
                        <td>{user.dateOfBirth}</td>
                        <td>{user.gender}</td>
                        <td>{user.email}</td>
                        <td>{user.fullName}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.status}</td>
                        <td>
                            <Link to={`/chi-tiet-nguoi-dung/${user.userId}`}>Click</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default memo(ListUser);
