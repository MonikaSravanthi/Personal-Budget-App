package com.springlearning.budgetapp.controllers;

import com.springlearning.budgetapp.dto.IncomeDto;
import com.springlearning.budgetapp.entity.Users;
import com.springlearning.budgetapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class IncomeController {

    private UserRepository userRepository;

    @Autowired
    public IncomeController(UserRepository userRepository) {
        this.userRepository = userRepository;

    }

    @GetMapping("/income")
    public Integer getIncome() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Users user = userRepository.findByUsername(auth.getName());
       return user.getIncome();

    }

    @PutMapping("/income")
//    @PatchMapping("/income")
    public String updateIncome(@RequestBody IncomeDto userIncome) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Users user = userRepository.findByUsername(auth.getName());
        user.setIncome(userIncome.getIncome());
        userRepository.save(user);
        return "success";
    }
}
