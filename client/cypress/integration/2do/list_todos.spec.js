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

  describe("user loads homepage", () => {
    it("should display a list of todos", () => {
      cy.get(".card-header h1").contains("to do", { matchCase: false });

      cy.get("#card-content")
        .children("div.todo-container")
        .should("have.length.above", 0);
    });

    it("should display due date", () => {
      cy.get("#card-content")
        .contains("div.todo-container", "Go to Pluto")
        .contains("05/12/2060");
    });

    it("should display due date and OVERDUE message", () => {
      cy.get("#card-content")
        .contains("div.todo-container", "File 2020 Taxes")
        .contains("04/04/2021");
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
            "Go to Pluto",
            "Buy groceries",
          ];

          expect(todoStrings).to.have.ordered.members(expectedOrder);
        });
    });
  });

  describe("user clicks on an incomplete todo checkbox", () => {
    it("should mark it as complete", () => {
      // Get first todo
      cy.get("#card-content").find("div.todo-container").first().as("todo");

      // Make sure it's not completed
      cy.get("@todo").find("input").should("not.be.checked");

      // Click todo
      cy.get("@todo").click();

      // Make sure it's marked as completed
      cy.get("@todo").find("input").should("be.checked");
    });

    it("should put completed todo at the end", () => {
      cy.get("#card-content")
        .find("p.description")
        .last()
        .then((lastTodo) => {
          expect(lastTodo.text()).to.equal("File 2020 Taxes");
        });
    });
  });

  describe("user clicks on a completed todo checkbox", function () {
    it("should mark it as complete", () => {
      // Get completed todo
      cy.get("#card-content")
        .contains("div.todo-container", "File 2020 Taxes")
        .as("todo");

      // Make sure it's completed
      cy.get("@todo").find("input").should("be.checked");

      // Click todo
      cy.get("@todo").click();

      // Make sure it's marked as incomplete
      cy.get("@todo").find("input").should("not.be.checked");
    });

    it("should re-sort incomplete todo by date", () => {
      cy.get("#card-content")
        .find("p.description")
        .first()
        .then((lastTodo) => {
          expect(lastTodo.text()).to.equal("File 2020 Taxes");
        });
    });
  });
});
