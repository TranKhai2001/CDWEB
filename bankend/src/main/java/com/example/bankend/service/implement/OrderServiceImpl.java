package com.example.bankend.service.implement;

import com.example.bankend.dto.OrderDTO;
import com.example.bankend.dto.OrderHistoryDTO;
import com.example.bankend.entity.*;
import com.example.bankend.repository.CartRepository;
import com.example.bankend.repository.OrderItemRepository;
import com.example.bankend.repository.OrderRepository;
import com.example.bankend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Override
    public Order placeOrder(User user, OrderDTO orderDTO) {
        Cart cart = cartRepository.findByUserAndStatus(user, Cart.CartStatus.ACTIVE)
                .orElseThrow(() -> new IllegalArgumentException("Active cart not found for user"));

        Order order = new Order();
        order.setUser(user);
        order.setDeliveryAddress(orderDTO.getDeliveryAddress());
        order.setStatus(Order.OrderStatus.PENDING);
        order.setPaymentStatus(Order.PaymentStatus.PENDING);

        BigDecimal totalAmount = cart.getItems().stream()
                .map(cartItem -> cartItem.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        order.setTotalAmount(totalAmount);

        // Save the order first to get the order ID
        order = orderRepository.save(order);

        // Now create order items
        Order finalOrder = order;
        List<OrderItem> orderItems = cart.getItems().stream().map(cartItem -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(finalOrder);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getPrice());
            return orderItem;
        }).collect(Collectors.toList());

        order.setItems(orderItems);
        orderItemRepository.saveAll(orderItems);

        // Clear the cart after placing the order
        cart.getItems().clear();
        cartRepository.save(cart);

        return order;
    }

    @Override
    public List<OrderHistoryDTO> getOrderHistory(User user) {
        List<Order> orders = orderRepository.findByUser(user);
        return orders.stream().map(order -> {
            List<OrderHistoryDTO.OrderItemDTO> items = order.getItems().stream().map(item ->
                    new OrderHistoryDTO.OrderItemDTO(
                            item.getProduct().getName(),
                            item.getQuantity(),
                            item.getPrice(),
                            item.getProduct().getImageUrl())  // Thêm thông tin ảnh sản phẩm
            ).collect(Collectors.toList());

            return new OrderHistoryDTO(
                    order.getOrderId(),
                    order.getOrderDate(),
                    order.getTotalAmount(),
                    order.getDeliveryAddress(),
                    order.getStatus(),
                    order.getPaymentStatus(),
                    items
            );
        }).collect(Collectors.toList());
    }
}