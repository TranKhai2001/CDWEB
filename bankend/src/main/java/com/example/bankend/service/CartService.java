package com.example.bankend.service;

import com.example.bankend.dto.CartItemDTO;
import com.example.bankend.entity.Cart;
import com.example.bankend.entity.CartItem;
import com.example.bankend.entity.User;

public interface CartService {
    CartItem addCartItem(User user, CartItemDTO cartItemDTO);
}