import { Helmet } from "react-helmet";
import * as React from "react";
import "../../style/tailwind.css";
import NavBar from "./NavBar";
import { usePageTransition } from "../../../TransitionManager";
import { motion } from "framer-motion";
import { getMainSection } from "../../lib/utils";
import { useScrollBinding } from "../../lib/useScrollBinding";
import { useFirstTimeLoading, useSyncRef } from "../../lib/hooks";

export const Links = ["About", "Work", "Contact"];

const Layout = ({ children, ...props }) => {
  const firstTimeLoading = useFirstTimeLoading();

  const { Provider, pageState, activePage } = usePageTransition(children);
  const container = React.useMemo(() => {
    return document.getElementById("gatsby-focus-wrapper");
  }, [firstTimeLoading]);


  const [isFaded, setIsFaded] = React.useState(false);

  const pageRef = React.useRef<HTMLDivElement>(null);

  const scrollBinder = useScrollBinding(container, pageState.id);

  React.useEffect(() => {
    pageState.addEventListener("onExit", (ctx) => {
      scrollBinder.takeSnapshot();

      const subSection = ["", "blog"];

      const currentSection = getMainSection(ctx.pageId) as string;
      const newSection = getMainSection(ctx.nextPageId) as string;

      if (
        subSection.includes(newSection) &&
        subSection.includes(currentSection) &&
        currentSection !== newSection
      )
        return;

      pageState.waitFor("generalFade");
      setIsFaded(true);
    });
  }, []);

  const state = (isFaded && "faded") || "rest";

  return (
    <Provider {...pageState}>
      <motion.div
        initial="rest"
        animate={state}
        onAnimationComplete={(anim) => {
          if (anim === "faded") {
            setIsFaded(false);
            pageState.removeHold("generalFade");
          }
        }}
        variants={{
          faded: { opacity: 0 },
          rest: { opacity: 1, y: 0, scale: 1 },
          enter: { opacity: 1, y: 0, scale: 1 },
        }}
        transition={{ easing: "anticipate", duration: 0.2 }}
        className="max-w-screen "
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

        <NavBar Links={Links} />

        <motion.div
          className="leading-loose min-h-screen  bg-main overflow-hidden"
          data-cy="main"
          ref={pageRef}
        >
          {activePage}
        </motion.div>
        <footer className="bg-neutral-800 text-white ">
          <p className="lm-size flex justify-center py-2 ">
            Copyright 2021, created by Daniel kodoh
          </p>
        </footer>
      </motion.div>
    </Provider>
  );
};

export default Layout;
