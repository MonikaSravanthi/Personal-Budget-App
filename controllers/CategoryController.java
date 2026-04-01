package com.springlearning.budgetapp.controllers;

import com.springlearning.budgetapp.Service.CategoryService;
import com.springlearning.budgetapp.dto.CategoryLimitDTO;
import com.springlearning.budgetapp.dto.categoryLimitResponseDTO;
import com.springlearning.budgetapp.dto.categorySpendingResDto;
import com.springlearning.budgetapp.repositories.UserRepository;
import com.springlearning.budgetapp.repositories.customCategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private customCategoryRepo customCategoryRepo;
       private UserRepository userRepo;

       private CategoryService categoryService;
    @Autowired
    public CategoryController(customCategoryRepo customCategoryRepo, UserRepository userRepo, CategoryService categoryService) {
        this.customCategoryRepo = customCategoryRepo;
        this.userRepo = userRepo;
        this.categoryService = categoryService;
    }

    @PostMapping("/limit")
    public void categoryLimit(@RequestBody List<CategoryLimitDTO> categoryLimitDTO) {
      categoryService.saveCategoryLimit(categoryLimitDTO);



    }

    @GetMapping("/limit")
    public List< categoryLimitResponseDTO> getCategoryLimit( ) {
       return categoryService.getCategoryLimit();

    }

    @GetMapping("/spending")
    public List<categorySpendingResDto> CategorySpending(){
        return categoryService.getCategorySpendingForEveryCategory();

    }

}
