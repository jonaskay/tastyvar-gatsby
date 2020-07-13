const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const template = path.resolve(`./src/templates/content.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const content = result.data.allMarkdownRemark.edges

  content.forEach(entry => {
    createPage({
      path: entry.node.fields.slug,
      component: template,
      context: {
        slug: entry.node.fields.slug,
      },
    })
  })
}
