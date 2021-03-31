package com.kentaromatt.todoapi;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.databind.ObjectMapper;
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
import static org.junit.jupiter.api.Assertions.*;
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
        mvc.perform(MockMvcRequestBuilders.get("/api/todos"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testGetToDosReturnsListOfTodos() throws Exception {
        ToDo todo = new ToDo("walk dog");
        ToDo todo2 = new ToDo("pick up dog");
        List<ToDo> allToDos = Arrays.asList(todo, todo2);

        when(repository.findAll()).thenReturn(allToDos);

        repository.save(todo);
        mvc.perform(MockMvcRequestBuilders.get("/api/todos"))
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(2)));
    }

    @Test
    public void testGetToDosReturnsListOfTodosWithDescription() throws Exception {
        ToDo todo = new ToDo("walk dog");
        ToDo todo2 = new ToDo("pick up dog");
        List<ToDo> allToDos = Arrays.asList(todo, todo2);

        when(repository.findAll()).thenReturn(allToDos);

        repository.save(todo);
        mvc.perform(MockMvcRequestBuilders.get("/api/todos"))
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
        mvc.perform(MockMvcRequestBuilders.get("/api/todos"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0]", hasKey("isComplete")))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].isComplete", isA(Boolean.class)));
    }

    @Test
    public void testGetToDosReturnsListOfTodosWithDueDate() throws Exception {
        LocalDate date = LocalDate.of(2021, 11, 29);
        String dateStr = date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        ToDo todo = new ToDo("walk dog", date);
        ToDo todo2 = new ToDo("pick up dog", date);
        List<ToDo> allToDos = Arrays.asList(todo, todo2);

        when(repository.findAll()).thenReturn(allToDos);

        repository.save(todo);
        mvc.perform(MockMvcRequestBuilders.get("/api/todos"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0]", hasKey("dueDate")))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].dueDate", equalTo(dateStr)));
    }

    @Test
    public void testUpdateToDosReturnsJson() throws Exception {
        ToDo todo = new ToDo("Feed cat");
        repository.save(todo);
        UUID id = todo.getId();

        when(repository.findById(id)).thenReturn(java.util.Optional.of(todo));

        Object requestBodyObject = new Object() {
            public final Boolean isComplete = true;
        };
        ObjectMapper objectMapper = new ObjectMapper();
        String requestBodyJson = objectMapper.writeValueAsString(requestBodyObject);

        mvc.perform(
                MockMvcRequestBuilders.patch("/api/todo/{%s}", id.toString())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBodyJson)
        )
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasKey("status")))
                .andExpect(MockMvcResultMatchers.jsonPath("$.status", equalTo("success")));
    }

    @Test
    public void testUpdateToDosSetsIsCompleteToTrue() throws Exception {
        ToDo todo = new ToDo("Feed cat");
        repository.save(todo);

        // Make sure todo.getIsComplete is false by default
        assertFalse(todo.getIsComplete());

        UUID id = todo.getId();
        when(repository.findById(id)).thenReturn(java.util.Optional.of(todo));

        mvc.perform(MockMvcRequestBuilders.patch("/api/todo/{%s}", id.toString()));

        ToDo foundToDo = repository.findById(id).orElse(null);
        assertNotNull(foundToDo);
        assertTrue(foundToDo.getIsComplete());
    }

    @Test
    public void testUpdateToDosSetsIsCompleteToFalse() throws Exception {
        ToDo todo = new ToDo("Feed cat");
        todo.toggleIsComplete();
        repository.save(todo);

        // Make sure todo.getIsComplete is true by default
        assertTrue(todo.getIsComplete());

        UUID id = todo.getId();
        when(repository.findById(id)).thenReturn(java.util.Optional.of(todo));

        mvc.perform(MockMvcRequestBuilders.patch("/api/todo/{%s}", id.toString()));

        ToDo foundToDo = repository.findById(id).orElse(null);
        assertNotNull(foundToDo);
        assertFalse(foundToDo.getIsComplete());
    }
}
