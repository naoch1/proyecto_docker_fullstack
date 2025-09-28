package com.exampleDtoDao.demo.persistence.dao.implementation;

import com.exampleDtoDao.demo.persistence.dao.interfaces.ILoanDAO;
import com.exampleDtoDao.demo.persistence.entity.LoanEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public class LoanDaoImpl implements ILoanDAO{

    @PersistenceContext
    private EntityManager em;

    @Override
    @Transactional(readOnly = true)
    public List<LoanEntity> findAll() {
        return this.em.createQuery("SELECT l FROM LoanEntity l", LoanEntity.class).getResultList();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<LoanEntity> findById(Long id) {
        return Optional.ofNullable(this.em.find(LoanEntity.class, id));
    }

    @Override
    @Transactional
    public void saveLoan(LoanEntity LoanEntity) {
        this.em.persist(LoanEntity);
        this.em.flush();
    }

    @Override
    @Transactional
    public void updateLoan(LoanEntity LoanEntity) {
        this.em.merge(LoanEntity);
    }

    @Override
    @Transactional
    public void deleteLoan(LoanEntity LoanEntity) {
        this.em.remove(LoanEntity);
    }
}
