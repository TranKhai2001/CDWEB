// UserDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./style.scss";
const UserDetails = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log('userId:', userId);  // Log userId để kiểm tra giá trị của nó
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8080/users/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    console.error('Failed to fetch user details');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUser();
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-details-container ">
            <h2>Chi tiết người dùng</h2>
            <div className="user-details">
                <div>
                    <p>
                        <strong>Username:</strong> {user.username}
                    </p>
                    <p>
                        <strong>Full Name:</strong> {user.fullName}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Phone Number:</strong> {user.phoneNumber}
                    </p>
                    <p>
                        <strong>Date of Birth:</strong> {user.dateOfBirth}
                    </p>
                    <p>
                        <strong>Gender:</strong> {user.gender}
                    </p>
                    <p>
                        <strong>Status:</strong> {user.status}
                    </p>
                    <div className="user-details-actions">
                        <button>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
