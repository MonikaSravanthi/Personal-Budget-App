package com.springlearning.budgetapp.dto;

import java.math.BigDecimal;

public class categorySpendingResDto {
private int categoryId;
private String categoryName;
private BigDecimal totalSpending;

public categorySpendingResDto(int categoryId, String categoryName, BigDecimal totalSpending) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.totalSpending = totalSpending;

}
public int getCategoryId() {
    return categoryId;
}
public void setCategoryId(int categoryId) {
    this.categoryId = categoryId;
}
public String getCategoryName() {
    return categoryName;
}
public void setCategoryName(String categoryName) {
    this.categoryName = categoryName;
}
public BigDecimal getTotalSpending() {
    return totalSpending;
}
public void setTotalSpending(BigDecimal totalSpending) {
    this.totalSpending = totalSpending;
}


}
