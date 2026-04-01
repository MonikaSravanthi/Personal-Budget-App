package com.springlearning.budgetapp.repositories;

import com.springlearning.budgetapp.dto.categorySpendingResDto;
import com.springlearning.budgetapp.entity.Categories;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface customCategoryRepo {

        Categories findByCategoryId(Integer categoryId);
        Categories findByCategoryName(String categoryName);
          void save(Categories category);
          List<Categories> getCategories(Integer userId);

    BigDecimal getTotalMoneySpentMonth(Integer categoryId, Integer month, Integer year);
    List<categorySpendingResDto> getEveryCategorySpending(int userId);
}

