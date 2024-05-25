package com.example.bankend.dto;

import lombok.Data;

@Data
public class LoginDto {
    private int id;
    private String username;
    private String password;
}
