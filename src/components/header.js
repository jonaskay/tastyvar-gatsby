import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

const Header = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site: site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <header className="bg-gray-900 text-gray-100">
      <div className="max-w-screen-xl mx-auto pl-8 pr-6 sm:px-10 lg:px-16 py-2">
        <Link to="/" className="brand text-lg font-normal">
          {site.siteMetadata.title}
          <span />
        </Link>
      </div>
    </header>
  )
}

export default Header
