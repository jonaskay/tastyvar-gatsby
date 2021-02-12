import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

type SiteData = {
  site: {
    siteMetadata: {
      author: string
      description: string
      image: string
      title: string
      url: string
    }
  }
}

type SEOProps = {
  description?: string
  image?: string
  lang?: string
  meta?: (
    | {
        name: string
        content: string
        property?: undefined
      }
    | {
        property: string
        content: string
        name?: undefined
      }
  )[]
  path?: string
  title?: string
  type?: string
}

type TestableSEOProps = SEOProps & { data: SiteData }

export const TestableSEO: React.FC<TestableSEOProps> = ({
  data,
  description,
  image,
  lang,
  meta,
  path,
  title,
  type = "website",
}) => {
  const {
    site: { siteMetadata },
  } = data

  const htmlLang = lang || "en"
  const metaDescription = description || siteMetadata.description
  const metaImage = `${siteMetadata.url}${image || siteMetadata.image}`
  const metaUrl = `${siteMetadata.url}${path || `/`}`
  const defaultTitle = siteMetadata.title

  return (
    <Helmet
      htmlAttributes={{
        lang: htmlLang,
      }}
      defaultTitle={defaultTitle}
      title={title}
      titleTemplate={`%s | ${defaultTitle}`}
      link={[{ rel: "canonical", href: metaUrl }]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `image`,
          content: metaImage,
        },
        {
          property: `og:title`,
          content: title || defaultTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: metaImage,
        },
        {
          property: `og:type`,
          content: type,
        },
        {
          property: `og:url`,
          content: metaUrl,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title || defaultTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: metaImage,
        },
      ].concat(meta || [])}
    />
  )
}

const SEO: React.FC<SEOProps> = props => {
  const data: SiteData = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            description
            image
            title
            url
          }
        }
      }
    `
  )

  return <TestableSEO data={data} {...props} />
}

export default SEO
