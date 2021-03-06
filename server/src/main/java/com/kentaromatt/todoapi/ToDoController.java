package com.kentaromatt.todoapi;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
    public @ResponseBody Map<String, String> updateToDo(@PathVariable String id, @RequestBody CompletedReqBody completedReqBody) {
        ToDo todo = repository.findById(UUID.fromString(id)).get();
        todo.setIsComplete(completedReqBody.isComplete);
        repository.save(todo);

        return new HashMap<>(){{
            put("status", "success");
        }};
    }

    @PostMapping(path = "/todos")
    public @ResponseBody ToDo addToDo(@RequestBody HashMap<String, String> requestMap) {
        if (!requestMap.containsKey("description") || requestMap.get("description") == null || requestMap.get("description").isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Description is required");
        }
        LocalDate dueDate = null;
        if (requestMap.containsKey("dueDate") && requestMap.get("dueDate") != "") {
            try {
                dueDate = LocalDate.parse(requestMap.get("dueDate"));
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "dueDate must be in format YYYY-MM-DD");
            }
        }
        String description = requestMap.get("description");
        ToDo newToDo = dueDate != null ? new ToDo(description, dueDate) : new ToDo(description);
        return repository.save(newToDo);
    }

    static private class CompletedReqBody{
        private Boolean isComplete;

        public Boolean getIsComplete(){ return isComplete; }
        public void setIsComplete(Boolean isComplete){ this.isComplete = isComplete; }
    }
}
