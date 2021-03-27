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
@AutoConfigureTestDatabase
public class ToDoRepositoryTests {
    
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ToDoRepository repository;

    @Test
    public void testFindByDescription() {
        entityManager.persist(new ToDo("Walk dog"));
        
        List<ToDo> todos = repository.findByDescription("Walk dog");
        assertEquals(1, todos.size());

    }
}
