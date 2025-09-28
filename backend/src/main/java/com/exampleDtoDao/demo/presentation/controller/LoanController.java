package com.exampleDtoDao.demo.presentation.controller;

import com.exampleDtoDao.demo.presentation.dto.LoanDTO;
import com.exampleDtoDao.demo.service.interfaces.ILoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prestamo")
public class LoanController {

    @Autowired
    private ILoanService LoanService;

    //findAll
    @GetMapping("/find")
    public ResponseEntity<List<LoanDTO>> findAll(){
        return new ResponseEntity<>(this.LoanService.findAll(), HttpStatus.OK);
    }

    //findById
    @GetMapping("/find/{id}")
    public ResponseEntity<LoanDTO> findById(@PathVariable Long id){
        return new ResponseEntity<>(this.LoanService.findById(id), HttpStatus.OK);
    }

    //create user
    @PostMapping("/create")
    public ResponseEntity<LoanDTO> createLoan(@RequestBody LoanDTO LoanDTO) {
        return new ResponseEntity<>(this.LoanService.createLoan(LoanDTO), HttpStatus.CREATED);
    }

    //Update User
    @PutMapping("/update/{id}")
    public ResponseEntity<LoanDTO> updateLoan(@RequestBody LoanDTO LoanDTO, @PathVariable Long id) {
        return new ResponseEntity<>(this.LoanService.updateLoan(LoanDTO, id), HttpStatus.OK);
    }

    //Delete User
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteLoan(@PathVariable Long id) {
        return new ResponseEntity<>(this.LoanService.deleteLoan(id), HttpStatus.NO_CONTENT);
    }


}
