/// <reference types="cypress" />

describe("Homepage", () => {
  it("loads the todo list", () => {
    cy.visit("/");

    cy.get(".card-header h1").contains("to do", { matchCase: false });

    cy.get("#card-content")
      .children("div.todo-container")
      .should("have.length.above", 0);
  });

  context("click on an incomplete todo checkbox", () => {
    it("should mark it as complete", () => {
      cy.visit("/");

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

  context("click on a completed todo checkbox", function () {
    it("should mark it as complete", () => {
      cy.visit("/");

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

  context("Todo API endpoint returns 404", function () {
    beforeEach(() => {
      cy.fixture("todo/GET-404").then((body) => {
        cy.intercept("GET", /\.mock.pstmn.io\/get/, {
          statusCode: 404,
          body,
        });
      });

      cy.visit("/");
    });

    it("should display error", () => {
      cy.get(".error").should("contain", "Something went wrong!", {
        matchCase: false,
      });
    });

    it("should not display todos", () => {
      cy.get("div.todo-container").should("not.exist");
    });
  });
});
