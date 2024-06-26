package com.example.bankend.service.implement;

import com.example.bankend.dto.*;
import com.example.bankend.entity.*;
import com.example.bankend.repository.ProductRepository;
import com.example.bankend.repository.UserRepository;
import com.example.bankend.service.UserService;
import com.example.bankend.util.ValidationUtil;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

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
        if (!ValidationUtil.isValidFullName(registerDto.getFullName())) {
            throw new IllegalArgumentException("Invalid full name");
        }
        if (!ValidationUtil.isValidPhone(registerDto.getPhoneNumber())) {
            throw new IllegalArgumentException("Invalid phone number");
        }
        if (!ValidationUtil.isValidUsername(registerDto.getUsername())) {
            throw new IllegalArgumentException("Invalid username");
        }
        if (!ValidationUtil.isValidPassword(registerDto.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }

        if (userRepository.findByUsername(registerDto.getUsername()) != null) {
            return false;
        }
        if (userRepository.findByEmail(registerDto.getEmail()) != null) {
            return false; // Email đã tồn tại
        }
        if (userRepository.findByPhoneNumber(registerDto.getPhoneNumber()) != null) {
            return false; // Số điện thoại đã tồn tại
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

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll().stream()
                .filter(user -> !user.getUsername().equals("haidang2"))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.findByUsername(username) != null;
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email) != null;
    }

    @Override
    public boolean existsByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber) != null;
    }

    @Override
    @Transactional
    public boolean updateProfile(Long userId, UpdateProfileDto updateProfileDto) {
        if (!ValidationUtil.isValidFullName(updateProfileDto.getFullName())) {
            throw new IllegalArgumentException("Invalid full name");
        }
        if (!ValidationUtil.isValidPhone(updateProfileDto.getPhoneNumber())) {
            throw new IllegalArgumentException("Invalid phone number");
        }

        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Kiểm tra số điện thoại có bị trùng không
            if (!user.getPhoneNumber().equals(updateProfileDto.getPhoneNumber()) && userRepository.findByPhoneNumber(updateProfileDto.getPhoneNumber()) != null) {
                return false;
            }

            user.setFullName(updateProfileDto.getFullName());
            user.setPhoneNumber(updateProfileDto.getPhoneNumber());
            user.setGender(Gender.valueOf(updateProfileDto.getGender()));
            user.setDateOfBirth(updateProfileDto.getDateOfBirth());

            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public boolean changePassword(Long userId, ChangePasswordDto changePasswordDto) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(changePasswordDto.getCurrentPassword(), user.getPassword())) {
                if (!ValidationUtil.isValidPassword(changePasswordDto.getNewPassword())) {
                    throw new IllegalArgumentException("Invalid password");
                }
                user.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
                userRepository.save(user);
                return true;
            }
        }
        return false;
    }

    @Override
    @Transactional
    public boolean adminUpdateUser(Long userId, AdminUpdateDto adminUpdateDto) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setStatus(UserStatus.valueOf(adminUpdateDto.getStatus()));
            user.setRole(UserRole.valueOf(adminUpdateDto.getRole()));
            userRepository.save(user);
            return true;
        }
        return false;
    }
}