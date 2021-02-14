import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Code from "./code"
import List from "./list"
import { TableOfContentsData } from "../table-of-contents"

const components = {
  ul: List,
  li: List.Item,
  code: Code,
}

type MDXProps = {
  children: string
  tableOfContents: TableOfContentsData
}

const MDX: React.FC<MDXProps> = ({ children, tableOfContents }) => (
  <MDXProvider components={components}>
    <MDXRenderer tableOfContents={tableOfContents}>{children}</MDXRenderer>
  </MDXProvider>
)

export default MDX
