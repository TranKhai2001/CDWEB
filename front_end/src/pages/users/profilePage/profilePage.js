import React, { useState, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        email: "",
        fullName: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');
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
        if (currentUser) {
            fetch("http://localhost:8080/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else if (response.status === 401) {
                        setError('Unauthorized');
                        navigate('/dang-nhap');
                        throw new Error("Unauthorized");
                    }
                })
                .then(data => {
                    setProfile({
                        email: data.email,
                        fullName: data.fullName,
                        phoneNumber: data.phoneNumber,
                        gender: data.gender,
                        dateOfBirth: data.dateOfBirth.split("T")[0]
                    });
                })
                .catch(error => {
                    console.error("Error fetching profile:", error);
                });
        }
    }, [currentUser, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = () => {
        fetch("http://localhost:8080/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(profile)
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 400) {
                    return response.json().then(data => {
                        if (data.phoneNumber) {
                            throw new Error(data.phoneNumber);
                        } else {
                            throw new Error("Failed to update profile");
                        }
                    });
                } else {
                    throw new Error("Phone number already exists");
                }
            })
            .then(updatedProfile => {
                setProfile({
                    email: updatedProfile.email,
                    fullName: updatedProfile.fullName,
                    phoneNumber: updatedProfile.phoneNumber,
                    gender: updatedProfile.gender,
                    dateOfBirth: updatedProfile.dateOfBirth.split("T")[0]
                });
                setIsEditing(false);
                setErrors({});
                alert("Thông tin cá nhân đã được cập nhật thành công");
            })
            .catch(error => {
                console.error("Error updating profile:", error);
                if (error.message.includes("already used")) {
                    setErrors({ phoneNumber: error.message });
                } else {
                    setErrors({ general: error.message });
                }
            });
    };

    const handleCancel = () => {
        setIsEditing(false);
        fetch("http://localhost:8080/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 401) {
                    setError('Unauthorized');
                    navigate('/dang-nhap');
                    throw new Error("Unauthorized");
                }
            })
            .then(data => {
                setProfile({
                    email: data.email,
                    fullName: data.fullName,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    dateOfBirth: data.dateOfBirth.split("T")[0]
                });
            })
            .catch(error => {
                console.error("Error fetching profile:", error);
            });
    };

    return (
        <div className="profilepage-container">
            <div className="profilepage-form">
                <h2>Thông Tin Cá Nhân</h2>

                {errors.general && <p className="error-message">{errors.general}</p>}

                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required value={profile.email} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullname">Họ và tên:</label>
                        <input type="text" id="fullname" name="fullName" required value={profile.fullName} onChange={handleChange} readOnly={!isEditing} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại:</label>
                        <input type="tel" id="phone" name="phoneNumber" required value={profile.phoneNumber} onChange={handleChange} readOnly={!isEditing} />
                        {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Giới tính:</label>
                        <select id="gender" name="gender" value={profile.gender} onChange={handleChange} disabled={!isEditing}>
                            <option value="MALE">Nam</option>
                            <option value="FEMALE">Nữ</option>
                            <option value="OTHER">Khác</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Ngày sinh:</label>
                        <input type="date" id="dob" name="dateOfBirth" required value={profile.dateOfBirth} onChange={handleChange} readOnly={!isEditing} />
                    </div>
                    {isEditing ? (
                        <>
                            <button type="button" className="button-submit" onClick={handleSave}>Lưu</button>
                            <button type="button" className="button-submit" onClick={handleCancel}>Trở về</button>
                        </>
                    ) : (
                        <button type="button" className="button-submit" onClick={() => setIsEditing(true)}>Cập nhật</button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default memo(ProfilePage);