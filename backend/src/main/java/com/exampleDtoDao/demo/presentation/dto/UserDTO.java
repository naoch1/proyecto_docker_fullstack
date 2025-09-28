package com.exampleDtoDao.demo.presentation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;




@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Long Id;
    private String name;
    private String lastName;
    private String email;
    private String age;

}
