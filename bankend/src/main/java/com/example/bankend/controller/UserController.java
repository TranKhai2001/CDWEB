package com.example.bankend.controller;

import com.example.bankend.dto.LoginDto;
import com.example.bankend.entity.User;
import com.example.bankend.service.UserService;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/logout") // Thêm mapping cho logout
    public ResponseEntity<String> logout(HttpSession session) {
        session.removeAttribute("user"); // Xóa thông tin người dùng khỏi session khi logout
        return new ResponseEntity<>("Logout successful", HttpStatus.OK);
    }

}
