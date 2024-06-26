package com.example.bankend.service;

import com.example.bankend.dto.CategoryDTO;
import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<CategoryDTO> getAllCategories();


    List<CategoryDTO> getActiveCategories();

    Optional<CategoryDTO> getCategoryById(Long id);

    Optional<CategoryDTO> updateCategory(Long id, CategoryDTO categoryDTO);

    CategoryDTO createCategory(CategoryDTO categoryDTO);

}
