/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { Helmet } from "react-helmet";
import * as React from "react";
// import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby";
import "../../style/tailwind.css";
import Burger from "../Icons/Burger";
import FadeIn from "../Effect/FadeIn";
import { NavBar } from "./NavBar";
import { any } from "prop-types";

export const Link_data = {};
export const Links = ["About", "Contact", "Work"];

export const NavContext = React.createContext<{ [key: string]: any }>({});

const Layout = ({ children }) => {
  const sections = React.useRef([]);

  const [currentSectionIndex, setCurrentSectionIndex] = React.useState(0);

  return (
    <NavContext.Provider
      value={{ sections, currentSectionIndex, setCurrentSectionIndex }}
    >
      <Helmet
        htmlAttributes={{
          lang: "en",
        }}
      >
        <meta charSet="utf-8" />
        <title>Komlan Kodoh | Full Stack Web Developer</title>
        <meta
          name="keyword"
          content="portfolio, javascript, developer,react, web"
        />
        <meta
          name="description"
          content="A place on the web about my skills and my web development projects."
        />

        <meta
          property="og:title"
          content="Komlan Kodoh | Full Stack Web Developer"
        />
        <meta
          property="og:description"
          content="A place on the web about my skills and my web development projects."
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
          content="A place on the web about my skills and my web development projects."
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
      <NavBar Links={Links} data={Link_data} />
      <main className=" leading-loose" data-cy="main">
        {children}
      </main>
      <footer className="bg-green-600 text-white">
        <p className="lm-size flex justify-center py-2 ">
          Copyright 2021, created by Daniel kodoh
        </p>
      </footer>
    </NavContext.Provider>
  );
};

export const useNavContext = () => {
  return React.useContext(NavContext);
};
export default Layout;
