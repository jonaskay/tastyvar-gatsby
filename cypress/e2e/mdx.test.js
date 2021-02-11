/// <reference types="Cypress" />

describe("MDX tests", () => {
  context("when path is /rails-appengine", () => {
    beforeEach(() => {
      cy.visit("/rails-appengine")
    })

    it("has meta title", () => {
      cy.title().should(
        "equal",
        "Deploying a Ruby on Rails 6 application on Google App Engine Standard with Travis CI | tasty_var"
      )
    })

    it("renders mdx body", () => {
      cy.get("article").should(
        "contain",
        "This guide will walk you through how to deploy a Ruby on Rails 6 application with a PostgreSQL database on Google App Engine standard environment using a Travis CI pipeline."
      )
    })

    it("renders headings with links", () => {
      cy.get("h2")
        .contains("App Engine standard vs. flexible environment")
        .within(() => {
          cy.get("a").should(
            "have.attr",
            "href",
            "#app-engine-standard-vs-flexible-environment"
          )
        })
    })
  })

  context("when path is /gatsby-contentful-content-modeling", () => {
    beforeEach(() => {
      cy.visit("/gatsby-contentful-content-modeling")
    })

    it("has meta title", () => {
      cy.title().should(
        "equal",
        "Scalable content modeling for Contentful and Gatsby | tasty_var"
      )
    })

    it("renders mdx body", () => {
      cy.get("article").should(
        "contain",
        "This guide will tell you how to create a scalable and flexible content model with Contentful and Gatsby."
      )
    })

    it("renders headings with links", () => {
      it("renders headings with links", () => {
        cy.get("h2")
          .contains("The five categories of content types")
          .within(() => {
            cy.get("a").should(
              "have.attr",
              "href",
              "#the-five-categories-of-content-types"
            )
          })
      })
    })
  })
})
