import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import List from "./list"
import Code from "./code"
import InlineCode from "./inline-code"
import { TableOfContentsData } from "../table-of-contents"

const components = {
  ul: List,
  li: List.Item,
  code: Code,
  inlineCode: InlineCode,
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
