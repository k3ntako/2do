/// <reference types="cypress" />

describe("API endpoint returns 404", function () {
  beforeEach(() => {
    cy.fixture("todo/GET-404").then((body) => {
      cy.intercept("GET", /api\/todos/, {
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
