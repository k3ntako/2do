package com.kentaromatt.todoapi;

import java.util.List;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/api/")
public class ToDoController {
    
    @Autowired
    private ToDoRepository repository;

    @GetMapping(path = "/todos")
    public @ResponseBody List<ToDo> getAllTodos() {
        return repository.findAll();
    }

    @PostMapping(path = "/todos")
    public @ResponseBody String addToDo(@RequestParam String description, @RequestParam("dueDate") @DateTimeFormat(iso = ISO.DATE) LocalDate dueDate) {
        ToDo newToDo = new ToDo(description, dueDate);
        repository.save(newToDo);
        return "Created";
    }

    @PatchMapping(path = "/todo/{id}")
    public @ResponseBody String updateToDo(@PathVariable String id) {
        ToDo todo = repository.findById(Long.parseLong(id)).get();
        todo.toggleIsComplete();
        repository.save(todo);
        return "Updated";
    }
}
