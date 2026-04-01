package com.springlearning.budgetapp.dto;

import jdk.jfr.Percentage;

import java.math.BigDecimal;

public class categoryLimitResponseDTO {
    private String categoryName;
    private Integer categoryLimit;
    private BigDecimal totalAmtSpentThisMonth;
    private BigDecimal percentage;

    public String getCategoryName() {
        return categoryName;
    }
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
    public Integer getCategoryLimit() {
        return categoryLimit;
    }
    public void setCategoryLimit(Integer categoryLimit) {
        this.categoryLimit = categoryLimit;
    }
    public BigDecimal getTotalAmtSpentThisMonth() {
        return totalAmtSpentThisMonth;
    }
    public void setTotalAmtSpentThisMonth(BigDecimal totalAmtSpentThisMonth) {
        this.totalAmtSpentThisMonth = totalAmtSpentThisMonth;
    }
    public BigDecimal getPercentage() {
        return percentage;
    }
    public void setPercentage(BigDecimal percentage) {
        this.percentage = percentage;
    }

    @Override
    public String toString() {
        return "categoryLimitResponseDTO [categoryName=" + categoryName + ", categoryLimit=" + categoryLimit + ", totalAmtSpentThisMonth="
                + totalAmtSpentThisMonth + ", percentage=" + percentage + "]";
    }

}
