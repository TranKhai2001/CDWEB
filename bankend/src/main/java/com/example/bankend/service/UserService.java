package com.example.bankend.service;

import com.example.bankend.dto.LoginDto;
import com.example.bankend.dto.RegisterDto;
import com.example.bankend.entity.User;

import java.util.List;

public interface UserService {
    User login(LoginDto loginDto);
    boolean register(RegisterDto registerDto);
    List<User> getAllUsers(); // Add this method
    void deleteUserById(Long id); // Add this method
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phoneNumber);

}
