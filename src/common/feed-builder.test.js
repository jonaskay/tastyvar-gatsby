const feedBuilder = require("./feed-builder")

describe("feedOptions", () => {
  it("returns the feed options when data is valid", () => {
    const data = {
      title: "foo",
      description: "bar",
      author: "baz",
      url: "qux",
    }

    expect(feedBuilder.feedOptions(data)).toEqual({
      title: "foo",
      description: "bar",
      author: "baz",
      site_url: "qux",
    })
  })

  it("throws an error when data is invalid", () => {
    const data = {
      title: undefined,
      description: undefined,
      author: undefined,
      url: undefined,
    }

    expect(() => feedBuilder.feedOptions(data)).toThrow("is required")
  })
})

describe("itemOptions", () => {
  const url = "1337"

  const data = {
    childMdx: {
      frontmatter: {
        title: "foo",
        description: "bar",
        date: "baz",
      },
      fields: {
        slug: "qux",
      },
      html: "lorem ipsum",
    },
  }

  it("returns the item options when site url and item data are valid", () => {
    expect(feedBuilder.itemOptions(url, data)).toEqual({
      url: "1337qux",
      guid: "1337qux",
      date: "baz",
      title: "foo",
      description: "bar",
      custom_elements: [{ "content:encoded": "lorem ipsum" }],
    })
  })

  it("throws an error when site url is empty", () => {
    expect(() => feedBuilder.itemOptions("", data)).toThrow(
      `"url" is not allowed to be empty`
    )
  })

  it("throws an error when item data is invalid", () => {
    expect(() => feedBuilder.itemOptions(url, { foo: "bar" })).toThrow(
      `"data.childMdx" is required`
    )
  })
})
