package com.example.bankend.service;

import com.example.bankend.dto.OrderDTO;
import com.example.bankend.entity.Order;
import com.example.bankend.entity.User;

public interface OrderService {
    Order placeOrder(User user, OrderDTO orderDTO);
}