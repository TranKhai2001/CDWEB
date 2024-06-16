package com.example.bankend.service;

import com.example.bankend.dto.LoginDto;
import com.example.bankend.dto.RegisterDto;
import com.example.bankend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User login(LoginDto loginDto);
    boolean register(RegisterDto registerDto);
    List<User> getAllUsers(); // Add this method
    void deleteUserById(Long id); // Add this method
    Optional<User> getUserById(Long id); // Thêm phương thức này

}
