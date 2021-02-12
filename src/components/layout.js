import React from "react"
import PropTypes from "prop-types"
import RSSLink from "./rss-link"

const Layout = ({ children }) => (
  <div className="flex flex-col justify-between min-h-screen sm:text-lg break-words">
    <main>{children}</main>
    <footer className="p-8 text-center text-base">
      <div className="mb-8">
        Subscribe by <RSSLink>RSS</RSSLink>
      </div>
      <div>© {new Date().getFullYear()}</div>
    </footer>
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
