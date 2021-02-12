import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Code from "./code"

const components = {
  code: Code,
}

type MDXProps = {
  children: string
}

const MDX: React.FC<MDXProps> = ({ children }) => (
  <MDXProvider components={components}>
    <MDXRenderer>{children}</MDXRenderer>
  </MDXProvider>
)

export default MDX
