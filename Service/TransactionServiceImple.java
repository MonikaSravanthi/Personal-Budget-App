package com.springlearning.budgetapp.Service;

import com.springlearning.budgetapp.dto.SpendingOvertimeResDTO;
import com.springlearning.budgetapp.dto.TransactionDTO;
import com.springlearning.budgetapp.entity.Categories;
import com.springlearning.budgetapp.entity.Transactions;
import com.springlearning.budgetapp.entity.Users;
import com.springlearning.budgetapp.repositories.CustomTransactionRepo;
import com.springlearning.budgetapp.repositories.TransactionsRepository;
import com.springlearning.budgetapp.repositories.UserRepository;
import com.springlearning.budgetapp.repositories.customCategoryRepo;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionServiceImple implements TransactionService {

    private TransactionsRepository transactionsRepository;
    private CustomTransactionRepo customTransactionRepo;
    private customCategoryRepo customCategoryRepo;
    private UserRepository userRepository;



    public TransactionServiceImple(CustomTransactionRepo customTransactionRepo, UserRepository userRepository,
                                   TransactionsRepository transactionsRepository,
                                   customCategoryRepo customCategoryRepo) {
        this.customTransactionRepo = customTransactionRepo;
        this.userRepository = userRepository;
        this.transactionsRepository = transactionsRepository;
        this.customCategoryRepo = customCategoryRepo;
     }

   @Override
    public List<Transactions> getAllTransactions(){
       Authentication auth = SecurityContextHolder.getContext().getAuthentication();
       Users user= userRepository.findByUsername(auth.getName());
       int userId = user.getId();

       return customTransactionRepo.findTransactionsByUserId(userId);
     }

     @Override
     public Transactions getTransactionById(Integer id){
         Authentication auth = SecurityContextHolder.getContext().getAuthentication();
         Users user = userRepository.findByUsername(auth.getName());
         int userId = user.getId();
         return customTransactionRepo.findSingleTransaction(id,userId);

     }

     @Override
    @Transactional
    public ResponseEntity<String> saveTransaction(Transactions transaction) {
         Authentication auth = SecurityContextHolder.getContext().getAuthentication();
           Categories category =  customCategoryRepo.findByCategoryId(transaction.getCategory().getCategoryId());
         LocalDate date = LocalDate.now();
         Integer month = date.getMonthValue();
        BigDecimal totalAmt = customCategoryRepo.getTotalMoneySpentMonth(category.getCategoryId(), month, date.getYear());
         BigDecimal actual = new BigDecimal(category.getCategoryLimit());
         transaction.setUser(userRepository.findByUsername(auth.getName()));
         transactionsRepository.save(transaction);

         int totalSpent = totalAmt.intValue()+transaction.getAmount().intValue();
         if(totalSpent> actual.intValue()){

             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("you have exceeded the category limit");

         }

         return ResponseEntity.status(HttpStatus.OK).body("Transaction added successfully");

//         if(totalAmt.compareTo(actual)> 0){
//             return ResponseEntity.status(HttpStatus.FORBIDDEN).body("you have exceeded the category limit");
//         }
     }
     @Override
    @Transactional
    public void updateTransaction(Integer tId,  TransactionDTO updatedTransactionDto ) {
         System.out.println(updatedTransactionDto);
         Authentication auth = SecurityContextHolder.getContext().getAuthentication();
         Users user = userRepository.findByUsername(auth.getName());

         Transactions existingTransaction = customTransactionRepo.findSingleTransaction(tId,user.getId());

         if(updatedTransactionDto.getAmount() != null) {
             existingTransaction.setAmount(updatedTransactionDto.getAmount());
         }
         if(updatedTransactionDto.getCategoryId() != null) {
             Categories category = customCategoryRepo.findByCategoryId(updatedTransactionDto.getCategoryId());
             existingTransaction.setCategory(category);
         }
         if(updatedTransactionDto.getDate() != null) {
             existingTransaction.setDate(updatedTransactionDto.getDate());

         }
         if(updatedTransactionDto.getReceiver() != null) {
             existingTransaction.setReceiver(updatedTransactionDto.getReceiver());

         }
         if(updatedTransactionDto.getTaskDescription() != null) {
             existingTransaction.setTaskDescription(updatedTransactionDto.getTaskDescription());

         }


           transactionsRepository.save(existingTransaction);
    }
    @Override
    public void deleteTransaction(Long tId) {
        transactionsRepository.deleteById(tId);

    }
    @Override
    public List<SpendingOvertimeResDTO>  getSpendingOverTime(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Users user = userRepository.findByUsername(auth.getName());
        LocalDate startDate = LocalDate.now().minusDays(30);
        return customTransactionRepo.getSpendingOverTime(user.getId(),startDate);




    }


}
