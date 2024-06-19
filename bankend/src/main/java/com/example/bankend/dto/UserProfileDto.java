package com.example.bankend.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class UserProfileDto {
    private String email;
    private String fullName;
    private String phoneNumber;
    private String gender;
    private Timestamp dateOfBirth;
}