/// <reference types="Cypress" />

describe("Accessibility tests", () => {
  it("has no detectable accessibility violations on index page", () => {
    cy.visit("/").get("main").injectAxe()
    cy.checkA11y()
  })

  it("has no detectable accessibility violations on post pages", () => {
    cy.visit("/rails-appengine").get("main").injectAxe()
    cy.checkA11y()

    cy.visit("/gatsby-contentful-content-modeling").get("main").injectAxe()
    cy.checkA11y()
  })
})
