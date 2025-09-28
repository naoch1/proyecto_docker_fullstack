package com.exampleDtoDao.demo.persistence.repository;

import com.exampleDtoDao.demo.persistence.entity.LoanEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ILoanRepository extends CrudRepository<LoanEntity, Long>{
}
