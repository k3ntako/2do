package com.kentaromatt.todoapi;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    public @ResponseBody String updateToDo(@PathVariable String id, @RequestBody (required=false) CompletedReqBody completedReqBody) {
        ToDo todo = repository.findById(UUID.fromString(id)).get();
        todo.setIsComplete(completedReqBody.isComplete);
        repository.save(todo);

        return "{status: 'success'}";
    }

    static public class CompletedReqBody{
        private Boolean isComplete;

        public Boolean getIsComplete(){ return isComplete; }
        public void setIsComplete(Boolean isComplete){ this.isComplete = isComplete; }
    }
}
