package com.example.bankend.service;

import com.example.bankend.dto.OrderDTO;
import com.example.bankend.dto.OrderHistoryDTO;
import com.example.bankend.entity.Order;
import com.example.bankend.entity.User;

import java.util.List;

public interface OrderService {
    Order placeOrder(User user, OrderDTO orderDTO);
    List<OrderHistoryDTO> getOrderHistory(User user);
}