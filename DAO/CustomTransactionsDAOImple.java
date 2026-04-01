package com.springlearning.budgetapp.DAO;

import com.springlearning.budgetapp.dto.SpendingOvertimeResDTO;
import com.springlearning.budgetapp.entity.Transactions;
import com.springlearning.budgetapp.repositories.CustomTransactionRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public class CustomTransactionsDAOImple implements CustomTransactionRepo {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    public CustomTransactionsDAOImple(EntityManager em) {
        this.em = em;
    }
    @Override
    public List<Transactions> findTransactionsByUserId(int id){
       TypedQuery<Transactions> query = em.createQuery("SELECT t FROM Transactions t WHERE t.user.id = :userid", Transactions.class);
       query.setParameter("userid", id);
       return query.getResultList();
    }
    @Override
    public Transactions findSingleTransaction(int tId, int userId){
        TypedQuery<Transactions> query = em.createQuery("select t from Transactions t where t.transactionId = :id AND t.user.id = :userid ", Transactions.class);
        query.setParameter("id", tId);
        query.setParameter("userid", userId);
        return query.getSingleResult();
    }
     @Override
    public Transactions  updateTransaction(int tId,int userId){
        TypedQuery<Transactions> query = em.createQuery("SELECT t FROM Transactions t WHERE t.transactionId = :id AND t.user.id = :userid", Transactions.class);
        query.setParameter("id", tId);
        query.setParameter("userid", userId);
        return query.getSingleResult();

     }
     @Override
    public List<SpendingOvertimeResDTO>  getSpendingOverTime(int userId, LocalDate startDate){
        TypedQuery<SpendingOvertimeResDTO> query = em.createQuery("SELECT New com.springlearning.budgetapp.dto.SpendingOvertimeResDTO(t.date,SUM(t.amount)) FROM Transactions t WHERE t.user.id = :userid  AND date>= :startDate GROUP BY t.date ORDER BY t.date", SpendingOvertimeResDTO.class);
        query.setParameter("userid", userId);
        query.setParameter("startDate", startDate);
        return query.getResultList();

     }

}
