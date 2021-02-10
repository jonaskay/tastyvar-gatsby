import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from "../components/header"

const NotFound = () => (
  <Layout>
    <SEO title="404" />
    <Header />
    <main className="container mx-auto px-4 sm:px-8 lg:px-16 py-8 text-center">
      <h1 className="mb-2 text-4xl sm:text-5xl font-bold">404</h1>
      <p className="mb-16 text-xl sm:text-2xl">That page does not exist :(</p>
      <p className="text-lg sm:text-xl">
        Find available content{" "}
        <Link to="/" className="text-blue-700 hover:underline">
          here
        </Link>
        .
      </p>
    </main>
  </Layout>
)

export default NotFound
