package com.kentaromatt.todoapi;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/api/")
public class ToDoController {
    
    @Autowired
    private ToDoRepository repository;

    @GetMapping(path = "/todos")
    public @ResponseBody List<ToDo> getAllToDos() {
        return repository.findAll();
    }

    @PatchMapping(path = "/todo/{id}")
    public @ResponseBody String updateToDo(@PathVariable String id) {
        ToDo todo = repository.findById(UUID.fromString(id)).get();
        todo.toggleIsComplete();
        repository.save(todo);
        return "{status: 'success'}";
    }
}
