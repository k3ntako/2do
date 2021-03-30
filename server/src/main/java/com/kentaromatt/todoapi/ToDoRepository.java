package com.kentaromatt.todoapi;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface ToDoRepository extends CrudRepository<ToDo, Long> {
    
    List<ToDo> findByDescription(String description);
    List<ToDo> findAll();
    Optional<ToDo> findById(Long id);
}
