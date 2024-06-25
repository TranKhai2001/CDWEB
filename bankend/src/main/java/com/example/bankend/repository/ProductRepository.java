package com.example.bankend.repository;

import com.example.bankend.entity.CategoryStatus;
import com.example.bankend.entity.Product;
import com.example.bankend.entity.ProductStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE p.status = :productStatus AND p.category.status = :categoryStatus")
    List<Product> findAllByProductStatusAndCategoryStatus(@Param("productStatus") ProductStatus productStatus, @Param("categoryStatus") CategoryStatus categoryStatus);

    Optional<Product> findByName(String name);

    @Query("SELECT p FROM Product p WHERE p.productId = :productId AND p.status = :productStatus AND p.category.status = :categoryStatus")
    Optional<Product> findByIdAndProductStatusAndCategoryStatus(@Param("productId") Long productId, @Param("productStatus") ProductStatus productStatus, @Param("categoryStatus") CategoryStatus categoryStatus);
}
