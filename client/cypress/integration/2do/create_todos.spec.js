/// <reference types="cypress" />

describe("Listing todos on page load", () => {
  before(() => {
    cy.task("wipeTable", "to_do");
    cy.task("seedDatabase");
  });

  beforeEach(() => {
    cy.visit("/");
  });

  after(() => {
    cy.task("wipeTable", "to_do");
  });

  describe("user loads ", () => {
    it("should display create todo form", () => {
      cy.get("#create-todo-form h2").contains("Create a Todo");
    });
  });

  describe("user submits new todo", () => {
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

    it("should sort by date", () => {
      cy.get("#card-content")
        .find("p.description")
        .then((elements) => {
          const todoStrings = elements
            .map((_idx, elem) => elem.innerText)
            .toArray();

          const expectedOrder = [
            "File 2020 Taxes",
            "Go for a run",
            "Pick up dog",
            "Buy birthday gift",
            "Run Boston marathon",
            "Go to Pluto",
            "Buy groceries",
          ];

          expect(todoStrings).to.have.ordered.members(expectedOrder);
        });
    });
  });

  describe("user submits without description", () => {
    it("should display error", () => {
      cy.get('#create-todo-form input[type="date"][name="dueDate"]').type(
        "2024-04-15"
      );

      cy.get("#create-todo-form button").contains("Submit").click();

      cy.get(".error")
        .should("contain", "Something went wrong!", {
          matchCase: false,
        })
        .should("contain", "Description is required", {
          matchCase: false,
        });
    });
  });
});
