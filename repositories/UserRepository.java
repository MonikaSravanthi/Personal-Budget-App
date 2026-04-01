package com.springlearning.budgetapp.repositories;

import com.springlearning.budgetapp.entity.Users;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface UserRepository   {
//    methods
    Users findUserById(int id);
    Users findByUsername(String username);
    List<Users> findAllUsers();
    void save(Users user);
}
