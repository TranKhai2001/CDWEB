package com.example.bankend.controller;

import com.example.bankend.entity.Address;
import com.example.bankend.entity.User;
import com.example.bankend.repository.AddressRepository;
import com.example.bankend.service.implement.AddressService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@RestController
@RequestMapping("/address")
public class AddressController {

    private static final Logger logger = LoggerFactory.getLogger(AddressController.class);
    @Autowired
    private final AddressService addressService;
    @Autowired
    private final HttpSession session;

    public AddressController(AddressService addressService, HttpSession session) {
        this.addressService = addressService;
        this.session = session;
    }

    @PostMapping("/saveAddress")
    public Address saveAddress(@RequestBody Address address, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            addressService.saveAddress(address,user);
            throw new RuntimeException("User logged in");
        } else {
            throw new RuntimeException("User not logged in");
        }
    }
}