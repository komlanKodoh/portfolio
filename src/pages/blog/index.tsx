import { motion } from "framer-motion";
import { graphql } from "gatsby";
import {
  GatsbyImage,
  StaticImage,
  withArtDirection,
} from "gatsby-plugin-image";
import React from "react";
import { Helmet } from "react-helmet";
import PostCard from "../../components/BuildingBlocks/Blog/PostCard";
import { useNavStyle } from "../../lib/hooks";

const getImage = (image) => {
  return image.edges[0].node.childImageSharp.gatsbyImageData;
};

const BlogHome = ({ data }) => {
  const blogPosts = data.blogPosts.nodes;

  useNavStyle(
    {
      theme: "black",
    },
    0
  );

  const images = withArtDirection(getImage(data.tallBg), [
    {
      media: "(min-width: 700px)",
      image: getImage(data.shortBg),
    },
  ]);
  return (
    <div className=" w-full  ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Komlan Kodoh | Blog </title>
        <meta
          name="keyword"
          content="portfolio, javascript, developer,react, web, blog, project, learn"
        />
        <meta
          name="description"
          content="Read tutorials, and discover interesting projects."
        />

        <meta
          property="og:title"
          content="Komlan Kodoh | Blog"
        />
        <meta
          property="og:description"
          content="Read tutorials, and discover interesting projects."
        />
        <meta
          property="og:image"
          content="https://komlankodoh.com/page_icon.png"
        />
        <meta property="og:url" content="https://komlankodoh.com" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Komlan Kodoh | Full Stack Web Developer"
        />
        <meta
          name="twitter:description"
          content="Read tutorials, and discover interesting projects."
        />
        <meta
          name="twitter:image"
          content="https://komlankodoh.com/page_icon.png"
        />

        <meta name="geo.region" content="US-NE" />
        <meta name="geo.placename" content="Omaha" />
        <meta name="geo.position" content="39.78373;-100.445882" />
        <meta name="ICBM" content="39.78373, -100.445882" />
      </Helmet>

      <div className="relative">
        <h2 className="center-absolute z-10 text-white font-bold text-center  p-5 bg-opacity-50 text-4xl -sm:text-lg w-fit font-mono">
          {"Welcome to my blog".split("").map((char, index) => (
            <motion.span whileHover="hover" key={index}>
              <motion.span
                variants={{ hover: { y: -10, color: "rgb(255,0,0)" } }}
                className="inline-block whitespace-pre"
              >
                {char}
              </motion.span>
            </motion.span>
          ))}
        </h2>
        <GatsbyImage
          className="max-h-[500px] "
          image={images}
          alt="blog background image"
        ></GatsbyImage>
      </div>

      <main className="lm-size grid place-items-center grid-cols-1 sm:grid-cols-2 py-16 ">
        {blogPosts.map((blogPost) => (
          <PostCard key={blogPost.id} {...blogPost}></PostCard>
        ))}
      </main>
    </div>
  );
};

BlogHome.getAnimation = () => {
  return ["hide", "offset", "rest"];
};

export default BlogHome;

export const pageQuery = graphql`
  query Project1 {
    tallBg: allFile(filter: { name: { eq: "blog" } }) {
      edges {
        node {
          id
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, sizes: "", quality: 50)
          }
        }
      }
    }

    shortBg: allFile(filter: { name: { eq: "blog" } }) {
      edges {
        node {
          id
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, quality: 100, aspectRatio: 2)
          }
        }
      }
    }

    blogPosts: allContentfulBlogPost(limit: 10) {
      nodes {
        id
        title
        slug
        createdAt
        extract
        thumbnail {
          gatsbyImageData(cropFocus: CENTER, layout: FULL_WIDTH)
        }
      }
    }
  }
`;
