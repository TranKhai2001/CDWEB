package com.example.bankend.dto;

import com.example.bankend.entity.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long productId;
    private String name;
    private String description;
    private int price;
    private int quantityAvailable;
    private int sold;
    private String categoryName;
    private String imageUrl;
    private BigDecimal weight;
    private String unit;
    private Timestamp createdAt;
    private ProductStatus status;
}