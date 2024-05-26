package com.example.bankend.repository;

import com.example.bankend.entity.Cart;
import com.example.bankend.entity.CartItem;
import com.example.bankend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
}