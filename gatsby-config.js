const { MDX_SOURCE } = require("./src/common/sources")
const feedBuilder = require("./src/common/feed-builder")
const routes = require("./src/common/routes")

module.exports = {
  siteMetadata: {
    title: `tasty_var`,
    description: `Developer blog by Joonas Kykkänen`,
    url: `https://www.tastyvar.com`,
    author: `@joonaskykkanen`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`postcss-import`)(),
          require(`tailwindcss`)(),
          require(`autoprefixer`)(),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                author
                description
                title
                url
              }
            }
          }
        `,
        setup: ({ query: { site } }) =>
          feedBuilder.feedOptions(site.siteMetadata),
        feeds: [
          {
            query: `
              {
                allFile(
                  filter: { sourceInstanceName: { eq: "${MDX_SOURCE}" } }
                  sort: { fields: [name], order: DESC }
                  limit: 10
                ) {
                  edges {
                    node {
                      childMdx {
                        fields {
                          slug
                        }
                        frontmatter {
                          date
                          description
                          title
                        }
                        html
                      }
                    }
                  }
                }
              }
            `,
            serialize: ({ query: { site, allFile } }) => {
              const { url } = site.siteMetadata

              return allFile.edges.map(({ node }) =>
                feedBuilder.itemOptions(url, node)
              )
            },
            output: routes.RSS,
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: MDX_SOURCE,
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" /></svg>`,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `tasty_var`,
        short_name: `tasty_var`,
        start_url: `/`,
        background_color: `#0F172A`,
        theme_color: `#0F172A`,
        display: `minimal-ui`,
        icon: `src/images/tastyvar-icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-135921529-3`,
        anonymize: true,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
