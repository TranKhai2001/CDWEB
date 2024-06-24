package com.example.bankend.service.implement;

import com.example.bankend.dto.ProductDTO;
import com.example.bankend.entity.Category;
import com.example.bankend.entity.CategoryStatus;
import com.example.bankend.entity.Product;
import com.example.bankend.entity.ProductStatus;
import com.example.bankend.repository.CategoryRepository;
import com.example.bankend.repository.ProductRepository;
import com.example.bankend.service.ProductService;
import com.example.bankend.service.ProductAlreadyExistsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private static final Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);
    private final CategoryRepository categoryRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        logger.info("Fetching all products");
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> getActiveProducts() {
        logger.info("Fetching active products");
        List<Product> products = productRepository.findAllByProductStatusAndCategoryStatus(ProductStatus.ACTIVE, CategoryStatus.ACTIVE);
        return products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO getProductById(Long productId) {
        logger.info("Fetching product with ID: {}", productId);
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            return convertToDto(optionalProduct.get());
        } else {
            logger.warn("Product with ID: {} not found", productId);
            return null;
        }
    }

    @Override
    public int getProductQuantityAvailable(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        return product.map(Product::getQuantityAvailable).orElse(0);
    }

    @Override
    public void addProduct(ProductDTO productDTO) {
        if (productRepository.findByName(productDTO.getName()).isPresent()) {
            throw new ProductAlreadyExistsException("Product with name " + productDTO.getName() + " already exists");
        }

        try {
            Product product = new Product();

            // Map DTO fields to Entity
            product.setName(productDTO.getName());
            product.setDescription(productDTO.getDescription());
            product.setPrice(productDTO.getPrice());
            product.setQuantityAvailable(productDTO.getQuantityAvailable());
            product.setSold(0); // Assuming new product starts with 0 sold
            Category category = categoryRepository.findByName(productDTO.getCategoryName());
            if (category != null) {
                product.setCategory(category);
            } else {
                throw new RuntimeException("Category not found");
            }
            product.setImageUrl(productDTO.getImageUrl());
            product.setWeight(productDTO.getWeight());
            product.setUnit(productDTO.getUnit());
            product.setStatus(productDTO.getStatus());
            product.setCreatedAt(new Timestamp(System.currentTimeMillis()));

            // Save product to database
            productRepository.save(product);
        } catch (Exception e) {
            logger.error("Error adding product", e);
            throw new RuntimeException("Error adding product: " + e.getMessage());
        }
    }

    @Override
    public void updateProduct(Long productId, ProductDTO productDTO) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setName(productDTO.getName());
            product.setDescription(productDTO.getDescription());
            product.setPrice(productDTO.getPrice());
            product.setQuantityAvailable(productDTO.getQuantityAvailable());
            product.setImageUrl(productDTO.getImageUrl());
            product.setWeight(productDTO.getWeight());
            product.setUnit(productDTO.getUnit());
            product.setStatus(productDTO.getStatus());
            productRepository.save(product);
        } else {
            throw new RuntimeException("Product not found");
        }
    }

    @Override
    public void deleteProduct(Long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            productRepository.delete(optionalProduct.get());
        } else {
            throw new RuntimeException("Product not found");
        }
    }

    private ProductDTO convertToDto(Product product) {
        return new ProductDTO(
                product.getProductId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getQuantityAvailable(),
                product.getSold(),
                product.getCategory().getName(),
                product.getImageUrl(),
                product.getWeight(),
                product.getUnit(),
                product.getCreatedAt(),
                product.getStatus()
        );
    }
}