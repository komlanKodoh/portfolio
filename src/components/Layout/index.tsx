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
import FadeIn from "../Effect/Fade";
import NavBar from "./NavBar";
import { any } from "prop-types";
import ReduxProvider from "../../Redux/ReduxProvider";
import { animationControls } from "framer-motion";
import {
  useAppDispatch,
  useAppSelector,
  useFirstTimeLoading,
} from "../../lib/hooks";
import { useRoutingStateContext } from "../../../TransitionManager/usePageTransitionManager";

export const Link_data = {};
export const Links = ["About", "Work", "Contact"];

export const NavContext = React.createContext<{ [key: string]: any }>({});

const Layout = ({ children, ...props }) => {

  const {activePage} = useRoutingStateContext();

  return (
    <>
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
      <NavBar Links={Links} href={props.location.href} />
      <main className=" leading-loose" data-cy="main">
        {activePage}
      </main>
      <footer className="bg-cover text-white">
        <p className="lm-size flex justify-center py-2 ">
          Copyright 2021, created by Daniel kodoh
        </p>
      </footer>
    </>
  );
};

export default Layout;
