package com.kentaromatt.todoapi;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ToDoRepositoryTests {

    @Autowired
    private ToDoRepository repository;

    @Test
    public void testFindByDescription() {
        repository.save(new ToDo("Walk dog"));

        List<ToDo> todos = repository.findByDescription("Walk dog");
        assertEquals(1, todos.size());
    }

    @Test
    public void testGetAllToDos() {
        repository.save(new ToDo("Feed dog"));
        repository.save(new ToDo("Walk dog"));
        repository.save(new ToDo("Feed cat"));

        List<ToDo> todos = repository.findAll();
        assertEquals(3, todos.size());
    }
}
