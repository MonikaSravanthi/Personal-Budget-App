package com.springlearning.budgetapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="users")


public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    @Column(name="username")
    private String username;
    @Column(name="password")
    private String password;
   @Column(name="income")
   private Integer income;

    @OneToMany(mappedBy = "user")
   private List<Transactions> transactions;

    @OneToMany(mappedBy = "authority")
    private List<Authorities> authorities;
    @OneToMany(mappedBy="users")
    private List<Categories> categories;

    public Users() {}
    public Users(int id,String username, String password, Integer income) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.income = income;

    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public Integer getIncome() {
        return income;
    }
    public void setIncome(Integer income) {
        this.income = income;
    }

    @Override
    public String toString() {
      return  "Users [userId=" + id + ", username=" + username + ", password=" + password
                + ", income=" + income + "]";
    }



}
