package com.kentaromatt.todoapi;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

public class ToDoTests {
    @Test
    public void testToDoHasDescription() {
        ToDo todo = new ToDo("Walk dog");
        assertEquals("Walk dog", todo.getDescription());
    }
    
    public void testToDoHasID() {
        ToDo todo = new ToDo("Walk dog");
        assertNotNull(todo.getId());
    }

    public void testToDoHasIsComplete() {
        ToDo todo = new ToDo("Walk dog");
        assertNotNull(todo.getIsComplete());
    }

    public void testIsCompleteInitializesFalse() {
        ToDo todo = new ToDo("Walk dog");
        assertFalse(todo.getIsComplete());
    }
}
