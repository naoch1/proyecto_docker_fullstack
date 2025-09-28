package com.exampleDtoDao.demo.persistence.entity;

import jakarta.persistence.*;
import lombok.*;




@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String name;
    @Column(name="last_name")
    private String lastName;
    private String email;
    private String age;
}
