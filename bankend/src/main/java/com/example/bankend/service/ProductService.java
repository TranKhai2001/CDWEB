package com.example.bankend.service;

import com.example.bankend.dto.ProductDTO;

import java.util.List;

public interface ProductService {
    List<ProductDTO> getAllProducts();
    ProductDTO getProductById(Long productId);
}
