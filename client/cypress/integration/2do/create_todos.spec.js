/// <reference types="cypress" />

describe("Listing todos on page load", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("user loads ", () => {
    it("should display create todo form", () => {
      cy.get("#create-todo-form h2").contains("Create a Todo");
    });
  });

  describe("user enters parameters for new todo", () => {
    it("should display a list of todos", () => {
      cy.get('#create-todo-form input[type="text"][name="description"]').type(
        "Run Boston marathon"
      );

      cy.get('#create-todo-form input[type="date"][name="dueDate"]').type(
        "2024-04-15"
      );

      cy.get("#create-todo-form button").contains("Submit").click();
    });
  });
});
