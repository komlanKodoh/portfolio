exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query {
      blogPosts: allContentfulBlogPost {
        edges {
          node {
            id
            updatedAt
            title
          }
        }
      }
    }
  `);

  const blogPosts = data.blogPosts.edges;

  const { createPage } = actions;

  blogPosts.forEach((blogPost) => {
    createPage({
      path: `/blog/${blogPost.node.title.replace(/ /g, "-")}`,
      component: require.resolve("./src/templates/blog.tsx"),
      context: {
        id: blogPost.node.id,
      },
      defer: true,
    });
  });
};
