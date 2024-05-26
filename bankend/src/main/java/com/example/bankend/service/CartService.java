package com.example.bankend.service;

import com.example.bankend.dto.CartItemDTO;
import com.example.bankend.dto.CartItemDetailDTO;
import com.example.bankend.entity.Cart;
import com.example.bankend.entity.CartItem;
import com.example.bankend.entity.User;

import java.util.List;

public interface CartService {
    CartItem addCartItem(User user, CartItemDTO cartItemDTO);
    int getTotalQuantity(User user);
    List<CartItemDetailDTO> getCartDetails(User user);
    void updateCartItemQuantity(User user, CartItemDTO cartItemDTO);
    void removeCartItem(User user, Long productId);
}