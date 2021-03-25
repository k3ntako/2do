/// <reference types="cypress" />

describe("Listing todos on page load", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("user loads homepage", () => {
    it("should display a list of todos", () => {
      cy.get(".card-header h1").contains("to do", { matchCase: false });

      cy.get("#card-content")
        .children("div.todo-container")
        .should("have.length.above", 0);
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
  });
});
