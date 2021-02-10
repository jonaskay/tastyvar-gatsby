import React from "react"
import PropTypes from "prop-types"

import "./layout.css"

const Layout = ({ children }) => (
  <div className="flex flex-col justify-between min-h-screen sm:text-lg break-words">
    <main>{children}</main>
    <footer className="p-8 text-center text-base">
      © {new Date().getFullYear()}
    </footer>
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
