import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Article = ({ data }) => {
  const { headline, body, tags } = data.contentfulArticleBase
  return (
    <Layout>
      <SEO title={headline} />
      <div className="article">
        <h1>{headline}</h1>
        <div className="tags">
          {tags.map(tag => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <p className="body-text">{body.body}</p>
        <Link to="/">Back to Home</Link>
      </div>
    </Layout>
  )
}

export default Article

export const pageQuery = graphql`
  query($slug: String!) {
    contentfulArticleBase(slug: { eq: $slug }) {
      headline
      slug
      body {
        body
      }
      tags
    }
  }
`