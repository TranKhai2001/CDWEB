package com.example.bankend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "cart")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long cartId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private CartStatus status;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> items;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

    public enum CartStatus {
        ACTIVE,
        CHECKED_OUT,
        ABANDONED
    }
}