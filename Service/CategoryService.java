package com.springlearning.budgetapp.Service;

import com.springlearning.budgetapp.dto.CategoryLimitDTO;
import com.springlearning.budgetapp.dto.categoryLimitResponseDTO;
import com.springlearning.budgetapp.dto.categorySpendingResDto;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface CategoryService {
    public void saveCategoryLimit(List<CategoryLimitDTO> categoryLimitDTO);
    public List<categoryLimitResponseDTO> getCategoryLimit();
    public List<categorySpendingResDto> getCategorySpendingForEveryCategory();

}
