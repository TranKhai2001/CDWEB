package com.example.bankend.service.implement;

import com.example.bankend.dto.CartItemDTO;
import com.example.bankend.entity.Cart;
import com.example.bankend.entity.CartItem;
import com.example.bankend.entity.Product;
import com.example.bankend.entity.User;
import com.example.bankend.repository.CartItemRepository;
import com.example.bankend.repository.CartRepository;
import com.example.bankend.repository.ProductRepository;
import com.example.bankend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public CartItem addCartItem(User user, CartItemDTO cartItemDTO) {
        Optional<Cart> optionalCart = cartRepository.findByUserAndStatus(user, Cart.CartStatus.ACTIVE);
        Cart cart;
        if (optionalCart.isPresent()) {
            cart = optionalCart.get();
        } else {
            cart = new Cart();
            cart.setUser(user);
            cart.setStatus(Cart.CartStatus.ACTIVE);
            cart = cartRepository.save(cart);
        }

        Optional<Product> optionalProduct = productRepository.findById(cartItemDTO.getProductId());
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(cartItemDTO.getQuantity());
            cartItem.setPrice(BigDecimal.valueOf(cartItemDTO.getPrice()));
            return cartItemRepository.save(cartItem);
        } else {
            throw new IllegalArgumentException("Product not found");
        }
    }
}