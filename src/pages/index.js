import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.css"

const IndexPage = ({ data }) => {
  const articles = data.allContentfulArticleBase.edges
  return (
    <Layout>
      <SEO title="Home" keywords={[`foxglove`, 'content']} />
      <h1>{"All Articles"}</h1>
      <div className="articles">
        {articles.map(({ node: article }) => (
          <div key={article.id}>
            <Link to={`/article/${article.slug}`}>{article.headline}</Link>
          </div>
        ))}
        <span className="mgBtm__24" />
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query BlogPostsPageQuery {
      allContentfulArticleBase(limit: 1000) {
        edges {
          node {
            id
            headline
            slug
            body {
              body
            }
            tags
          }
        }
      }
    }
`