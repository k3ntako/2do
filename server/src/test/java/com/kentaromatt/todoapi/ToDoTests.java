package com.kentaromatt.todoapi;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;

public class ToDoTests {
    @Test
    public void testToDoHasDescription() {
        ToDo todo = new ToDo("Walk dog");
        assertEquals("Walk dog", todo.getDescription());
    }

    @Test
    public void testToDoHasID() {
        ToDo todo = new ToDo("Walk dog");
        assertNotNull(todo.getId());
    }

    @Test
    public void testToDoHasIsComplete() {
        ToDo todo = new ToDo("Walk dog");
        assertNotNull(todo.getIsComplete());
    }

    @Test
    public void testIsCompleteInitializesFalse() {
        ToDo todo = new ToDo("Walk dog");
        assertFalse(todo.getIsComplete());
    }

    @Test
    public void testToDoCanHaveDueDate() {
        LocalDate date = LocalDate.now();
        ToDo todo = new ToDo("Walk dog", date);
        assertEquals(date, todo.getDueDate());
    }

    @Test
    public void testSetIsComplete() {
        ToDo todo = new ToDo("Feed cat");
        assertFalse(todo.getIsComplete());

        todo.setIsComplete(true);
        assertTrue(todo.getIsComplete());

        todo.setIsComplete(true);
        assertTrue(todo.getIsComplete());

        todo.setIsComplete(false);
        assertFalse(todo.getIsComplete());

        todo.setIsComplete(false);
        assertFalse(todo.getIsComplete());
    }

    @Test
    public void testToggleIsComplete() {
        ToDo todo = new ToDo("Feed cat");
        assertFalse(todo.getIsComplete());

        todo.toggleIsComplete();
        assertTrue(todo.getIsComplete());
    }
}
