const MDX_SOURCE = "content"

const isSourceableMdxFile = (node, getNode) => {
  if (node.internal.type !== "Mdx") {
    return false
  }

  const file = getNode(node.parent)

  return file.sourceInstanceName === MDX_SOURCE
}

module.exports = {
  isSourceableMdxFile,
  MDX_SOURCE,
}
