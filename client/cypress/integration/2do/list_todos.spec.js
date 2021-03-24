/// <reference types="cypress" />

describe("Homepage", () => {
  it("loads the todo list", () => {
    cy.visit("/");

    cy.get(".card-header h1").contains("to do", { matchCase: false });

    cy.get("#card-content")
      .children("div.todo-container")
      .should("have.length.above", 0);
  });

  context("click on a not completed todo checkbox", () => {
    it("should mark it as complete", () => {
      cy.visit("/");

      // Get todo
      cy.get("#card-content").find("div.todo-container").first().as("todo");

      // Make sure it's not completed
      cy.get("@todo").find("input").should("not.be.checked");

      // Click todo
      cy.get("@todo").click();

      // Make sure it's marked as completed
      cy.get("@todo").find("input").should("be.checked");
    });
  });

  context("click on a not completed todo checkbox", function () {
    it("should mark it as complete", () => {
      cy.visit("/");

      // Get first incomplete todo
      cy.get("#card-content")
        .find("div.todo-container.todo-container--complete")
        .first()
        .find("p.description")
        .first()
        .as("todoDescription");

      // Get todo
      cy.get("@todoDescription")
        .parents("div.todo-container")
        .first()
        .as("todo")
        .then(console.log);

      // Make sure it's completed
      cy.get("@todo").find("input").should("not.be.checked");

      // Click todo
      cy.get("@todo").click();

      // Make sure it's marked as incomplete
      cy.get("@todo").find("input").should("be.checked");
    });
  });

  // context("click on a completed todo checkbox", () => {
  //   it("should mark it as incomplete", () => {
  //     cy.visit("/");

  //     cy.get("#card-content")
  //       .find("div.todo-container")
  //       .last()
  //       .find("input")
  //       .should("be.checked");

  //     cy.get("#card-content").find("div.todo-container").first().click();

  //     cy.get("#card-content")
  //       .find("div.todo-container")
  //       .first()
  //       .find("input")
  //       .should("not.be.checked");
  //   });
  // });
});
