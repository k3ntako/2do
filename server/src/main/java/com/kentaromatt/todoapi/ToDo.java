package com.kentaromatt.todoapi;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ToDo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String description;
    private Boolean isComplete;
    private LocalDate dueDate;

    protected ToDo() {}
    public ToDo(String description) {
        this.description = description;
        this.isComplete = false;
    }

    public ToDo(String description, LocalDate dueDate) {
        this.description = description;
        this.isComplete = false;
        this.dueDate = dueDate;
    }

    public Long getId() {
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
