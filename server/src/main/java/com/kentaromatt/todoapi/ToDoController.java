package com.kentaromatt.todoapi;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/")
public class ToDoController {
    
    @Autowired
    private ToDoRepository repository;

    @GetMapping(path = "/todos")
    public @ResponseBody List<ToDo> getAllTodos() {
        return repository.findAll();
    }

    @PostMapping(path = "/todos")
    public @ResponseBody String addToDo(@RequestParam String description) {
        ToDo newToDo = new ToDo(description);
        repository.save(newToDo);
        return "Created";
    }
}
