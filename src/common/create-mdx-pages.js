const { MDX_SOURCE } = require("./sources")

const createMdxPages = async (component, actions, graphql, reporter) => {
  const { createPage } = actions

  const { data } = await graphql(
    `
      query($source: String!) {
        allFile(
          filter: { sourceInstanceName: { eq: $source } }
          sort: { fields: [name], order: ASC }
        ) {
          edges {
            node {
              childMdx {
                fields {
                  slug
                }
              }
            }
          }
        }
      }
    `,
    { source: MDX_SOURCE }
  )

  if (data.errors) {
    reporter.panicOnBuild(`Errors while loading MDX files`)
  }

  data.allFile.edges.forEach(edge => {
    const { node } = edge
    const { slug } = node.childMdx.fields

    createPage({
      path: slug,
      component,
      context: {
        slug: slug,
      },
    })
  })
}

module.exports = createMdxPages
