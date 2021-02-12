import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Image, { FluidObject } from "gatsby-image"

type Data = {
  file: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
  site: {
    siteMetadata: {
      repository: string
    }
  }
}

type TestableGitHubLinkProps = { data: Data }

export const TestableGitHubLink: React.FC<TestableGitHubLinkProps> = ({
  data,
}) => {
  const {
    file: {
      childImageSharp: { fluid },
    },
    site: {
      siteMetadata: { repository },
    },
  } = data

  return (
    <a
      href={repository}
      aria-label="Visit the GitHub repository"
      className="inline-block"
    >
      <Image className="w-8" fluid={fluid} alt="GitHub repository" />
    </a>
  )
}

const GitHubLink: React.FC = () => {
  const data: Data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "github-icon.png" }) {
        childImageSharp {
          fluid(maxWidth: 32) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      site {
        siteMetadata {
          repository
        }
      }
    }
  `)

  return <TestableGitHubLink data={data} />
}

export default GitHubLink
