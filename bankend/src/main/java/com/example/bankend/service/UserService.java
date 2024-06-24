package com.example.bankend.service;


import com.example.bankend.dto.*;
import com.example.bankend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User login(LoginDto loginDto);
    boolean register(RegisterDto registerDto);
    List<User> getAllUsers(); // Add this method
    Optional<User> getUserById(Long id); // Thêm phương thức này
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phoneNumber);
    boolean updateProfile(Long userId, UpdateProfileDto updateProfileDto);

    boolean changePassword(Long userId, ChangePasswordDto changePasswordDto);

    public boolean adminUpdateUser(Long userId, AdminUpdateDto adminUpdateDto);
}
