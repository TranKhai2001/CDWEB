package com.example.bankend.repository;

import com.example.bankend.entity.Order;
import com.example.bankend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}