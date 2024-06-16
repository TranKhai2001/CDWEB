package com.example.bankend.service.implement;

import com.example.bankend.dto.OrderDTO;
import com.example.bankend.dto.OrderDetailDTO;
import com.example.bankend.dto.OrderHistoryDTO;
import com.example.bankend.entity.*;
import com.example.bankend.repository.CartRepository;
import com.example.bankend.repository.OrderItemRepository;
import com.example.bankend.repository.OrderRepository;
import com.example.bankend.repository.ProductRepository;
import com.example.bankend.service.EmailService;
import com.example.bankend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.DecimalFormat;
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

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private EmailService emailService;

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

        order = orderRepository.save(order);

        Order finalOrder = order;
        List<OrderItem> orderItems = cart.getItems().stream().map(cartItem -> {
            Product product = cartItem.getProduct();
            int quantityAvailable = product.getQuantityAvailable();
            int quantityToBuy = cartItem.getQuantity();

            if (quantityToBuy > quantityAvailable) {
                throw new IllegalArgumentException("Số lượng '" + product.getName() + "' còn lại không đủ");
            }

            product.setQuantityAvailable(quantityAvailable - quantityToBuy);
            product.setSold(product.getSold() + quantityToBuy);
            productRepository.save(product);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(finalOrder);
            orderItem.setProduct(product);
            orderItem.setQuantity(quantityToBuy);
            orderItem.setPrice(cartItem.getPrice());

            return orderItem;
        }).collect(Collectors.toList());

        order.setItems(orderItems);
        orderItemRepository.saveAll(orderItems);

        cart.getItems().clear();
        cartRepository.save(cart);

        // Send email notification
        sendOrderConfirmationEmail(user, order, orderItems);

        return order;
    }

    private void sendOrderConfirmationEmail(User user, Order order, List<OrderItem> orderItems) {
        StringBuilder itemDetails = new StringBuilder();
        for (OrderItem item : orderItems) {
            itemDetails.append(item.getProduct().getName())
                    .append(" (x").append(item.getQuantity()).append("), ");
        }

        // Tạo một BigDecimal từ 10,000
        BigDecimal additionalAmount = BigDecimal.valueOf(10000);

        // Cộng additionalAmount vào order.getTotalAmount()
        BigDecimal totalAmountWithAddition = order.getTotalAmount().add(additionalAmount);

        // Format totalAmountWithAddition với dấu phân cách hàng nghìn và không có dấu phẩy thập phân
        DecimalFormat decimalFormat = new DecimalFormat("#,###");
        String formattedTotalAmount = decimalFormat.format(totalAmountWithAddition);

        String subject = "Xác nhận đơn hàng";
        String text = "Quý khách đã đặt đơn hàng gồm: " + itemDetails.toString() +
                "Tổng tiền: " + formattedTotalAmount + " VND" +
                ". Mọi thông tin của đơn hàng sẽ được cập nhật qua email và web. Hãy chú ý theo dõi.";

        emailService.sendOrderConfirmationEmail(user.getEmail(), subject, text);
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
                            item.getProduct().getImageUrl())
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

    @Override
    public OrderDetailDTO getOrderDetail(Long orderId, User user) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));

        if (!order.getUser().getUserId().equals(user.getUserId())) {
            throw new IllegalArgumentException("Unauthorized access to order details");
        }

        List<OrderDetailDTO.OrderItemDetailDTO> items = order.getItems().stream().map(item ->
                new OrderDetailDTO.OrderItemDetailDTO(
                        item.getProduct().getProductId(),
                        item.getProduct().getName(),
                        item.getQuantity(),
                        item.getPrice(),
                        item.getProduct().getImageUrl())
        ).collect(Collectors.toList());

        return new OrderDetailDTO(
                order.getOrderId(),
                order.getOrderDate(),
                order.getTotalAmount(),
                order.getDeliveryAddress(),
                order.getStatus(),
                order.getPaymentStatus(),
                items
        );
    }
}