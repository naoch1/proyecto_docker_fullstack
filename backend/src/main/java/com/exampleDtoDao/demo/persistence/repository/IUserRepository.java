package com.exampleDtoDao.demo.persistence.repository;

import com.exampleDtoDao.demo.persistence.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends CrudRepository<UserEntity, Long> {
}
