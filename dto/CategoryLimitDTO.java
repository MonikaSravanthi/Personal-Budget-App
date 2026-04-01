package com.springlearning.budgetapp.dto;


public class CategoryLimitDTO {
    private String categoryName;
    private Integer categoryLimit;


    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
    public void setCategoryLimit(Integer categoryLimit) {
        this.categoryLimit = categoryLimit;
    }
    public String getCategoryName() {
        return categoryName;
    }
    public Integer getCategoryLimit() {
        return categoryLimit;
    }

    @Override
    public String toString() {
        return "CategoryLimitDTO [categoryName=" + categoryName + ", categoryLimit=" + categoryLimit + "]";
    }
}
