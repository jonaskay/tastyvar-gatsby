import React from "react"
import { graphql, Link, PageProps } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ArticleCard from "../components/article-card"

type DataProps = {
  allFile: {
    edges: {
      node: {
        id: string
        childMdx: {
          fields: {
            slug: string
          }
          frontmatter: {
            date: string
            published: boolean
            title: string
          }
        }
      }
    }[]
  }
  site: {
    siteMetadata: {
      description: string
      title: string
    }
  }
}

const IndexPage: React.FC<PageProps<DataProps>> = ({ data }) => {
  const { title, description } = data.site.siteMetadata
  const guides = data.allFile.edges

  return (
    <Layout>
      <SEO title="Home" />
      <header className="bg-gray-900 text-white">
        <div className="container max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-16 py-8">
          <h1 className="my-4 text-4xl sm:text-5xl font-bold">
            <Link to="/">{title}</Link>
          </h1>
          <div className="text-lg sm:text-xl">{description}</div>
        </div>
      </header>
      <div className="container max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-16 py-8">
        <h2 className="mb-6 text-3xl font-bold">Guides</h2>
        <div className="sm:flex sm:-mx-2">
          {guides.map(guide => {
            const { node } = guide
            const { childMdx } = node

            return (
              <ArticleCard
                key={node.id}
                to={childMdx.fields.slug}
                title={childMdx.frontmatter.title}
                date={childMdx.frontmatter.date}
                published={childMdx.frontmatter.published}
              />
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile(
      filter: { sourceInstanceName: { eq: "content" } }
      sort: { fields: [name], order: DESC }
    ) {
      edges {
        node {
          id
          childMdx {
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMM Do YYYY")
              published
              title
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        description
        title
      }
    }
  }
`

export default IndexPage
