package com.example.bankend.service.implement;

import com.example.bankend.dto.CategoryDTO;
import com.example.bankend.entity.Category;

import com.example.bankend.entity.CategoryStatus;

import com.example.bankend.repository.CategoryRepository;
import com.example.bankend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(this::convertToDTO).collect(Collectors.toList());
    }


    @Override
    public List<CategoryDTO> getActiveCategories() {
        List<Category> categories = categoryRepository.findAllByStatus(CategoryStatus.ACTIVE);
        return categories.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private CategoryDTO convertToDTO(Category category) {
        return CategoryDTO.builder()
                .categoryId(category.getCategoryId())
                .name(category.getName())
                .status(category.getStatus().name())
                .build();
    }
}
