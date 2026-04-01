package com.springlearning.budgetapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name="transactions")

public class Transactions {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="t_id")
    private Integer transactionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", referencedColumnName = "id", nullable=false)
    @JsonIgnore
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name="category_id",referencedColumnName = "category_id")
    private Categories category;

    @Column(name="amount")
    private BigDecimal amount;

    @Column(name="date")
    private LocalDate date;

    @Column(name="transaction_description")
    private String taskDescription;

    @Column(name="receiver")
    private String receiver;

    public Transactions() {}
    public Transactions(int transactionId, Users user, LocalDate date, BigDecimal amount, String taskDescription, String receiver) {
        this.transactionId = transactionId;
        this.user = user;
        this.date = date;
        this.amount = amount;
        this.taskDescription = taskDescription;
        this.receiver = receiver;

    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }
    public String getReceiver() {
        return receiver;
    }

    public int getTransactionId() {
        return transactionId;
    }
        public void setTransactionId(Integer transactionId) {
        this.transactionId = transactionId;

    }
    public Users getUser() {
        return user;
    }
    public void setUser(Users user) {
        this.user = user;
    }
    public Categories getCategory() {
        return category;
    }
    public void setCategory(Categories category) {
        this.category = category;
    }
    public BigDecimal getAmount() {
        return amount;
    }
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
    public String getTaskDescription() {
        return taskDescription;
    }
    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    @Override
    public String toString() {
        return "Transactions [transactionId=" + transactionId + ", user=" + user + ", category=" + category
                + ", amount=" + amount + ", date=" + date + ", taskDescription=" + taskDescription
                + ", receiver=" + receiver + "]";
    }
}



