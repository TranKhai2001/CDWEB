package com.example.bankend.service;

import com.example.bankend.dto.CategoryDTO;
import java.util.List;

public interface CategoryService {
    List<CategoryDTO> getAllCategories();
}
