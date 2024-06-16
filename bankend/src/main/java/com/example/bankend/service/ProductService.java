package com.example.bankend.service;

import com.example.bankend.dto.ProductDTO;

import java.util.List;

public interface ProductService {
    List<ProductDTO> getAllProducts();
    ProductDTO getProductById(Long productId);
    List<ProductDTO> getActiveProducts();
    void deleteProduct(Long productId); // New method to delete a product

}
