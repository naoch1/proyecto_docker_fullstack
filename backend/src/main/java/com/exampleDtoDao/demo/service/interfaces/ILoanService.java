package com.exampleDtoDao.demo.service.interfaces;

import com.exampleDtoDao.demo.presentation.dto.LoanDTO;

import java.util.List;

public interface ILoanService {
    List<LoanDTO> findAll();
    LoanDTO findById(Long id);
    LoanDTO createLoan(LoanDTO LoanDTO);
    LoanDTO updateLoan(LoanDTO LoanDTO, Long id);
    String deleteLoan(Long id);

}
