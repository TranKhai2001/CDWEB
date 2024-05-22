package com.example.bankend.repository;


import com.example.bankend.entity.Category;
import com.example.bankend.entity.CategoryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findAllByStatus(CategoryStatus status);

}
