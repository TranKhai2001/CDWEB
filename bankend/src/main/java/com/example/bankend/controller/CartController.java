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

import java.util.List;

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

    @GetMapping("/total-quantity")
    public ResponseEntity<Integer> getTotalQuantity(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            int totalQuantity = cartService.getTotalQuantity(user);
            return new ResponseEntity<>(totalQuantity, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(0, HttpStatus.UNAUTHORIZED);
        }
    }
}