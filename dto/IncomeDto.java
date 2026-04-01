
package com.springlearning.budgetapp.dto;

public class IncomeDto {
    private Integer income;

    public IncomeDto(int income) {
        this.income = income;
    }
    public int getIncome() {
        return income;
    }
    public void setIncome(int income) {
        this.income = income;
    }

}
