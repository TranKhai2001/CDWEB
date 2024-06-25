import React, {memo, useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./style.scss";

const UserDetails = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        registrationDate:'',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        status: '',
        role: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch('http://localhost:8080/check-login', {
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setCurrentUser(data);
                } else {
                    console.error('Failed to fetch current user');
                    setError('Bạn không có quyền truy cập');
                    navigate('/dang-nhap');
                }
            } catch (error) {
                console.error('Error fetching current user:', error);
                navigate('/dang-nhap');
            }
        };

        fetchCurrentUser();
    }, [navigate]);

    useEffect(() => {
        if (currentUser && currentUser.role !== 'ADMIN') {
            setError('Bạn không có quyền truy cập');
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8080/users/${userId}`, {
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    data.dateOfBirth = data.dateOfBirth.split("T")[0];
                    data.registrationDate = data.registrationDate.split("T")[0];
                    setUser(data);
                    setFormData({
                        username: data.username,
                        fullName: data.fullName,
                        registrationDate:data.registrationDate,
                        email: data.email,
                        phoneNumber: data.phoneNumber,
                        dateOfBirth: data.dateOfBirth,
                        gender: data.gender,
                        status: data.status,
                        role: data.role
                    });
                } else {
                    console.error('Failed to fetch user details');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        if (currentUser && currentUser.role === 'ADMIN') {
            fetchUser();
        }
    }, [userId, currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = async () => {
        const { status, role } = formData;
        const adminUpdateData = { status, role };

        try {
            const response = await fetch(`http://localhost:8080/users/${userId}/admin-update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(adminUpdateData),
                credentials: 'include'
            });

            if (response.ok) {
                setUser(prevUser => ({
                    ...prevUser,
                    status,
                    role
                }));
                setIsEditing(false);
            } else {
                console.error('Failed to update user details');
            }
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    };

    const handleCancel = () => {
        setFormData({
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
            status: user.status,
            role: user.role
        });
        setIsEditing(false);
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profilepage-container">
            <div className="profilepage-form">
                <h2>Chi tiết người dùng</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Tài Khoản:</label>
                        <input type="text" id="username" name="username" value={formData.username} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="registrationDate">Ngày đăng kí:</label>
                        <input type="date" id="registrationDate" name="registrationDate" value={formData.registrationDate} onChange={handleChange} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullName">Họ tên:</label>
                        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Số điện thoại:</label>
                        <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Ngày sinh:</label>
                        <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Giới tính:</label>
                        <select id="gender" name="gender" value={formData.gender} onChange={handleChange} disabled>
                            <option value="MALE">Nam</option>
                            <option value="FEMALE">Nữ</option>
                            <option value="OTHER">Khác</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Trạng thái tài khoản:</label>
                        <select id="status" name="status" value={formData.status} onChange={handleChange} disabled={!isEditing}>
                            <option value="ACTIVE">Hoạt động</option>
                            <option value="INACTIVE">Khóa</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Vai trò:</label>
                        <select id="role" name="role" value={formData.role} onChange={handleChange} disabled={!isEditing}>
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <div className="user-details-actions">
                        {isEditing ? (
                            <>
                                <button type="button" className="button-submit" onClick={handleSave}>Lưu</button>
                                <button type="button" className="button-submit" onClick={handleCancel}>Trở về</button>
                            </>
                        ) : (
                            <button type="button" className="button-submit" onClick={() => setIsEditing(true)}>Cập nhật</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default memo(UserDetails);