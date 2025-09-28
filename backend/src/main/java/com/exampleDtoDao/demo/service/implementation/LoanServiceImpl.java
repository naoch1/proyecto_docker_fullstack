package com.exampleDtoDao.demo.service.implementation;

import com.exampleDtoDao.demo.persistence.dao.interfaces.ILoanDAO;
import com.exampleDtoDao.demo.persistence.entity.LoanEntity;
import com.exampleDtoDao.demo.presentation.dto.LoanDTO;
import com.exampleDtoDao.demo.service.interfaces.ILoanService;
import lombok.Data;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Data
@Service
public class LoanServiceImpl implements ILoanService  {

    @Autowired
    private ILoanDAO LoanDAO;

    @Override
    public List<LoanDTO> findAll() {

        ModelMapper modelMapper = new ModelMapper();

        return this.LoanDAO.findAll()
                .stream()
                .map(entity -> modelMapper.map(entity, LoanDTO.class))
                .collect(Collectors.toList());

    }

    @Override
    public LoanDTO findById(Long id) {

        Optional<LoanEntity> LoanEntity = this.LoanDAO.findById(id);

        if(LoanEntity.isPresent()) {
            ModelMapper modelMapper = new ModelMapper();
            LoanEntity currentLoan = LoanEntity.get();
            return modelMapper.map(currentLoan, LoanDTO.class);
        }else{
            return new LoanDTO();
        }

    }

    @Override
    public LoanDTO createLoan(LoanDTO LoanDTO) {
        try{
            ModelMapper modelMapper = new ModelMapper();
            LoanEntity LoanEntity = modelMapper.map(LoanDTO, LoanEntity.class);
            this.LoanDAO.saveLoan(LoanEntity);
            return LoanDTO;
        } catch (Exception e){
            throw new UnsupportedOperationException("Error while creating Loan");
        }

    }

    @Override
    public LoanDTO updateLoan(LoanDTO LoanDTO, Long id) {
        Optional<LoanEntity> LoanEntity = this.LoanDAO.findById(id);
        if(LoanEntity.isPresent()) {
            LoanEntity currentLoanEntity = LoanEntity.get();

            currentLoanEntity.setId(LoanDTO.getId());
            currentLoanEntity.setIdCliente(LoanDTO.getIdCliente());
            currentLoanEntity.setCapital(LoanDTO.getCapital());
            currentLoanEntity.setRate(LoanDTO.getRate());
            currentLoanEntity.setPlazo(LoanDTO.getPlazo());
            currentLoanEntity.setMesesgracia(LoanDTO.getMesesgracia());
            currentLoanEntity.setFechasolicitud(LoanDTO.getFechasolicitud());
            currentLoanEntity.setFechapagoprimeracuota(LoanDTO.getFechapagoprimeracuota());
            currentLoanEntity.setFechatermino(LoanDTO.getFechatermino());

            this.LoanDAO.updateLoan(currentLoanEntity);
            ModelMapper modelMapper = new ModelMapper();
            return modelMapper.map(currentLoanEntity, LoanDTO.class);
        } else {
            throw new IllegalArgumentException("Loan not found");
        }

    }

    @Override
    public String deleteLoan(Long id) {
        Optional<LoanEntity> LoanEntity = this.LoanDAO.findById(id);

        if(LoanEntity.isPresent()) {
            LoanEntity currentLoanEntity = LoanEntity.get();
            this.LoanDAO.deleteLoan(currentLoanEntity);
            return "Loan with Id :(" + id + ") was deleted";
        }else{
            return "Loan with Id :(" + id + ") was not found";
        }
    }
}
