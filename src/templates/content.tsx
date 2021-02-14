import React from "react"
import { graphql, PageProps } from "gatsby"

import { TableOfContentsData } from "../components/table-of-contents"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from "../components/header"
import MDX from "../components/mdx/mdx"

type DataProps = {
  mdx: {
    body: string
    fields: {
      slug: string
    }
    frontmatter: {
      date: string
      description: string
      title: string
    }
    tableOfContents: TableOfContentsData
  }
}

const ContentTemplate: React.FC<PageProps<DataProps>> = ({ data }) => {
  const {
    mdx: {
      fields: { slug },
      frontmatter: { title, description, date },
      tableOfContents,
      body,
    },
  } = data

  return (
    <Layout>
      <SEO title={title} description={description} path={slug} type="article" />
      <Header />
      <article>
        <header className="circuit-board border-b border-blue-300">
          <div className="md:max-w-2xl mx-auto bg-blue-100 md:border-r md:border-l border-blue-300">
            <div className="max-w-2xl mx-auto pl-8 pr-6 py-4 sm:pl-10 sm:pr-8 sm:py-8">
              <h1 className="mb-4 text-2xl sm:text-5xl font-bold leading-normal sm:leading-normal">
                {title}
              </h1>
              <div className="text-right">Updated {date}</div>
            </div>
          </div>
        </header>
        <div className="markdown pl-8 pr-6 py-4 sm:pl-10 sm:pr-8 sm:py-8 max-w-2xl mx-auto leading-relaxed">
          <MDX tableOfContents={tableOfContents}>{body}</MDX>
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM Do YYYY")
        description
        title
      }
      tableOfContents
    }
  }
`

export default ContentTemplate
