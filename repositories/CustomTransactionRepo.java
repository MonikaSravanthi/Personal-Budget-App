package com.springlearning.budgetapp.repositories;

import com.springlearning.budgetapp.dto.SpendingOvertimeResDTO;
import com.springlearning.budgetapp.entity.Transactions;

import java.time.LocalDate;
import java.util.List;

public interface CustomTransactionRepo {
    List<Transactions> findTransactionsByUserId(int id);
//    Transactions findTransactionById(int id);
      Transactions findSingleTransaction(int tId,int userId);
       Transactions updateTransaction(int tId, int userId);
    List<SpendingOvertimeResDTO>  getSpendingOverTime(int userId, LocalDate startDate);
}
