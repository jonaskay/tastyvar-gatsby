---
title: "Scalable content modeling for Contentful and Gatsby"
description: "Build a block-based content model for a website built with Gatsby and Contentful"
date: 2020-11-08
published: false
---

This guide is work-in-progress. I will be adding new chapters very soon.

- [Content modeling](#content-modeling)
- [The five types of content types](#the-five-types-of-content-types)
- [Migration scripts](#migration-scripts)
- [Block models](#block-models)
  - [Adding block-specific content types](#adding-block-specific-content-types)
  - [Adding the generic block content type](#adding-the-generic-block-content-type)
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

## Block models

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

## Next chapters

Thank you for reading so far! This guide is still work in progress and I'll be adding new chapters very soon.
