package com.kentaromatt.todoapi;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.mockito.Mockito.any;

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
    public void testUpdateSetIncompleteToComplete() throws Exception {
        ToDo todo = new ToDo("Feed cat");
        repository.save(todo);

        // Make sure todo.getIsComplete is originally false
        assertFalse(todo.getIsComplete());

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
        );

        ToDo foundToDo = repository.findById(id).orElse(null);
        assertNotNull(foundToDo);
        assertTrue(foundToDo.getIsComplete());
    }

    @Test
    public void testUpdateSetsCompleteToIncomplete() throws Exception {
        ToDo todo = new ToDo("Feed cat");
        todo.setIsComplete(true);
        repository.save(todo);

        // Make sure todo.getIsComplete is originally true
        assertTrue(todo.getIsComplete());

        UUID id = todo.getId();
        when(repository.findById(id)).thenReturn(java.util.Optional.of(todo));

        Object requestBodyObject = new Object() {
            public final Boolean isComplete = false;
            public final String description = "Feed cat";
        };
        ObjectMapper objectMapper = new ObjectMapper();
        String requestBodyJson = objectMapper.writeValueAsString(requestBodyObject);

        mvc.perform(
                MockMvcRequestBuilders.patch("/api/todo/{%s}", id.toString())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBodyJson)
        );

        ToDo foundToDo = repository.findById(id).orElse(null);
        assertNotNull(foundToDo);
        assertFalse(foundToDo.getIsComplete());
    }

    @Test
    public void testUpdateSetsCompletedToCompleted() throws Exception {
        ToDo todo = new ToDo("Feed cat");
        todo.setIsComplete(true);
        repository.save(todo);

        // Make sure todo.getIsComplete is originally true
        assertTrue(todo.getIsComplete());

        UUID id = todo.getId();
        when(repository.findById(id)).thenReturn(java.util.Optional.of(todo));

        Object requestBodyObject = new Object() {
            public final Boolean isComplete = true;
            public final String description = "Feed cat";
        };
        ObjectMapper objectMapper = new ObjectMapper();
        String requestBodyJson = objectMapper.writeValueAsString(requestBodyObject);

        mvc.perform(
                MockMvcRequestBuilders.patch("/api/todo/{%s}", id.toString())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBodyJson)
        );

        ToDo foundToDo = repository.findById(id).orElse(null);
        assertNotNull(foundToDo);
        assertTrue(foundToDo.getIsComplete());
    }

    @Test
    public void testUpdateSetsIncompleteToIncomplete() throws Exception {
        ToDo todo = new ToDo("Feed cat");
        repository.save(todo);

        // Make sure todo.getIsComplete is originally false
        assertFalse(todo.getIsComplete());

        UUID id = todo.getId();
        when(repository.findById(id)).thenReturn(java.util.Optional.of(todo));

        Object requestBodyObject = new Object() {
            public final Boolean isComplete = false;
            public final String description = "Feed cat";
        };
        ObjectMapper objectMapper = new ObjectMapper();
        String requestBodyJson = objectMapper.writeValueAsString(requestBodyObject);

        mvc.perform(
                MockMvcRequestBuilders.patch("/api/todo/{%s}", id.toString())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBodyJson)
        );

        ToDo foundToDo = repository.findById(id).orElse(null);
        assertNotNull(foundToDo);
        assertFalse(foundToDo.getIsComplete());
    }

    @Test
    public void testToDoControllerAllowsCors() throws Exception {
        LocalDate date = LocalDate.of(2021, 11, 29);
        ToDo todo = new ToDo("walk dog", date);
        List<ToDo> allToDos = Arrays.asList(todo);

        when(repository.findAll()).thenReturn(allToDos);

        repository.save(todo);
        mvc.perform(MockMvcRequestBuilders.get("/api/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Access-Control-Request-Method", "GET")
                .header("Origin", "http://localhost:3000"))
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:3000"));
    }

    @Test
    public void testPostToToDosReturns200OnSuccess() throws Exception {
        Map<String, String> requestBodyObject = Map.of("description", "Feed cat", "dueDate", "2021-04-20");

        ObjectMapper objectMapper = new ObjectMapper();
        String requestBodyJson = objectMapper.writeValueAsString(requestBodyObject);
        
        mvc.perform(
            MockMvcRequestBuilders.post("/api/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyJson))
                    .andExpect(MockMvcResultMatchers.status().is2xxSuccessful());
    }

    @Test
    public void testPostToToDosReturnsJson() throws Exception {
        Map<String, String> requestBodyObject = Map.of("description", "Walk cat", "dueDate", "2021-04-20");
        ToDo todo = new ToDo("Walk cat", LocalDate.parse("2021-04-20"));

        ObjectMapper objectMapper = new ObjectMapper();
        String requestBodyJson = objectMapper.writeValueAsString(requestBodyObject);

        when(repository.save(any())).thenReturn(todo);
        
        mvc.perform(
            MockMvcRequestBuilders.post("/api/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyJson))
                    .andExpect(MockMvcResultMatchers.jsonPath("$.dueDate", equalTo("2021-04-20")))
                    .andExpect(MockMvcResultMatchers.jsonPath("$.description", equalTo("Walk cat")))
                    .andExpect(MockMvcResultMatchers.jsonPath("$.isComplete", equalTo(false)))
                    .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists());
    }

    @Test
    public void testPostToToDosReturns400IfMissingDescription() throws Exception {
        Map<String, String> requestBodyObject = Map.of("dueDate", "2021-04-20");

        ObjectMapper objectMapper = new ObjectMapper();
        String requestBodyJson = objectMapper.writeValueAsString(requestBodyObject);
        
        mvc.perform(
            MockMvcRequestBuilders.post("/api/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyJson))
                    .andExpect(MockMvcResultMatchers.status().is4xxClientError());
    }

    @Test
    public void testPostToToDosReturns400IfDescriptionIsEmptyString() throws Exception {
        Map<String, String> requestBodyObject = Map.of("description", "", "dueDate", "2021-04-20");

        ObjectMapper objectMapper = new ObjectMapper();
        String requestBodyJson = objectMapper.writeValueAsString(requestBodyObject);
        
        mvc.perform(
            MockMvcRequestBuilders.post("/api/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyJson))
                    .andExpect(MockMvcResultMatchers.status().is4xxClientError());
    }

    @Test
    public void testPostToToDosReturns400IfDescriptionIsNull() throws Exception {
        HashMap<String, String> requestBodyObject = new HashMap<>();
        requestBodyObject.put("description", null);
        requestBodyObject.put("dueDate", "2021-04-20");

        ObjectMapper objectMapper = new ObjectMapper();
        String requestBodyJson = objectMapper.writeValueAsString(requestBodyObject);
        
        mvc.perform(
            MockMvcRequestBuilders.post("/api/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyJson))
                    .andExpect(MockMvcResultMatchers.status().is4xxClientError());
    }

    @Test
    public void testPostToToDosReturns400IfDateIsWrongFormat() throws Exception {
        Map<String, String> requestBodyObject = Map.of("description", "Feed cat", "dueDate", "04-20-2021");

        ObjectMapper objectMapper = new ObjectMapper();
        String requestBodyJson = objectMapper.writeValueAsString(requestBodyObject);
        
        mvc.perform(
            MockMvcRequestBuilders.post("/api/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyJson))
                    .andExpect(MockMvcResultMatchers.status().is4xxClientError());
    }

    @Test
    public void testPostToToDosAcceptsBodyWithoutDate() throws Exception {
        Map<String, String> requestBodyObject = Map.of("description", "Feed cat");
        ToDo todo = new ToDo("Feed cat");

        ObjectMapper objectMapper = new ObjectMapper();
        String requestBodyJson = objectMapper.writeValueAsString(requestBodyObject);
        
        when(repository.save(any())).thenReturn(todo);

        mvc.perform(
            MockMvcRequestBuilders.post("/api/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyJson))
                    .andExpect(MockMvcResultMatchers.status().is2xxSuccessful())
                    .andExpect(MockMvcResultMatchers.jsonPath("$.description", equalTo("Feed cat")));
    }
}
