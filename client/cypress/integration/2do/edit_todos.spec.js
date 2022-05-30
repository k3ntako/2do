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

  describe("user edits a todo", () => {
    it("should modify existing todo", () => {
      cy.contains(".todo-container", "File 2020 Taxes").within(() => {
        cy.get(".edit-button").first().should("contain.text", "Edit").click();
      });

      cy.get(".chakra-portal")
        .should("contain.text", "Edit To-do")
        .within(() => {
          cy.get('input[type="text"][name="description"]')
            .should("have.value", "File 2020 Taxes")
            .clear()
            .type("File 2021 Taxes");
          cy.get('input[type="date"][name="dueDate"]').type("2022-04-15");

          cy.contains("button", "Submit").click();
        });

      cy.get("body").should("not.contain.text", "File 2020 Taxes");
      cy.get("body").should("contain.text", "File 2021 Taxes");
    });

    it("should sort by date", () => {
      cy.get("#card-content")
        .find("p.description")
        .then((elements) => {
          const todoStrings = elements
            .map((_idx, elem) => elem.innerText)
            .toArray();

          const expectedOrder = [
            "Go for a run",
            "Pick up dog",
            "Buy birthday gift",
            "File 2021 Taxes",
            "Go to Pluto",
            "Buy groceries",
          ];

          expect(todoStrings).to.have.ordered.members(expectedOrder);
        });
    });
  });
});
