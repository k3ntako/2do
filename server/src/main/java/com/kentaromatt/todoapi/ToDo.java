package com.kentaromatt.todoapi;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;
import java.util.UUID;

@Entity
public class ToDo {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private UUID id = UUID.randomUUID();
    private String description;
    private Boolean is_complete = false;
    private LocalDate due_date;
    private String user_name;

    protected ToDo() {}

    public ToDo(String description) {
        this.description = description;
    }

    public ToDo(String description, LocalDate due_date, String user_name) {
        this.description = description;
        this.due_date = due_date;
        this.user_name = user_name;
    }

    @Override
    public String toString() {
        return String.format(
                "ToDo[id='%s', description='%s', is_complete='%s', due_date='%s', user_name='%s']",
                id, description, is_complete, due_date, user_name);
    }

    public ToDo(String description, LocalDate dueDate) {
        this.description = description;
        this.is_complete = false;
        this.due_date = dueDate;
    }

    public UUID getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public Boolean getIsComplete() {
        return is_complete;
    }

    public LocalDate getDueDate() {
        return due_date;
    }

    public String getUserName() {
        return user_name;
    }
}