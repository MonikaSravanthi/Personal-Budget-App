package com.springlearning.budgetapp.controllers;


import com.springlearning.budgetapp.entity.Authorities;
import com.springlearning.budgetapp.entity.Transactions;
import com.springlearning.budgetapp.entity.Users;
import com.springlearning.budgetapp.repositories.AuthoritiesRepository;
import com.springlearning.budgetapp.repositories.TransactionsRepository;
import com.springlearning.budgetapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;


@Controller
@RequestMapping("/authentication")
public class LoginFormController {


    private final PasswordEncoder passwordEncoder;

    private final AuthoritiesRepository authoritiesRepository;
   private  TransactionsRepository transactionsRepository;
   private UserRepository userRepository;


    @Autowired
public LoginFormController( UserRepository userRepository,PasswordEncoder passwordEncoder,AuthoritiesRepository AuthoritiesRepository, TransactionsRepository TransactionsRepository) {
        this.transactionsRepository = TransactionsRepository;
        this.authoritiesRepository = AuthoritiesRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
}


    @GetMapping("/signup")
    public String signup(){
        return "signup-page";
    }

    @PostMapping("/signup")
    public String saveUser(@ModelAttribute Users user){
      List<Users> allUsers=  userRepository.findAllUsers();
      for(Users u: allUsers  ){
          if(u.getUsername().equals(user.getUsername())){
              System.out.println("User already exists");
              return "redirect:/signup-page";
          }
      }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        userRepository.save(user);

       Authorities authorities = new Authorities();
       authorities.setAuthority("ROLE_USER");
       authorities.setUser(user);
       authoritiesRepository.save(authorities);

      return "redirect:/index.html";
    }





}
