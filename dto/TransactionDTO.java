package com.springlearning.budgetapp.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class TransactionDTO {
    private Integer categoryId;
    private BigDecimal amount;
    private String receiver;
  private LocalDate date;
  private String taskDescription;
//   private Integer tId;

    public String getReceiver() {
        return receiver;
    }
    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

//    public Integer getTId() {
//       return tId;
//   }
//   public void setTId(Integer tId) {
//       this.tId = tId;
//   }

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


    public Integer getCategoryId() {
        return categoryId;
    }
    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    @Override
    public String toString() {
        return "TransactionDTO [categoryId=" + categoryId + ", amount=" + amount + ", receiver=" + receiver
                + ", date=" + date + ", taskDescription=" + taskDescription + ", ]";
    }
}
