const FilenameParser = require("./filename-parser")

const invalidFilenames = [
  "foo",
  "/foo",
  "foo/",
  "/foo/",
  "/42/",
  "/42-foo/",
  "foo/42-42-42-42/",
]

it("throws an error when filename is empty", () => {
  expect(() => new FilenameParser("")).toThrow("not allowed to be empty")
})

it("throws an error when filename doesn't match valid filename pattern", () => {
  invalidFilenames.forEach(filename => {
    expect(() => new FilenameParser(filename)).toThrow(
      "fails to match the required pattern"
    )
  })
})

describe("year", () => {
  it("returns the year when filename is valid", () => {
    expect(new FilenameParser("/1970-01-01-foo/").year()).toBe("1970")
    expect(new FilenameParser("/2020-12-31-foo-bar-baz/").year()).toBe("2020")
    expect(new FilenameParser("/42-1337-0-1/").year()).toBe("42")
    expect(new FilenameParser("/42-foo/1337-05-04-bar/").year()).toBe("1337")
  })
})

describe("month", () => {
  it("returns the month when filename is valid", () => {
    expect(new FilenameParser("/1970-01-01-foo/").month()).toBe("01")
    expect(new FilenameParser("/2020-12-31-foo-bar-baz/").month()).toBe("12")
    expect(new FilenameParser("/42-1337-0-1/").month()).toBe("1337")
    expect(new FilenameParser("/42-foo/1337-05-04-bar/").month()).toBe("05")
  })
})

describe("day", () => {
  it("returns the day when filename is valid", () => {
    expect(new FilenameParser("/1970-01-01-foo/").day()).toBe("01")
    expect(new FilenameParser("/2020-12-31-foo-bar-baz/").day()).toBe("31")
    expect(new FilenameParser("/42-1337-0-1/").day()).toBe("0")
    expect(new FilenameParser("/42-foo/1337-05-04-bar/").day()).toBe("04")
  })
})

describe("title", () => {
  it("returns the title when filename is valid", () => {
    expect(new FilenameParser("/1970-01-01-foo/").title()).toBe("foo")
    expect(new FilenameParser("/2020-12-31-foo-bar-baz/").title()).toBe(
      "foo-bar-baz"
    )
    expect(new FilenameParser("/42-1337-0-1/").title()).toBe("1")
    expect(new FilenameParser("/42-foo/1337-05-04-bar/").title()).toBe("bar")
  })
})
