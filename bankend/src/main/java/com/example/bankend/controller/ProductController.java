package com.example.bankend.controller;

import com.example.bankend.dto.ProductDTO;
import com.example.bankend.entity.User;
import com.example.bankend.entity.UserRole;
import com.example.bankend.service.ProductService;
import com.example.bankend.service.ProductAlreadyExistsException;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/admin")
    public ResponseEntity<List<ProductDTO>> getAllProducts(HttpSession session) {
        User currentUser = (User) session.getAttribute("user");
        if (currentUser != null && currentUser.getRole() == UserRole.ADMIN) {
            List<ProductDTO> products = productService.getAllProducts();
            return ResponseEntity.ok(products);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/admin/{productId}")
    public ResponseEntity<ProductDTO> getProductByIdAdmin(@PathVariable Long productId, HttpSession session) {
        User currentUser = (User) session.getAttribute("user");
        if (currentUser != null && currentUser.getRole() == UserRole.ADMIN) {
            ProductDTO product = productService.getProductByIdAdmin(productId);
            if (product != null) {
                return ResponseEntity.ok(product);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getActiveProducts() {
        List<ProductDTO> products = productService.getActiveProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long productId) {
        ProductDTO product = productService.getProductById(productId);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/{productId}/quantity")
    public ResponseEntity<Integer> getProductQuantityAvailable(@PathVariable Long productId) {
        int quantityAvailable = productService.getProductQuantityAvailable(productId);
        return ResponseEntity.ok(quantityAvailable);
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addProduct(@RequestBody ProductDTO productDTO, HttpSession session) {
        User currentUser = (User) session.getAttribute("user");
        if (currentUser != null && currentUser.getRole() == UserRole.ADMIN) {
            try {
                productService.addProduct(productDTO);
                return new ResponseEntity<>(HttpStatus.CREATED);
            } catch (ProductAlreadyExistsException e) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/update/{productId}")
    public ResponseEntity<Void> updateProduct(@PathVariable Long productId, @RequestBody ProductDTO productDTO, HttpSession session) {
        User currentUser = (User) session.getAttribute("user");
        if (currentUser != null && currentUser.getRole() == UserRole.ADMIN) {
            try {
                productService.updateProduct(productId, productDTO);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } catch (RuntimeException e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId, HttpSession session) {
        User currentUser = (User) session.getAttribute("user");
        if (currentUser != null && currentUser.getRole() == UserRole.ADMIN) {
            try {
                productService.deleteProduct(productId);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } catch (RuntimeException e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}