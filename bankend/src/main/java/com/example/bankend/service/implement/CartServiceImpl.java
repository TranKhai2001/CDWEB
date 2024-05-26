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
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
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

            // Sử dụng phương thức mới từ CartItemRepository để kiểm tra sản phẩm trong giỏ hàng
            Optional<CartItem> existingCartItemOpt = cartItemRepository.findByCartAndProduct(cart, product);

            if (existingCartItemOpt.isPresent()) {
                // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên 1
                CartItem existingCartItem = existingCartItemOpt.get();
                existingCartItem.setQuantity(existingCartItem.getQuantity() + 1);
                return cartItemRepository.save(existingCartItem);
            } else {
                // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
                CartItem cartItem = new CartItem();
                cartItem.setCart(cart);
                cartItem.setProduct(product);
                cartItem.setQuantity(cartItemDTO.getQuantity());
                cartItem.setPrice(BigDecimal.valueOf(cartItemDTO.getPrice()));
                return cartItemRepository.save(cartItem);
            }
        } else {
            throw new IllegalArgumentException("Product not found");
        }
    }

    @Override
    public int getTotalQuantity(User user) {
        Optional<Cart> optionalCart = cartRepository.findByUserAndStatus(user, Cart.CartStatus.ACTIVE);
        if (optionalCart.isPresent()) {
            Cart cart = optionalCart.get();
            return cart.getItems().stream().mapToInt(CartItem::getQuantity).sum();
        }
        return 0;
    }

}