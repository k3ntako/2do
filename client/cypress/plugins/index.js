const { Client } = require("pg");

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "todo_testing",
  password: "postgres",
  port: 5432,
});

client.connect();


module.exports = (on, config) => {
  on("task", {
    wipeTable: async (table) => {

      const query = `DELETE FROM ${table};`;
      return await client.query(query);
    },

    seedDatabase: async () => {


      const query = `INSERT INTO to_do (description, due_date)
      VALUES
        ('File 2020 Taxes', TO_DATE('04/04/2021', 'MM/DD/YYYY')),
        ('Pick up dog', TO_DATE('05/26/2021', 'MM/DD/YYYY')),
        ('Buy groceries', NULL),
        ('Buy birthday gift', TO_DATE('09/20/2021', 'MM/DD/YYYY')),
        ('Go for a run', TO_DATE('05/12/2021', 'MM/DD/YYYY')),
        ('Go to Pluto', TO_DATE('05/12/2060', 'MM/DD/YYYY'));`;
      return await client.query(query);
    },
  });
};
