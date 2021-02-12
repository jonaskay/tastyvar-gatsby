import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

type Data = {
  sitePlugin: {
    pluginOptions: {
      feeds: {
        output: string
      }[]
    }
  }
}

type TestableRSSLinkProps = {
  children: React.ReactNode
  data: Data
}

type RSSLinkProps = {
  children: React.ReactNode
}

export const TestableRSSLink: React.FC<TestableRSSLinkProps> = ({
  children,
  data,
}) => {
  const { feeds } = data.sitePlugin.pluginOptions
  const { output } = feeds[0]

  return (
    <Link className="text-blue-700 hover:underline" to={output}>
      {children}
    </Link>
  )
}

const RSSLink: React.FC<RSSLinkProps> = ({ children }) => {
  const data: Data = useStaticQuery(graphql`
    query {
      sitePlugin(name: { eq: "gatsby-plugin-feed" }) {
        pluginOptions {
          feeds {
            output
          }
        }
      }
    }
  `)

  return <TestableRSSLink data={data}>{children}</TestableRSSLink>
}

export default RSSLink
