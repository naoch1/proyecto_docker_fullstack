package com.exampleDtoDao.demo.persistence.dao.interfaces;

import com.exampleDtoDao.demo.persistence.entity.LoanEntity;

import java.util.List;
import java.util.Optional;

public interface ILoanDAO {
    
    List<LoanEntity> findAll();
    Optional<LoanEntity> findById(Long id);
    void saveLoan(LoanEntity LoanEntity);
    void updateLoan(LoanEntity LoanEntity);
    void deleteLoan(LoanEntity LoanEntity);

}
