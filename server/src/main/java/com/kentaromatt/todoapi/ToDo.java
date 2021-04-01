package com.kentaromatt.todoapi;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;
import java.util.UUID;

@Entity
public class ToDo {
    @Id
    private UUID id = UUID.randomUUID();
    private String description;
    private Boolean isComplete = false;
    private LocalDate dueDate;

    protected ToDo() {}

    public ToDo(String description) {
        this.description = description;
    }

    public ToDo(String description, LocalDate dueDate) {
        this.description = description;
        this.dueDate = dueDate;
    }

    public UUID getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public Boolean getIsComplete() {
        return isComplete;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }
}