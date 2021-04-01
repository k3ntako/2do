package com.kentaromatt.todoapi;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ToDoRepositoryTests {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ToDoRepository repository;

    @Test
    public void testGetAllToDos() {
        List<ToDo> todos = repository.findAll();
        int startingToDos = todos.size();
        entityManager.flush();
        entityManager.persist(new ToDo("Feed dog"));
        entityManager.persist(new ToDo("Walk dog"));
        entityManager.persist(new ToDo("Feed cat"));

        todos = repository.findAll();
        assertEquals(startingToDos + 3, todos.size());
    }

    @Test
    public void testGetToDoById() {
        ToDo todo = new ToDo("feed dog");
        entityManager.persist(todo);

        ToDo foundToDo = repository.findById(todo.getId()).get();
        
        assertEquals(todo.getId(), foundToDo.getId());
    }
}
