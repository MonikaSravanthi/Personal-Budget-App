package com.springlearning.budgetapp.Service;

import com.springlearning.budgetapp.dto.CategoryLimitDTO;
import com.springlearning.budgetapp.dto.categoryLimitResponseDTO;
import com.springlearning.budgetapp.dto.categorySpendingResDto;
import com.springlearning.budgetapp.entity.Categories;
import com.springlearning.budgetapp.entity.Users;
import com.springlearning.budgetapp.repositories.UserRepository;
import com.springlearning.budgetapp.repositories.customCategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryServiceImple implements CategoryService {

    private customCategoryRepo customCategoryRepo;
    private UserRepository userRepo;


    @Autowired
    public CategoryServiceImple(customCategoryRepo customCategoryRepo,UserRepository userRepo) {
        this.userRepo = userRepo;
        this.customCategoryRepo = customCategoryRepo;

}

    @Override
    public void saveCategoryLimit(List<CategoryLimitDTO> categoryLimitDTO){
        for (CategoryLimitDTO categoryLimitDTO1 : categoryLimitDTO) {
            if(categoryLimitDTO1.getCategoryLimit()!=null) {
                Categories categories = customCategoryRepo.findByCategoryName(categoryLimitDTO1.getCategoryName());
                System.out.println(categories);
                if(categories.getCategoryLimit()!= categoryLimitDTO1.getCategoryLimit() ){
                    categories.setCategoryLimit(categoryLimitDTO1.getCategoryLimit());
                    System.out.println(categories);
                    customCategoryRepo.save(categories);
                }
            }
        }

    }

    @Override
    public List<categoryLimitResponseDTO> getCategoryLimit(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Users user =userRepo.findByUsername(auth.getName());
        System.out.println(user);
        List<Categories> category = customCategoryRepo.getCategories(user.getId());
        System.out.println(category);
        List<categoryLimitResponseDTO> allCategoryLimitResponseDTO = new ArrayList<>();
        for(Categories categories : category){
            categoryLimitResponseDTO categoryLimitResponseDTO = new categoryLimitResponseDTO();
            categoryLimitResponseDTO.setCategoryName(categories.getCategoryName());
            categoryLimitResponseDTO.setCategoryLimit(categories.getCategoryLimit());
            BigDecimal totalSpent = customCategoryRepo.getTotalMoneySpentMonth(categories.getCategoryId(), LocalDate.now().getMonthValue(), LocalDate.now().getYear());
            Integer limit = categories.getCategoryLimit();
            categoryLimitResponseDTO.setCategoryLimit( categories.getCategoryLimit());
            categoryLimitResponseDTO.setTotalAmtSpentThisMonth(totalSpent);
            categoryLimitResponseDTO.setPercentage(totalSpent.divide(BigDecimal.valueOf(limit),2, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100)).setScale(0, RoundingMode.HALF_UP));

            allCategoryLimitResponseDTO.add(categoryLimitResponseDTO);

        }
        System.out.println(allCategoryLimitResponseDTO);
        return allCategoryLimitResponseDTO;
    }


    @Override
    public List<categorySpendingResDto> getCategorySpendingForEveryCategory(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Users user =userRepo.findByUsername(auth.getName());

        return customCategoryRepo.getEveryCategorySpending(user.getId());
    }

}
