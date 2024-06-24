package com.example.bankend.service;

import com.example.bankend.dto.ProductDTO;

import java.util.List;

public interface ProductService {
    List<ProductDTO> getAllProducts();
    ProductDTO getProductById(Long productId);
    List<ProductDTO> getActiveProducts();
    int getProductQuantityAvailable(Long productId);
    void addProduct(ProductDTO productDTO) throws ProductAlreadyExistsException;
    void updateProduct(Long productId, ProductDTO productDTO);

    void deleteProduct(Long productId);
}
