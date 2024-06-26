package com.example.bankend.controller;

import com.example.bankend.dto.*;
import com.example.bankend.entity.Order;
import com.example.bankend.entity.User;
import com.example.bankend.entity.UserRole;
import com.example.bankend.service.OrderService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestBody OrderDTO orderDTO, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            try {
                Order order = orderService.placeOrder(user, orderDTO);
                return new ResponseEntity<>(order, HttpStatus.CREATED);
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<OrderHistoryDTO>> getOrderHistory(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            List<OrderHistoryDTO> orderHistory = orderService.getOrderHistory(user);
            return new ResponseEntity<>(orderHistory, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/history/{orderId}")
    public ResponseEntity<OrderDetailDTO> getOrderDetail(@PathVariable Long orderId, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            OrderDetailDTO orderDetail = orderService.getOrderDetail(orderId, user);
            return new ResponseEntity<>(orderDetail, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/reorder/{orderId}")
    public ResponseEntity<?> reorder(@PathVariable Long orderId, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            try {
                Order newOrder = orderService.reorder(user, orderId);
                return new ResponseEntity<>(newOrder, HttpStatus.CREATED);
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    @GetMapping("/orders")
    public ResponseEntity<List<OrderrDTO>> getAllOrders(HttpSession session) {
        User currentUser = (User) session.getAttribute("user");
        if (currentUser != null && currentUser.getRole() == UserRole.ADMIN) {
            List<OrderrDTO> orders = orderService.getAllOrders();
            return ResponseEntity.ok(orders);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/admin/detail/{orderId}")
    public ResponseEntity<OrderDetailDTO> getOrderDetailForAdmin(@PathVariable Long orderId, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null && user.getRole() == UserRole.ADMIN) {
            OrderDetailDTO orderDetail = orderService.getOrderDetailForAdmin(orderId);
            return new ResponseEntity<>(orderDetail, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/update-status/{orderId}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, @RequestBody OrderStatusUpdateDTO statusUpdateDTO, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            try {
                orderService.updateOrderStatus(orderId, statusUpdateDTO.getStatus());
                return new ResponseEntity<>(HttpStatus.OK);
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}