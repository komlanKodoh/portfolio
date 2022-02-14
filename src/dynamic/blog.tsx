import * as React from "react";
import { Link, graphql } from "gatsby";
import * as styles from "./markdown.module.scss";
import { GatsbyImage } from "gatsby-plugin-image";
import { useNavStyle } from "../lib/hooks";

const UsingDSG = ({ data }) => {
  const blogPost = data.blogPosts.edges[0].node;

  const content = blogPost.content.childMarkdownRemark.html;

  useNavStyle(
    {
      theme: "white",
    },
    0
  );

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
        <main
          className={`${styles.markdownBody} mb-5`}
          dangerouslySetInnerHTML={{ __html: content }}
        ></main>
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
            childMarkdownRemark {
              html
            }
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
