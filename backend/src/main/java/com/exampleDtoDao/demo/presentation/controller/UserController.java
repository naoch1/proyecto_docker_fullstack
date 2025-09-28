package com.exampleDtoDao.demo.presentation.controller;

import com.exampleDtoDao.demo.presentation.dto.UserDTO;
import com.exampleDtoDao.demo.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private IUserService userService;

    //findAll
    @GetMapping("/find")
    public ResponseEntity<List<UserDTO>> findAll(){
        return new ResponseEntity<>(this.userService.findAll(), HttpStatus.OK);
    }

    //findById
    @GetMapping("/find/{id}")
    public ResponseEntity<UserDTO> findById(@PathVariable Long id){
        return new ResponseEntity<>(this.userService.findById(id), HttpStatus.OK);
    }

    //create user
    @PostMapping("/create")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        return new ResponseEntity<>(this.userService.createUser(userDTO), HttpStatus.CREATED);
    }

    //Update User
    @PutMapping("/update/{id}")
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO userDTO, @PathVariable Long id) {
        return new ResponseEntity<>(this.userService.updateUser(userDTO, id), HttpStatus.OK);
    }

    //Delete User
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        return new ResponseEntity<>(this.userService.deleteUser(id), HttpStatus.NO_CONTENT);
    }

}


