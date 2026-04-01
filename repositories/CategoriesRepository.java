package com.springlearning.budgetapp.repositories;

import com.springlearning.budgetapp.entity.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriesRepository  extends JpaRepository<Categories, Long> {
}
