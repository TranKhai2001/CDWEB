package com.example.bankend.service;

import com.example.bankend.dto.OrderDTO;
import com.example.bankend.dto.OrderDetailDTO;
import com.example.bankend.dto.OrderHistoryDTO;
import com.example.bankend.dto.OrderrDTO;
import com.example.bankend.entity.Order;
import com.example.bankend.entity.User;

import java.util.List;

public interface OrderService {
    Order placeOrder(User user, OrderDTO orderDTO);
    List<OrderHistoryDTO> getOrderHistory(User user);
    OrderDetailDTO getOrderDetail(Long orderId, User user);
    Order reorder(User user, Long orderId);
    List<OrderrDTO> getAllOrders();
    void updateOrderStatus(Long orderId, String status);
}