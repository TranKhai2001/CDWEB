package com.example.bankend.repository;

import com.example.bankend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email); // Thêm dòng này
    User findByPhoneNumber(String phoneNumber); // Thêm dòng này
}