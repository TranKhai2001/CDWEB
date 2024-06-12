import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import "./style.scss";

const UserDetails = () => {
    return (
        <div className="user-details-container">
            <h2>Chi tiết người dùng</h2>
            <div className="user-details">
                <div>
                    <p>
                        <strong>Username:</strong>
                    </p>
                    <p>
                        <strong>Full Name:</strong>
                    </p>
                    <p>
                        <strong>Email:</strong>
                    </p>
                    <p>
                        <strong>Phone Number:</strong>
                    </p>
                    <p>
                        <strong>Date of Birth:</strong>
                    </p>
                    <p>
                        <strong>Gender:</strong>
                    </p>
                    <p>
                        <strong>Status:</strong>
                    </p>
                </div>
                <div className="user-details-actions">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
