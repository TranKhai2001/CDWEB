package com.example.bankend.service.implement;

import com.example.bankend.dto.ProductDTO;
import com.example.bankend.entity.Product;
import com.example.bankend.repository.ProductRepository;
import com.example.bankend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO getProductById(Long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        return optionalProduct.map(this::convertToDto).orElse(null);
    }


    private ProductDTO convertToDto(Product product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setProductId(product.getProductId());
        productDTO.setName(product.getName());
        productDTO.setDescription(product.getDescription());
        productDTO.setPrice(product.getPrice());
        productDTO.setQuantityAvailable(product.getQuantityAvailable());
        productDTO.setCategoryName(product.getCategory().getName());
        productDTO.setImageUrl(product.getImageUrl());
        productDTO.setWeight(product.getWeight());
        productDTO.setUnit(product.getUnit());
        productDTO.setCreatedAt(product.getCreatedAt());
        productDTO.setStatus(product.getStatus());
        return productDTO;
    }
}
