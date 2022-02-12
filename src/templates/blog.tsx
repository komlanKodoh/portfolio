import * as React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

const UsingDSG = ({ data }) => {
  const blogPost = data.blogPosts.edges[0].node;

  const content = blogPost.content.content;

  return (
    <div className=" pt-8 mt-6">
      <div className=" max-w-4xl mx-auto px-2 sm:px-5 ">
        <h1 className="text-3xl font-serif my-8 text-gray-800">
          {blogPost.title}{" "}
        </h1>
        <GatsbyImage
          className="w-full"
          image={blogPost.thumbnail.gatsbyImageData}
          alt={"article background image"}
        />
        <main>{content}</main>
      </div>
    </div>
  );
};

export default UsingDSG;

export const query = graphql`
  query ($id: String) {
    blogPosts: allContentfulBlogPost(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          title
          content {
            content
          }
          createdAt
          thumbnail {
            gatsbyImageData(cropFocus: BOTTOM, layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`;
