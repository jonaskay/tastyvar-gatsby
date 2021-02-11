const Joi = require("joi")

const feedOptionsSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  url: Joi.string().required(),
  author: Joi.string().required(),
})

const itemOptionsSchema = Joi.object({
  url: Joi.string().required(),
  data: Joi.object({
    childMdx: Joi.object({
      html: Joi.string().required(),
      fields: Joi.object({
        slug: Joi.string().required(),
      }).required(),
      frontmatter: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        date: Joi.string().required(),
      }).required(),
    }).required(),
  }),
})

const feedOptions = data => {
  const { error } = feedOptionsSchema.validate(data)
  if (error) {
    throw error
  }

  const { title, description, author, url } = data

  return {
    title: title,
    description: description,
    author: author,
    site_url: url,
  }
}

const itemOptions = (url, data) => {
  const { error } = itemOptionsSchema.validate({ url, data })
  if (error) {
    throw error
  }

  const {
    childMdx: { html, frontmatter, fields },
  } = data

  const itemUrl = url + fields.slug

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    url: itemUrl,
    guid: itemUrl,
    date: frontmatter.date,
    custom_elements: [{ "content:encoded": html }],
  }
}

module.exports = {
  feedOptions,
  itemOptions,
}
