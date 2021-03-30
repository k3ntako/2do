package com.kentaromatt.todoapi;

import java.util.List;
import java.util.UUID;


import org.springframework.data.repository.CrudRepository;

public interface ToDoRepository extends CrudRepository<ToDo, UUID> {
    ToDo findById(String id);
    List<ToDo> findAll();
}
