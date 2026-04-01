package com.springlearning.budgetapp.DAO;

import com.springlearning.budgetapp.dto.SpendingOvertimeResDTO;
import com.springlearning.budgetapp.dto.categorySpendingResDto;
import com.springlearning.budgetapp.entity.Categories;
import com.springlearning.budgetapp.repositories.customCategoryRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public class customCategoryDAOImple implements customCategoryRepo {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public customCategoryDAOImple(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

   @Override
   public Categories findByCategoryId(Integer categoryId){
        System.out.println(categoryId);
       return entityManager.find(Categories.class, categoryId);

   }
   @Override
  public Categories findByCategoryName(String categoryName){
       TypedQuery<Categories> categories = entityManager.createQuery("select c from Categories c where c.categoryName = :categoryName", Categories.class);
       categories.setParameter("categoryName", categoryName);
       return categories.getSingleResult();
   }
   @Override
   @Transactional
   public void save(Categories category){
        entityManager.persist(category);
   }

   @Override
    public List<Categories> getCategories(Integer userId){
        TypedQuery<Categories> categories = entityManager.createQuery("select c from Categories c where c.users.id = :userId and c.categoryLimit is not null ", Categories.class);
        categories.setParameter("userId", userId);
        return categories.getResultList();

   }

    @Override
    public BigDecimal getTotalMoneySpentMonth(Integer categoryId, Integer month, Integer year) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.plusMonths(1);
        TypedQuery<BigDecimal> amt = entityManager.createQuery(
                "select coalesce(sum(t.amount), 0) from Transactions t where t.category.id = :categoryId and t.date >= :startDate " +
                        "and t.date < :endDate", BigDecimal.class
        );

        amt.setParameter("categoryId", categoryId);
        amt.setParameter("startDate", start);
        amt.setParameter("endDate", end);

        return amt.getSingleResult();
    }

    @Override
    public List<categorySpendingResDto> getEveryCategorySpending(int userId){
        TypedQuery<categorySpendingResDto> query = entityManager.createQuery("SELECT New com.springlearning.budgetapp.dto.categorySpendingResDto(t.category.categoryId,t.category.categoryName,SUM(t.amount)) FROM Transactions t WHERE t.user.id = :userid  GROUP BY t.category.categoryId, t.category.categoryName ", categorySpendingResDto.class);
        query.setParameter("userid", userId);
        return query.getResultList();
    }







}
