package com.example.bankend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "address")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Long address_id;
    @Column(name = "city")
    private String city;
    @Column(name = "district")
    private String district;
    @Column(name = "ward")
    private String ward;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
