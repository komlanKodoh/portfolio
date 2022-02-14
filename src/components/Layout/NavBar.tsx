import React, { useEffect, useState } from "react";
import * as styles from "./style.module.scss";
import { clamp } from "../../lib/utils";
import FadeIn from "../Effect/Fade";
import Burger from "../Icons/Burger";
import PageIcon from "../svg/PageIcon";
import {
  connect,
  MapStateToPropsFactory,
  useDispatch,
  useSelector,
} from "react-redux";
import { focusSection, sectionData } from "../../Redux/slices/section";
import { useAppSelector, useSectionIs, useSyncRef } from "../../lib/hooks";
import PageIconAnimated from "../svg/PageIconAnimated";
import CrossSectionLink from "../Basic/CrossSectionLink";
import { useRoutingStateContext } from "../../../TransitionManager/usePageTransition";

interface ComponentProps {
  Links: string[];
  href: string;
}

type Props = ComponentProps;

const NavBar = ({ Links, href }: Props) => {
  const sectionsData = useAppSelector((state) => state.sections.sectionsData);
  const sectionsDataRef = useSyncRef(sectionsData);

  const active = useAppSelector((state) => state.sections.active);
  const activeRef = useSyncRef(active);

  const [open, setOpen] = React.useState(false);
  const [shadow, setShadow] = useState(0);
  const dispatch = useDispatch();

  const old_scroll = React.useRef(0);

  const updateTheme = (scrollTop) => {
    let index = 0;
    let height_threshold = 0;

    if (scrollTop === 0) dispatch(focusSection(0));

    for (const section of sectionsDataRef.current) {
      const height = section?.height;
      
      if (!height) break;

      height_threshold += height;
      if (height_threshold > scrollTop) break;
      index++;
    }

    if (activeRef.current === index) return;

    dispatch(focusSection(index));
  };

  const onScroll = (e) => {
    const scrollTop = e.target.scrollTop;

    const threshold = 1000;

    const opacity = clamp(scrollTop / threshold, 0, 0.25);

    setShadow(opacity);
    updateTheme(scrollTop);

    old_scroll.current = scrollTop;
  };

  useEffect(() => {
    const root = document.getElementById("gatsby-focus-wrapper") as HTMLElement;

    root.addEventListener("scroll", onScroll);
    () => root.removeEventListener("scroll", onScroll);
  }, []);

  const currentSection = sectionsData[active] || ({} as sectionData);

  const page = useRoutingStateContext();

  const blogIsShown = useSectionIs("/blog", page.id);
  const blogPost = useSectionIs("/blog/H", page.id);

  const isBlog = React.useMemo(() => {
    return /.\/blog/.test(href);
  }, [href]);

  return (
    <>
      <nav
        className={`sticky top-0 w-full h-0 z-40 ${styles.ctn} ${
          styles[currentSection.theme]
        } ${currentSection.className}`}

        style={currentSection.styles}
      >
        <div
          className={`p-2  ${styles.nav}`}
          style={{
            boxShadow: `0 25px 50px -12px rgba(0,0,0, ${shadow})`,
          }}
        >
          <div
            className={`p-1 h-8 max-w-screen-lg m-auto rounded flex`}
            id="nav_header"
          >
            <div className="relative h-full">
              <FadeIn
                id="burger"
                visible={!blogIsShown}
                type="simple"
                className="h-full"
              >
                <Burger
                  state={open}
                  data-cy={"burger"}
                  classNameBar={styles.burger_bar}
                  className={"sm:hidden mr-auto"}
                  onClick={() => setOpen((prev) => !prev)}
                />
              </FadeIn>

              <FadeIn
                id="burger"
                visible={blogIsShown}
                type="simple"
                preserve={false}
              >
                <CrossSectionLink
                  to={`/blog`}
                  className={
                    " text-red-500 h-full block font-bold sm:hidden  absolute"
                  }
                >
                  {"BLOG"}
                </CrossSectionLink>
              </FadeIn>
            </div>

            <FadeIn
              id="overlay"
              visible={open}
              type={"from_big"}
              data-cy="overlay"
              className={`md:hidden fixed flex flex-col  top-0 left-0 w-full h-screen bg-opacity-98 z-10 ${styles.overlay}`}
            >
              <ul className="m-auto  text-center text-2xl pb-32">
                {Links.map((link, index) => (
                  <FadeIn
                    visible={open}
                    key={link}
                    id={link}
                    type="from_bottom"
                    delay={index / 10}
                  >
                    <li className={" py-4"}>
                      <a
                        href={`#${link}`}
                        className={"w-full h-full block"}
                        onClick={() => setOpen((prev) => !prev)}
                      >
                        {link}
                      </a>
                    </li>
                  </FadeIn>
                ))}

                <FadeIn
                  id="blog"
                  visible={open}
                  type="from_bottom"
                  delay={4 / 10}
                >
                  <li
                    className="  text-red-500"
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    <CrossSectionLink to={`/blog`} className={" h-full block"}>
                      {"Blog"}
                    </CrossSectionLink>
                  </li>
                </FadeIn>
              </ul>
            </FadeIn>


            <div className="flex align-center gap-6 -sm:ml-auto">
              
              <CrossSectionLink to="/#Home" className="sm:order-2">
                KODOH
              </CrossSectionLink>
              <PageIconAnimated className="sm:order-1" />

            </div>

            <ul className="hidden m-auto mr-16 gap-8 sm:flex text-sm justify-between">
              {Links.map((link, index) => (
                <FadeIn
                  key={link}
                  id={link + "big"}
                  visible={!isBlog}
                  type={"from_top"}
                  transition={{ delay: index / 10 }}
                >
                  <li key={link} className=" block px-4">
                    <a href={`#${link}`} className={"w-full h-full block"}>
                      {link}
                    </a>
                  </li>
                </FadeIn>
              ))}
              <li className="  text-red-500">
                <CrossSectionLink
                  to={`/blog`}
                  className={" h-full block font-bold"}
                >
                  {"BLOG"}
                </CrossSectionLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
