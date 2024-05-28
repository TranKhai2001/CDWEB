package com.example.bankend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private String deliveryAddress;
    private String paymentMethod; // Assuming you have different payment methods
}