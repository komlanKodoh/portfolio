import { Helmet } from "react-helmet";
import * as React from "react";
import "../../style/tailwind.css";
import NavBar from "./NavBar";
import { usePageTransition } from "../../../TransitionManager";
import { motion } from "framer-motion";
import { useScrollBinding } from "../../lib/useScrollBinding";
import { useFirstTimeLoading, useIdSelector, useSyncRef } from "../../lib/hooks";

export const Links = ["About", "Work", "Contact"];

const Layout = ({ children, ...props }) => {
  const firstTimeLoading = useFirstTimeLoading();

  const { Provider, pageState, activePage } = usePageTransition(children);

  const container = useIdSelector("gatsby-focus-wrapper")

  const [isFaded, setIsFaded] = React.useState(false);

  const pageRef = React.useRef<HTMLDivElement>(null);

  const scrollBinder = useScrollBinding(container, pageState.id);

  React.useEffect(() => {
    pageState.addEventListener("onExit", (ctx) => {
      scrollBinder.takeSnapshot();

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
        <footer className="bg-[#0d0d0d] border-t border-zinc-800/80 text-zinc-400 py-12">
          <div className="max-w-screen-lg mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
            <div className="flex items-center gap-2 font-bold text-white tracking-wider">
              <span>DANIEL KODOH</span>
            </div>
            <p className="text-zinc-500 text-center">
              © {new Date().getFullYear()} Daniel Kodoh. Built with Gatsby & Tailwind CSS.
            </p>
            <div className="flex items-center gap-6">
              <a href="#Home" className="hover:text-white transition-colors">Home</a>
              <a href="#About" className="hover:text-white transition-colors">About</a>
              <a href="#Work" className="hover:text-white transition-colors">Work</a>
              <a href="#Contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </motion.div>
    </Provider>
  );
};

export default Layout;
