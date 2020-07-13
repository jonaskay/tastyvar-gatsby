import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

const Content = ({ data }) => {
  const { site, content } = data

  return (
    <Layout>
      <header className="bg-gray-900 text-gray-100">
        <div className="max-w-screen-xl mx-auto pl-8 pr-6 sm:px-10 lg:px-16 py-2">
          <Link to="/" className="brand text-lg font-normal">
            {site.siteMetadata.title}
            <span />
          </Link>
        </div>
      </header>
      <article>
        <header className="circuit-board border-b border-indigo-300">
          <div className="md:max-w-2xl mx-auto bg-indigo-100 md:border-r md:border-l border-indigo-300">
            <h1 className="max-w-2xl mx-auto pl-8 pr-4 py-4 sm:pl-10 sm:pr-8 sm:py-8 text-2xl sm:text-5xl font-bold">
              {content.frontmatter.title}
            </h1>
          </div>
        </header>
        <div
          className="markdown pl-8 pr-6 py-4 sm:pl-10 sm:pr-8 sm:py-8 max-w-2xl mx-auto leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content.html }}
        />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    site: site {
      siteMetadata {
        title
      }
    }
    content: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`

export default Content
