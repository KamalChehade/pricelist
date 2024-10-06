package com.quantum.quantumweb.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quantum.quantumweb.models.Admin;
import com.quantum.quantumweb.repositories.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public boolean authenticate(String username, String password) {
        Admin admin = adminRepository.findByUsername(username);
        return admin != null && admin.getPassword().equals(password);
    }
    
    @Override
    public Admin findByUsername(String username) {
        return adminRepository.findByUsername(username);
    }
}