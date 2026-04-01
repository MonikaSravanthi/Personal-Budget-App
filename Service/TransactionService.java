package com.springlearning.budgetapp.Service;

import com.springlearning.budgetapp.dto.SpendingOvertimeResDTO;
import com.springlearning.budgetapp.dto.TransactionDTO;
import com.springlearning.budgetapp.entity.Transactions;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


public interface TransactionService {
    List<Transactions> getAllTransactions();
    Transactions getTransactionById(Integer id);
    ResponseEntity<String> saveTransaction(Transactions transaction);
    void updateTransaction(Integer tId,  TransactionDTO updatedTransactionDto);
    void deleteTransaction(Long tId);
    List<SpendingOvertimeResDTO>  getSpendingOverTime();
}
