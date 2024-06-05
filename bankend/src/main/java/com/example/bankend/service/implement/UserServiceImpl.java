package com.example.bankend.service.implement;

import com.example.bankend.dto.LoginDto;
import com.example.bankend.dto.RegisterDto;
import com.example.bankend.entity.Gender;
import com.example.bankend.entity.User;
import com.example.bankend.entity.UserRole;
import com.example.bankend.entity.UserStatus;
import com.example.bankend.repository.UserRepository;
import com.example.bankend.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HttpSession session;

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public User login(LoginDto loginDto) {
        User user = userRepository.findByUsername(loginDto.getUsername());
        if (user != null && passwordEncoder.matches(loginDto.getPassword(), user.getPassword()) && user.getStatus() == UserStatus.ACTIVE) {
            session.setAttribute("user", user);
            return user;
        }
        return null;
    }

    @Override
    public boolean register(RegisterDto registerDto) {
        if (userRepository.findByUsername(registerDto.getUsername()) != null) {
            return false;
        }

        String encodedPassword = passwordEncoder.encode(registerDto.getPassword());

        User newUser = User.builder()
                .username(registerDto.getUsername())
                .password(encodedPassword)
                .email(registerDto.getEmail())
                .fullName(registerDto.getFullName())
                .phoneNumber(registerDto.getPhoneNumber())
                .dateOfBirth(registerDto.getDateOfBirth())
                .gender(Gender.valueOf(registerDto.getGender()))
                .status(UserStatus.ACTIVE)
                .role(UserRole.USER)
                .build();

        userRepository.save(newUser);
        return true;
    }

}