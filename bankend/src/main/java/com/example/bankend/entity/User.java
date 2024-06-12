package com.example.bankend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.time.Instant;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "date_of_birth")
    private Timestamp dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "registration_date", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp registrationDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private UserStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private UserRole role;

    // Đảm bảo rằng registrationDate được thiết lập khi khởi tạo
    @PrePersist
    protected void onCreate() {
        if (registrationDate == null) {
            registrationDate = Timestamp.from(Instant.now());
        }
    }

}