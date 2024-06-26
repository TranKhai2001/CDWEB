package com.example.bankend.service.implement;

import com.example.bankend.dto.CategoryDTO;
import com.example.bankend.entity.Category;
import com.example.bankend.entity.CategoryStatus;
import com.example.bankend.repository.CategoryRepository;
import com.example.bankend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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

    @Override
    public Optional<CategoryDTO> getCategoryById(Long id) {
        return categoryRepository.findById(id).map(this::convertToDTO);
    }

    @Override
    public Optional<CategoryDTO> updateCategory(Long id, CategoryDTO categoryDTO) {
        Optional<Category> existingCategoryOptional = categoryRepository.findById(id);

        if (existingCategoryOptional.isPresent()) {
            Category existingCategory = existingCategoryOptional.get();

            // Kiểm tra nếu tên danh mục đã tồn tại và không phải là danh mục hiện tại
            Category categoryWithSameName = categoryRepository.findByName(categoryDTO.getName());
            if (categoryWithSameName != null && !categoryWithSameName.getCategoryId().equals(id)) {
                // Báo lỗi nếu tên danh mục đã tồn tại
                throw new RuntimeException("Category with name " + categoryDTO.getName() + " already exists.");
            }

            existingCategory.setName(categoryDTO.getName());
            existingCategory.setStatus(CategoryStatus.valueOf(categoryDTO.getStatus()));
            Category updatedCategory = categoryRepository.save(existingCategory);
            return Optional.of(convertToDTO(updatedCategory));
        } else {
            return Optional.empty();
        }
    }

    @Override
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        if (categoryRepository.findByName(categoryDTO.getName()) != null) {
            // Báo lỗi nếu tên danh mục đã tồn tại
            throw new RuntimeException("Category with name " + categoryDTO.getName() + " already exists.");
        }

        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setStatus(CategoryStatus.valueOf(categoryDTO.getStatus()));
        Category savedCategory = categoryRepository.save(category);
        return convertToDTO(savedCategory);
    }

    private CategoryDTO convertToDTO(Category category) {
        return CategoryDTO.builder()
                .categoryId(category.getCategoryId())
                .name(category.getName())
                .status(category.getStatus().name())
                .build();
    }
}