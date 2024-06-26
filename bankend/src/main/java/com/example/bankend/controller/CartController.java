package com.example.bankend.controller;

import com.example.bankend.dto.CartItemDTO;
import com.example.bankend.dto.CartItemDetailDTO;
import com.example.bankend.entity.User;
import com.example.bankend.service.CartService;
import com.example.bankend.service.ProductService;
import com.example.bankend.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @PostMapping("/add")
    public ResponseEntity<String> addCartItem(@RequestBody CartItemDTO cartItemDTO, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            try {
                cartService.addCartItem(user, cartItemDTO);
                return new ResponseEntity<>("Sản phẩm được thêm vào giỏ hàng thành công", HttpStatus.OK);
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("Người dùng chưa đăng nhập", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/total-quantity")
    public ResponseEntity<Integer> getTotalQuantity(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            int totalQuantity = cartService.getTotalQuantity(user);
            return new ResponseEntity<>(totalQuantity, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(0, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/details")
    public ResponseEntity<List<CartItemDetailDTO>> getCartDetails(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            List<CartItemDetailDTO> cartDetails = cartService.getCartDetails(user);
            return new ResponseEntity<>(cartDetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateCartItemQuantity(@RequestBody CartItemDTO cartItemDTO, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            cartService.updateCartItemQuantity(user, cartItemDTO);
            return new ResponseEntity<>("Đã cập nhật mặt hàng trong giỏ hàng", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Người dùng chưa đăng nhập", HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeCartItem(@RequestParam Long productId, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            cartService.removeCartItem(user, productId);
            return new ResponseEntity<>("Sản phẩm đã bị xóa khỏi giỏ hàng", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Người dùng chưa đăng nhập", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/checkout")
    public ResponseEntity<String> checkout(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            List<CartItemDetailDTO> cartDetails = cartService.getCartDetails(user);
            for (CartItemDetailDTO item : cartDetails) {
                if (item.getQuantity() > productService.getProductQuantityAvailable(item.getProductId())) {
                    return new ResponseEntity<>("Số lượng sản phẩm " + item.getProductName() + " còn lại không đủ", HttpStatus.BAD_REQUEST);
                }
            }
            // Process checkout (not implemented in this example)
            return new ResponseEntity<>("Thanh toán thành công", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Người dùng chưa đăng nhập", HttpStatus.UNAUTHORIZED);
        }
    }
}