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
public class OrderDetailDTO {
    private Long orderId;
    private Timestamp orderDate;
    private BigDecimal totalAmount;
    private String deliveryAddress;
    private Order.OrderStatus status;
    private Order.PaymentStatus paymentStatus;
    private List<OrderItemDetailDTO> items;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemDetailDTO {
        private Long productId;
        private String productName;
        private int quantity;
        private BigDecimal price;
        private String imageUrl;
    }
}