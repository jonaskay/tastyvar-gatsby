import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

type MDXProps = {
  children: string
}

const MDX: React.FC<MDXProps> = ({ children }) => (
  <MDXProvider>
    <MDXRenderer>{children}</MDXRenderer>
  </MDXProvider>
)

export default MDX
