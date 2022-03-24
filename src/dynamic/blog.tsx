import * as React from "react";
import { Link, graphql } from "gatsby";
import * as styles from "./markdown.module.scss";
import { MDXProvider } from "@mdx-js/react";
import { useNavStyle } from "../lib/hooks";
import { Helmet } from "react-helmet";
import { MDXRenderer } from "gatsby-plugin-mdx";
import MarkdownResponsiveImage from "../components/Basic/MarkdownImage";

const UsingDSG = ({ data }) => {
  const blogPost = data.blogPosts.edges[0].node;

  const content = blogPost.content.childMdx.body;
  const thumbnail = blogPost.thumbnail.file.url;

  useNavStyle(
    {
      theme: "dark",
    },
    0
  );

  return (
    <div className=" pt-16 text-white  pb-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{blogPost.title} </title>
        <meta name="keyword" content={blogPost.headers.keywords} />
        <meta name="description" content={blogPost.extract} />

        <meta property="og:title" content={blogPost.title} />
        <meta property="og:description" content={blogPost.extract} />
        <meta property="og:image" content={thumbnail} />
        <meta property="og:url" content={thumbnail} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blogPost.title} />
        <meta name="twitter:description" content={blogPost.extract} />
        <meta name="twitter:image" content={thumbnail} />

        <meta name="geo.region" content="US-NE" />
        <meta name="geo.placename" content="Omaha" />
        <meta name="geo.position" content="39.78373;-100.445882" />
        <meta name="ICBM" content="39.78373, -100.445882" />
      </Helmet>

      <div className=" max-w-4xl mx-auto px-2 sm:px-5 text-gray-400">
        <h1 className=" text-4xl sm:py-5 sm:text-6xl text-gray-200 leading-relaxed font-bold tracking-wide  mb-8 px-2">
          {blogPost.title}
        </h1>

        <MDXProvider components={{ Link, MarkdownResponsiveImage}}>
          <main className={`${styles.markdownBody} text-xl leading-10 px-2 `}>
            <MDXRenderer>{content}</MDXRenderer>
          </main>
        </MDXProvider>

        <hr className="mt-12"></hr>

        <p className="text-xl text-white text-center font-extrabold">
          <br />
          Thanks you for reading 😁
        </p>
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
          extract
          headers {
            keywords
          }
          content {
            childMdx {
              body
            }
          }
          createdAt
          thumbnail {
            file {
              url
            }
          }
        }
      }
    }
  }
`;
