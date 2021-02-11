import React from "react"
import { graphql, PageProps } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from "../components/header"
import MDX from "../components/mdx"

type DataProps = {
  mdx: {
    body: string
    frontmatter: {
      date: string
      description: string
      title: string
    }
  }
}

const ContentTemplate: React.FC<PageProps<DataProps>> = ({ data }) => {
  const {
    mdx: {
      frontmatter: { title, description, date },
      body,
    },
  } = data

  return (
    <Layout>
      <SEO title={title} description={description} />
      <Header />
      <article>
        <header className="circuit-board border-b border-indigo-300">
          <div className="md:max-w-2xl mx-auto bg-indigo-100 md:border-r md:border-l border-indigo-300">
            <div className="max-w-2xl mx-auto pl-8 pr-6 py-4 sm:pl-10 sm:pr-8 sm:py-8">
              <h1 className="mb-4 text-2xl sm:text-5xl font-bold">{title}</h1>
              <div className="text-right">Updated {date}</div>
            </div>
          </div>
        </header>
        <div className="markdown pl-8 pr-6 py-4 sm:pl-10 sm:pr-8 sm:py-8 max-w-2xl mx-auto leading-relaxed">
          <MDX>{body}</MDX>
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        date(formatString: "MMMM Do YYYY")
        description
        title
      }
    }
  }
`

export default ContentTemplate
