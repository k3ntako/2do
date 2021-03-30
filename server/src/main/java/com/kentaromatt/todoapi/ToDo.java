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

    @Override
    public String toString() {
        return String.format(
                "ToDo[id='%s', description='%s', isComplete='%s', dueDate='%s']",
                id, description, isComplete, dueDate);
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