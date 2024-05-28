package com.example.bankend.service.implement;
import com.example.bankend.entity.Address;
import com.example.bankend.entity.User;
import com.example.bankend.repository.AddressRepository;
import com.example.bankend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    public void saveAddress(Address address, User user) {
        address.setUser(user);
        addressRepository.save(address);
    }
}