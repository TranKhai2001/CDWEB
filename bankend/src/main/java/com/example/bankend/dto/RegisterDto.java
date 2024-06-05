package com.example.bankend.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class RegisterDto {
    private String username;
    private String password;
    private String email;
    private String fullName;
    private String phoneNumber;
    private Timestamp dateOfBirth;
    private String gender;
}