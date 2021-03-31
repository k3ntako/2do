package com.kentaromatt.todoapi;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@WebMvcTest(ToDoController.class)
public class ToDoControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private ToDoRepository repository;
    
    @Test
    public void testGetToDosReturnsStatusOk() throws Exception {
 
        mvc.perform(MockMvcRequestBuilders.get("/api/todos").contentType(MediaType.APPLICATION_JSON)).andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testGetToDosReturnsListOfTodos() throws Exception {
        ToDo todo = new ToDo("walk dog");
        ToDo todo2 = new ToDo("pick up dog");
        List<ToDo> allToDos = Arrays.asList(todo, todo2);

        when(repository.findAll()).thenReturn(allToDos);

        repository.save(todo);
        mvc.perform(MockMvcRequestBuilders.get("/api/todos").contentType(MediaType.APPLICATION_JSON)).andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(2)));
    }

    @Test
    public void testGetToDosReturnsListOfTodosWithDescription() throws Exception {
        ToDo todo = new ToDo("walk dog");
        ToDo todo2 = new ToDo("pick up dog");
        List<ToDo> allToDos = Arrays.asList(todo, todo2);

        when(repository.findAll()).thenReturn(allToDos);

        repository.save(todo);
        mvc.perform(MockMvcRequestBuilders.get("/api/todos")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$[0].description", is(todo.getDescription())))
            .andExpect(MockMvcResultMatchers.jsonPath("$[1].description", is(todo2.getDescription())));
    }

    @Test
    public void testGetToDosReturnsListOfTodosWithIsCompleted() throws Exception {
        ToDo todo = new ToDo("walk dog");
        ToDo todo2 = new ToDo("pick up dog");
        List<ToDo> allToDos = Arrays.asList(todo, todo2);

        when(repository.findAll()).thenReturn(allToDos);

        repository.save(todo);
        mvc.perform(MockMvcRequestBuilders.get("/api/todos")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.jsonPath("$[0]", hasKey("isComplete")));
    }

    @Test
    public void testUpdateToDosTogglesIsComplete() throws Exception {
        ToDo todo = new ToDo("Feed cat");
        repository.save(todo);
        UUID id = todo.getId();

        when(repository.findById(id).get()).thenReturn(todo);

        mvc.perform(MockMvcRequestBuilders.patch("/api/todos/{%s}", id));
        
        ToDo foundToDo = repository.findById(id).get();
        assertTrue(foundToDo.getIsComplete());
    }
    
}
