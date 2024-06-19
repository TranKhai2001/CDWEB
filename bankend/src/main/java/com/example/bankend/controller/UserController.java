package com.example.bankend.controller;

import com.example.bankend.dto.LoginDto;
import com.example.bankend.dto.RegisterDto;
import com.example.bankend.dto.UpdateProfileDto;
import com.example.bankend.dto.UserProfileDto;
import com.example.bankend.entity.User;
import com.example.bankend.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto, HttpSession session) {
        User user = userService.login(loginDto);
        if (user != null) {
            session.setAttribute("user", user);
            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid username or password or account is not active", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/check-login")
    public ResponseEntity<User> checkLogin(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.removeAttribute("user");
        return new ResponseEntity<>("Logout successful", HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterDto registerDto) {
        Map<String, String> errors = new HashMap<>();

        if (userService.existsByUsername(registerDto.getUsername())) {
            errors.put("username", "Tên tài khoản đã tồn tại.");
        }
        if (userService.existsByEmail(registerDto.getEmail())) {
            errors.put("email", "Email đã tồn tại.");
        }
        if (userService.existsByPhoneNumber(registerDto.getPhoneNumber())) {
            errors.put("phone", "Số điện thoại đã tồn tại.");
        }

        if (!errors.isEmpty()) {
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        boolean isRegistered = userService.register(registerDto);
        if (isRegistered) {
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            errors.put("general", "Đăng ký không thành công, vui lòng thử lại.");
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    // Thêm phương thức này
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @PutMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDto> getProfile(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            UserProfileDto userProfileDto = new UserProfileDto();
            userProfileDto.setEmail(user.getEmail());
            userProfileDto.setFullName(user.getFullName());
            userProfileDto.setPhoneNumber(user.getPhoneNumber());
            userProfileDto.setGender(user.getGender().name());
            userProfileDto.setDateOfBirth(user.getDateOfBirth());

            return new ResponseEntity<>(userProfileDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody UpdateProfileDto updateProfileDto, HttpSession session) {
        User currentUser = (User) session.getAttribute("user");
        if (currentUser != null) {
            boolean isUpdated = userService.updateProfile(currentUser.getUserId(), updateProfileDto);
            if (isUpdated) {
                currentUser = userService.getUserById(currentUser.getUserId()).orElse(null);
                if (currentUser != null) {
                    session.setAttribute("user", currentUser);
                    UserProfileDto updatedProfileDto = new UserProfileDto();
                    updatedProfileDto.setEmail(currentUser.getEmail());
                    updatedProfileDto.setFullName(currentUser.getFullName());
                    updatedProfileDto.setPhoneNumber(currentUser.getPhoneNumber());
                    updatedProfileDto.setGender(currentUser.getGender().name());
                    updatedProfileDto.setDateOfBirth(currentUser.getDateOfBirth());
                    return new ResponseEntity<>(updatedProfileDto, HttpStatus.OK);
                }
            }
            return new ResponseEntity<>("Phone number already exists", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

}