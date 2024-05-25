package com.example.bankend.controller;

import com.example.bankend.dto.CartItemDTO;
import com.example.bankend.entity.CartItem;
import com.example.bankend.entity.User;
import com.example.bankend.service.CartService;
import com.example.bankend.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public ResponseEntity<String> addCartItem(@RequestBody CartItemDTO cartItemDTO, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            cartService.addCartItem(user, cartItemDTO);
            return new ResponseEntity<>("Product added to cart", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not logged in", HttpStatus.UNAUTHORIZED);
        }
    }
}