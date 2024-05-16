package com.example.bankend.service.implement;

import com.example.bankend.dto.LoginDto;
import com.example.bankend.entity.User;
import com.example.bankend.repository.UserRepository;
import com.example.bankend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User login(LoginDto loginDto) {
        User user = userRepository.findByUsername(loginDto.getUsername());
        if (user != null && user.getPassword().equals(loginDto.getPassword())) {
            return user;
        }
        return null;
    }
}