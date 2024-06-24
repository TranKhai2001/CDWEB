import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-tabs/style/react-tabs.css';
import "./style.scss";

const ListUser = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8080/users', {
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else if (response.status === 401) {
                    navigate('/'); // Redirect to login page if unauthorized
                } else {
                    console.error('Failed to fetch users');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [navigate]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDetailClick = (userId) => {
        navigate(`/chi-tiet-nguoi-dung/${userId}`);
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container">
            <div className="section-title">
                <h2>Danh sách người dùng</h2>
            </div>
            <table className="list-user">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên tài khoản</th>
                    <th>Tên người dùng</th>
                    <th>Ngày đăng ký</th>
                    <th>Email</th>
                    <th>Trạng thái</th>
                    <th>Role</th>
                    <th>Chi tiết</th>
                </tr>
                </thead>
                <tbody>
                {currentUsers.map(user => (
                    <tr key={user.userId}>
                        <td>{user.userId}</td>
                        <td>{user.username}</td>
                        <td>{user.fullName}</td>
                        <td>{new Date(user.registrationDate).toLocaleDateString()}</td>
                        <td>{user.email}</td>
                        <td>{user.status}</td>
                        <td>{user.role}</td>
                        <td>
                            <button className="action-button" onClick={() => handleDetailClick(user.userId)}>
                                Chi tiết
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`page-number ${currentPage === number ? 'active' : ''}`}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default memo(ListUser);