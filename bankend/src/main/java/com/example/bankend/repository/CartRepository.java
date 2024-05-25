package com.example.bankend.repository;

import com.example.bankend.entity.Cart;
import com.example.bankend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserAndStatus(User user, Cart.CartStatus status);
}