package com.example.bankend.controller;

import com.example.bankend.dto.OrderDTO;
import com.example.bankend.entity.Order;
import com.example.bankend.entity.User;
import com.example.bankend.service.OrderService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(@RequestBody OrderDTO orderDTO, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            Order order = orderService.placeOrder(user, orderDTO);
            return new ResponseEntity<>(order, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}