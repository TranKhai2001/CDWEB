package com.example.bankend.dto;

import com.example.bankend.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderrDTO {
    private Long orderId;
    private String userName; // New field for user's name
    private String phoneNumber;
    private Timestamp orderDate;
    private BigDecimal totalAmount;
    private String deliveryAddress;
    private Order.OrderStatus status;
    private Order.PaymentStatus paymentStatus;



    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemDTO {
        private String productName;
        private int quantity;
        private BigDecimal price;
        private String imageUrl;
    }
}
