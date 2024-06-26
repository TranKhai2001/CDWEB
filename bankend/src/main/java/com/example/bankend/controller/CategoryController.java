package com.example.bankend.controller;

import com.example.bankend.dto.CategoryDTO;
import com.example.bankend.entity.User;
import com.example.bankend.entity.UserRole;
import com.example.bankend.service.CategoryService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // Kiểm tra quyền ADMIN khi hiển thị tất cả danh mục sản phẩm
    @GetMapping("/admin")
    public ResponseEntity<List<CategoryDTO>> getAllCategories(HttpSession session) {
        User currentUser = (User) session.getAttribute("user");
        if (currentUser != null && currentUser.getRole() == UserRole.ADMIN) {
            List<CategoryDTO> categories = categoryService.getAllCategories();
            return ResponseEntity.ok(categories);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getActiveCategories() {
        List<CategoryDTO> categories = categoryService.getActiveCategories();
        return ResponseEntity.ok(categories);
    }

    // Thêm phương thức xem chi tiết danh mục sản phẩm cho ADMIN
    @GetMapping("/admin/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Long id, HttpSession session) {
        User currentUser = (User) session.getAttribute("user");
        if (currentUser != null && currentUser.getRole() == UserRole.ADMIN) {
            Optional<CategoryDTO> category = categoryService.getCategoryById(id);
            return category.map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable Long id, @RequestBody CategoryDTO categoryDTO, HttpSession session) {
        User currentUser = (User) session.getAttribute("user");
        if (currentUser != null && currentUser.getRole() == UserRole.ADMIN) {
            Optional<CategoryDTO> updatedCategory = categoryService.updateCategory(id, categoryDTO);
            return updatedCategory.map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/admin")
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO categoryDTO, HttpSession session) {
        User currentUser = (User) session.getAttribute("user");
        if (currentUser != null && currentUser.getRole() == UserRole.ADMIN) {
            CategoryDTO createdCategory = categoryService.createCategory(categoryDTO);
            return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}