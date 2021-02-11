const path = require("path")

const { isSourceableMdxFile, MDX_SOURCE } = require("./src/common/sources")
const createMdxFields = require("./src/common/create-mdx-fields")
const createMdxPages = require("./src/common/create-mdx-pages")

exports.onCreateNode = ({ node, actions, getNode }) => {
  if (isSourceableMdxFile(node, getNode)) {
    createMdxFields(node, actions, getNode)
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  await createMdxPages(
    path.resolve(path.join(__dirname, "src", "templates", `${MDX_SOURCE}.tsx`)),
    actions,
    graphql,
    reporter
  )
}
