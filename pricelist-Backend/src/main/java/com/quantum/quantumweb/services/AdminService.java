package com.quantum.quantumweb.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quantum.quantumweb.models.Admin;

public interface AdminService {
    boolean authenticate(String username, String password);
    Admin findByUsername(String username);

}