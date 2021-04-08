/// <reference types="cypress" />

describe("Listing todos on page load", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // TODO: Remove after frontend and backend are integrated
  beforeEach(() => {
    cy.fixture("todo/POST-200").then((body) => {
      cy.intercept("POST", /\/api\/todos/, {
        statusCode: 200,
        body,
      });
    });

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

      cy.get("#card-content")
        .contains("div.todo-container", "Run Boston marathon")
        .as("todo");
    });
  });
});
