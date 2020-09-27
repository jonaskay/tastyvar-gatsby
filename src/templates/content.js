import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from "../components/header"

const Content = ({ data }) => {
  const { content } = data

  return (
    <Layout>
      <SEO
        title={content.frontmatter.title}
        description={content.frontmatter.description}
      />
      <Header />
      <article>
        <header className="circuit-board border-b border-indigo-300">
          <div className="md:max-w-2xl mx-auto bg-indigo-100 md:border-r md:border-l border-indigo-300">
            <div className="max-w-2xl mx-auto pl-8 pr-6 py-4 sm:pl-10 sm:pr-8 sm:py-8">
              <h1 className="mb-4 text-2xl sm:text-5xl font-bold">
                {content.frontmatter.title}
              </h1>
              <div className="text-right">
                Updated {content.frontmatter.date}
              </div>
            </div>
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
    content: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        description
        date(formatString: "MMMM Do YYYY")
      }
    }
  }
`

export default Content
