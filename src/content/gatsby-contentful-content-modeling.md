---
title: "Scalable content modeling for Contentful and Gatsby"
description: "Build a block-based content model for a website built with Gatsby and Contentful"
date: 2020-11-15
published: false
---

This guide is work-in-progress. I will be adding new chapters very soon.

- [Content modeling](#content-modeling)
- [The five types of content types](#the-five-types-of-content-types)
- [Migration scripts](#migration-scripts)
- [Block content types](#block-content-types)
  - [Adding block-specific content types](#adding-block-specific-content-types)
  - [Adding the generic block content type](#adding-the-generic-block-content-type)
- [Layout content types](#layout-content-types)
- [Page content types](#page-content-types)
  - [Adding a default page content type](#adding-a-default-page-content-type)
  - [Adding an article page content type](#adding-an-article-page-content-type)
- [Next chapters](#next-chapters)

## Content modeling

Contentful provides a flexible and loved headless content backend for many Gatsby applications. Getting started with Gatsby and Contentful is easy with the official `gatsby-source-contentful` plugin and editing content types and adding new content is a breeze using the Contentful web application. However, teams can also easily paint themselves into a corner when they create new content types without thinking about the overall architecture of their content model.

The purpose of this guide is to describe a way to model your content in a way that's scalable and allows content editors to not only add new blog posts but also build new landing pages without the help of developers. The architectural pattern that is presented here could be described as block-based design or block-based architecture.

Sidenote: I originally learned about blocks from a presentation given by one of Contentful's developers. Back then I had finished my first project with Contentful where we had applied a somewhat block-based architecture but lacked a proper term to describe what we were trying to achieve.

## The five types of content types

Your content types are all going to fall into the following five categories:

**Blocks**<br />
Blocks are the different headers, sections and other UI elements that content editors can add on layouts and pages.

**Layouts**<br />
The layout content type allows content editors to define the repeating elements of different pages (such as the navbar and footer). This is an optional layer of design since while many sites have multiple page types, they often have just one layout which means the repeating elements can be "hard coded" inside Gatsby.

**Pages**<br />
Each page type gets its own content type.

**Applications**<br />
Instead of multiple application content types, you are likely to have just one application content type and one entry where you hold all the general editable config of your site. Multi-site setups have multiple entries of the application content type but not multiple application content types (unless needed).

**Values**<br />
Value content types take a group of fields and extract them into a new concept. A typical value content type is an author with name and image that can be referred to inside a blog post entry.

## Migration scripts

In the next chapters I'll show you what these different content types look like in practice. Instead of using the web application to create the content types, I will use Contentful's migration scripts that can be run using the Contentful CLI.

You can apply the same changes using the web application but the migration files make it easier for me to describe the different types and fields in written form.

To read more about how to do migration scripting, see this [tutorial](https://www.contentful.com/developers/docs/tutorials/cli/scripting-migrations/).

## Block content types

If you create a separate block content type for each one of your page elements, you might run into your tier's content type limits. In addition to this, having tons of different block content types can make it difficult for content editors to remember what each content type does and teach others in their team how to manage the content.

One of the most effective ways of keeping the number of block content types under control is to identify which UI elements get constantly reused and refurbished with new content and which elements might get reused but don't necessarily see any changes in their content or other config.

An example of a UI element that get reused and refurbished often is a hero block that contains a heading and a background image. Each landing page usually has one but the text and image inside the heroes changes based on the purpose of the landing page.

An example of a UI element that might get added on every page, but doesn't change much in terms of its content, is a footer block. Footers aren't usually modified to fit specific pages but instead contain the same privacy policy links, copyright notices, and other "boring" stuff from one page to another.

What we want is to have a specific content type for hero blocks but a generic content type for footer blocks. Let's start with the migration script for our example hero block.

### Adding block-specific content types

To add a new content type to our content model, we create a new migration file. Contentful's migration files all export a function that takes a migration object as its parameter:

```
module.exports = function (migration) {}
```

We create a content type for the hero block with id set to `heroBlock`, name set to `Hero Block`, and display field (or entry title field) set to `name` field.

```
module.exports = function (migration) {
  const heroBlock = migration
    .createContentType("heroBlock")
    .name("Hero Block")
    .displayField("name")
}
```

It's good practice to give every content type a name field that allows content editors to name different blocks or pages in a way that makes it easy for them to find specific entries from a long list of content.

Let's add this name field:

```
module.exports = function (migration) {
  // ...

  const name = heroBlock.createField("name")
  name.name("Name").type("Symbol").required(true)
}
```

Finally, let's add fields for the hero heading and image:

```
module.exports = function (migration) {
  // ...

  const heading = heroBlock.createField("heading")
  heading.name("Heading").type("Symbol").required(true)

  const image = heroBlock.createField("image")
  image
    .name("Image")
    .type("Link")
    .linkType("Asset")
    .validations([{ linkMimetypeGroup: ["image"] }])
}
```

Our new content type is specific for hero blocks. It doesn't really work for our footer block. One option is to also create a specific content type for footers but as mentioned earlier, we want the footer block to be an entry instead of a content type.

### Adding the generic block content type

The generic block content type is a block that defines a React component that is used to render it. Because these blocks require the name of a React component, these blocks are added by developers and not content editors. In other words, a content editor can't add a new block of this type without the help of a developer.

However, as mentioned before, it's not likely that content editors need to add for example a second footer or a second navbar to the site. It's often enough that the blocks for the footer and navbar exist and that the content editors can add them to different layouts.

The generic block content type also still makes it possible for content editors to add a second footer without developers if they really need to. It's just not going to be as user-friendly as it is to add a second hero block.

Let's start building a new migration script for the generic block content type by creating the content type and adding a name field:

```
module.exports = function (migration) {
  const block = migration
    .createContentType("block")
    .name("Block")
    .displayField("name")

  const name = block.createField("name")
  name.name("Name").type("Symbol").required(true)
}
```

We add a field for the React component and include some validation logic to check that the field value is a valid React component name:

```
module.exports = function (migration) {
  // ...

  const component = block.createField("component")
  component
    .name("Component")
    .type("Symbol")
    .required(true)
    .validations([{ regexp: { pattern: "^[A-Z][a-zA-Z0-9]*$" } }])
}
```

Finally, we add a field for the component properties. These properties are saved as a JSON object.

```
module.exports = function (migration) {
  // ...

  const properties = block.createField("properties")
  properties.name("Properties").type("Object")
}
```

Component properties allow content editors to change things like copy or color theme. Editing JSON is not going to be as easy as editing content fields but the assumption is that editors rarely need to do this type of block manipulation.

Deciding which blocks get their own content type and which don't is always a balancing act between different usability concerns. Remember that having too many content types will also make your content model more confusing to use.

## Layout content types

We only need one content type to handle layouts in our project. We create a migration file that creates the content type and adds the `name` field to it:

```
module.exports = function (migration) {
  const layout = migration
    .createContentType("layout")
    .name("Layout")
    .displayField("name")

  const name = layout.createField("name")
  name
    .name("Name")
    .type("Symbol")
    .required(true)
}
```

Layouts contain blocks that are repeated from page to page. These blocks are placed before or after the actual content of a given page. We add separate fields for these before and after sections:

```
module.exports = function (migration, context) {
  // ...

  const before = layout.createField("before")
  before
    .name("Blocks added before page content")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["heroBlock", "block"] }],
    })

  const after = layout.createField("after")
  after
    .name("Blocks added after page content")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["heroBlock", "block"] }],
    })
}
```

Notice that we have to list the IDs of our block content types when defining the validation logic for both the `before` and `after` fields. By validating the content type of each linked item we can make sure that content editors are not able to add any other content besides blocks to these fields.

## Page content types

Each page content type could be thought of as a separate page template. In this guide, we will create one page content type for articles and one default page content type that can be used for things like the homepage and the about page.

### Adding a default page content type

Let's start with the default page content type. We create a migration that creates the content type and adds the `name` field to it:

```
module.exports = function (migration) {
  const page = migration
    .createContentType("page")
    .name("Page")
    .displayField("name")

  const name = page.createField("name")
  name
    .name("Name")
    .type("Symbol")
    .required(true)
}
```

Next, we create a field for the page slug (slug is a part of the URL path that is used to identify different pages from each other). We also change the appearance of this field to a slug field control:

```
module.exports = function (migration) {
  // ...

  const slug = page.createField("slug")
  slug
    .name("Slug")
    .type("Symbol")
    .required(true)
    .validations([{ unique: true }])
  page.changeFieldControl("slug", "builtin", "slugEditor")
}
```

We add a `layout` field to link each page to a specific layout:

```
module.exports = function (migration) {
  // ...

  const layout = page.createField("layout")
  layout
    .name("Layout")
    .type("Link")
    .linkType("Entry")
    .required(true)
    .validations([{ linkContentType: ["layout"] }])
}
```

Finally, we add a field for the actual content of the page which in our case consists of different blocks. As is the case with the layout content type, we have to make sure that content editors can only add blocks (and not other content) to the field by listing all the IDs of the available block content types inside our item validations:

```
module.exports = function (migration) {
  // ...

  const blocks = layout.createField("blocks")
  blocks
    .name("Blocks")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["heroBlock", "block"] }],
    })
}
```

### Adding an article page content type

We can add another page content type for article pages to demonstrate how we might structure other, more specific page content types.

We first create the content type itself and add the same `name`, `slug`, and `layout` fields that we added to the default page content type:

```
module.exports = function (migration) {
  const page = migration
    .createContentType("page")
    .name("Page")
    .displayField("name")

  const name = page.createField("name")
  name
    .name("Name")
    .type("Symbol")
    .required(true)

  const slug = page.createField("slug")
  slug
    .name("Slug")
    .type("Symbol")
    .required(true)
    .validations([{ unique: true }])
  page.changeFieldControl("slug", "builtin", "slugEditor")

  const layout = page.createField("layout")
  layout
    .name("Layout")
    .type("Link")
    .linkType("Entry")
    .required(true)
    .validations([{ linkContentType: ["layout"] }])
}
```

Instead of the `blocks` field, we want to add a rich text field  for the article content. This field will make it easier for content editors to create article pages that consist mainly of written text with different heading levels and paragraphs.

We can call this field `body`:

```
module.exports = function (migration) {
  // ...

  const body = page.createField("body")
  body.name("Body").type("RichText")
}
```

We still want to give editors the option to add blocks to specific article pages if they want to. To achieve this, we add `before` and `after` fields to the article page content type. Both of these fields are used to link specific blocks to the page. The `before` field is reserved for blocks that should be displayed before the body text and the `after` field for blocks that should be displayed after the body text:

```
module.exports = function (migration) {
  // ...

  const before = page.createField("before")
  before
    .name("Blocks added before body text")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["heroBlock", "block"] }],
    })

  const after = page.createField("after")
  after
    .name("Blocks added after body text")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["heroBlock", "block"] }],
    })
}
```

## Next chapters

Thank you for reading so far! This guide is still work in progress and I'll be adding new chapters very soon.
