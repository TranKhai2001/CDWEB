package com.example.bankend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDetailDTO {
    private Long productId;
    private String productName;
    private String imageUrl;
    private int quantity;
    private BigDecimal price;
}