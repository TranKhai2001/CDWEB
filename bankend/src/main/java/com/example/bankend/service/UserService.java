package com.example.bankend.service;

import com.example.bankend.dto.LoginDto;
import com.example.bankend.dto.RegisterDto;
import com.example.bankend.entity.User;

public interface UserService {
    User login(LoginDto loginDto);
    boolean register(RegisterDto registerDto);

}
