package com.springlearning.budgetapp.controllers;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springlearning.budgetapp.Service.TransactionService;
import com.springlearning.budgetapp.dto.SpendingOvertimeResDTO;
import com.springlearning.budgetapp.dto.TransactionDTO;
import com.springlearning.budgetapp.entity.Transactions;
import com.springlearning.budgetapp.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api")
public class TransactionController {



    private TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {

        this.transactionService = transactionService;
    }

    @GetMapping("/transactions")
    public List<Transactions> transactions() {

        return transactionService.getAllTransactions();

    }
    @GetMapping("/transactions/{id}")
    public Transactions singleTransaction(@PathVariable int transactionId) {

        return transactionService.getTransactionById(transactionId);

    }

    @PostMapping("/transactions")
    public ResponseEntity<String> saveTransaction(@RequestBody Transactions transaction){

           return transactionService.saveTransaction(transaction);

    }


    @PatchMapping("/transactions/{id}")
    public void updateTransaction(@PathVariable int transactionId, @RequestBody TransactionDTO updatedTransactionDto) throws JsonMappingException {
        System.out.println(updatedTransactionDto);

         transactionService.updateTransaction(transactionId, updatedTransactionDto);


    }
    @DeleteMapping("/transactions/{id}")
    public void deleteTransaction(@PathVariable long transactionId){

        transactionService.deleteTransaction(transactionId);


    }

    @GetMapping("/transactions/spendingOvertime")
    public List<SpendingOvertimeResDTO> spendingOvertime() {
     return transactionService.getSpendingOverTime();
    }






}
