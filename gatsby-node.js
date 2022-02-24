exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query {
      blogPosts: allContentfulBlogPost {
        edges {
          node {
            id
            updatedAt
            slug
          }
        }
      }
    }
  `);

  const blogPosts = data.blogPosts.edges;

  const { createPage } = actions;

  blogPosts.forEach((blogPost) => {
    createPage({
      path: `/blog/${blogPost.node.slug}`,
      component: require.resolve("./src/dynamic/blog.tsx"),
      context: {
        id: blogPost.node.id,
      },
      defer: true,
    });
  });
};
