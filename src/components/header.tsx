import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

type Data = {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const Header: React.FC = () => {
  const data: Data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const { title } = data.site.siteMetadata

  return (
    <header className="bg-gray-900 text-gray-100">
      <div className="max-w-screen-xl mx-auto pl-8 pr-6 sm:px-10 lg:px-16 py-2">
        <Link to="/" className="brand text-lg font-normal">
          {title}
          <span />
        </Link>
      </div>
    </header>
  )
}

export default Header
