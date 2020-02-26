const path = require(`path`);
const slash = require(`slash`);
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  // we use the provided allContentfulBlogPost query to fetch the data from Contentful
  return graphql(
    `
      {
        allContentfulArticleBase {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `
  ).then(result => {
      if (result.errors) {
        console.log("Error retrieving contentful data",      result.errors);
      }
      // Resolve the paths to our template
      const blogPostTemplate = path.resolve("./src/templates/article.js");
      // Then for each result we create a page.
      result.data.allContentfulArticleBase.edges.forEach(edge => {
        createPage({
          path: `/article/${edge.node.slug}/`,
          component: slash(blogPostTemplate),
          context: {
	    	id: edge.node.id,
            slug: edge.node.slug
          }
        });
      });
    })
    .catch(error => {
      console.log("Error retrieving contentful data", error);
    });
};