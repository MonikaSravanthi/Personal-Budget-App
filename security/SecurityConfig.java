package com.springlearning.budgetapp.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import javax.sql.DataSource;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public UserDetailsManager userDetailsManager(DataSource dataSource) {
        return new JdbcUserDetailsManager(dataSource);
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf->csrf.disable());
        http.authorizeHttpRequests(configurer -> configurer
                .requestMatchers(
                        "/index.html",
                        "/signup",
                        "/registration",
                        "/signup-page",
                        "/favicon.ico",
                        "/style.css",
                        "/script.js",
                        "/images/**" ,
                        "/api/categorize",
                        "/category/limit"
                ).permitAll()
                .anyRequest().authenticated()
        );
        http.formLogin(form -> form.loginPage("/index.html").loginProcessingUrl("/login").defaultSuccessUrl("/transactionPage.html", true).permitAll());
               http.logout(logout -> logout.permitAll());
               return http.build();
    }
}
