import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ArticleCard from "../components/article-card"

const IndexPage = ({ data }) => {
  const content = data.content.edges

  return (
    <Layout>
      <SEO title="Home" />
      <main>
        <header className="bg-gray-900 text-white">
          <div className="container mx-auto px-6 sm:px-8 lg:px-16 py-8">
            <h1 className="mb-2 text-4xl sm:text-5xl font-bold">
              <Link to="/">{data.site.siteMetadata.title}</Link>
            </h1>
            <div className="text-lg sm:text-xl">
              {data.site.siteMetadata.description}
            </div>
          </div>
        </header>
        <div className="container mx-auto px-6 sm:px-8 lg:px-16 py-8">
          <h2 className="mb-6 text-3xl font-bold">Guides</h2>
          <div className="sm:flex sm:-mx-2">
            {content.map(entry => {
              const { node } = entry

              return (
                <ArticleCard
                  to={node.fields.slug}
                  title={node.frontmatter.title}
                  date={node.frontmatter.date}
                  published={node.frontmatter.published}
                />
              )
            })}
          </div>
        </div>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query {
    site: site {
      siteMetadata {
        title
        description
      }
    }
    content: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            published
          }
        }
      }
    }
  }
`

export default IndexPage
