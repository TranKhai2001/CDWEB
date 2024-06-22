package com.example.bankend.service;


import com.example.bankend.dto.ChangePasswordDto;
import com.example.bankend.dto.LoginDto;
import com.example.bankend.dto.RegisterDto;
import com.example.bankend.dto.UpdateProfileDto;
import com.example.bankend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User login(LoginDto loginDto);
    boolean register(RegisterDto registerDto);
    List<User> getAllUsers(); // Add this method
    void toggleUserStatusById(Long id); // Add this method
    Optional<User> getUserById(Long id); // Thêm phương thức này
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phoneNumber);
    boolean updateProfile(Long userId, UpdateProfileDto updateProfileDto);

    boolean changePassword(Long userId, ChangePasswordDto changePasswordDto);
}
