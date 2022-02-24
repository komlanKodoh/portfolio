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
      theme: "dark",
    },
    0
  );

  return (
    <div className=" pt-16 text-white  pb-5" >
      <div className=" max-w-4xl mx-auto px-2 sm:px-5">
        <h1 className="py-5 text-5xl leading-snug font-bold letter tracking-wide mb-8">
          {blogPost.title}{" "}
        </h1>
        {/* <GatsbyImage
          className="w-full mb-5"
          image={blogPost.thumbnail.gatsbyImageData}
          alt={"article background image"}
        /> */}
        <main
          className={`${styles.markdownBody} text-xl leading-10 `}
          dangerouslySetInnerHTML={{ __html: content }}
        ></main>

        <hr className="mt-12"></hr>
        <p  className="text-xl text-center font-extrabold"><br/>Thanks for reading this article</p>
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
          slug
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
