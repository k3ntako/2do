package com.kentaromatt.todoapi;
public class ToDo {

    private Long id;
    private String description;
    private Boolean isComplete;

    protected ToDo() {}
    public ToDo(String description) {
        this.description = description;
        this.isComplete = false;
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
}
