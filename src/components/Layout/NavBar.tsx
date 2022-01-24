import React, { useEffect, useState } from "react";
import * as styles from "./style.module.scss";
import { clamp } from "../../lib/utils";
import FadeIn from "../Effect/FadeIn";
import Burger from "../Icons/Burger";
import PageIcon from "../svg/PageIcon";
import { connect, MapStateToPropsFactory } from "react-redux";
import { focusSection, sectionData } from "../../Redux/slices/section";
import { useSyncRef } from "../../lib/hooks";

interface StateProps {
  active: number;
  sectionsData: sectionData[];
}

interface DispatchProps {
  focusSection: (activeSection: number) => void;
}

interface ComponentProps {
  Links: string[];
}

type Props = StateProps & DispatchProps & ComponentProps;

const NavBar = ({ Links, active, sectionsData , focusSection }: Props) => {

  const sectionsDataRef = useSyncRef(sectionsData);

  const [open, setOpen] = React.useState(false);
  const activeRef = useSyncRef(active);


  const [visible, setVisible] = useState(true);

  const [shadow, setShadow] = useState(0);
  const old_scroll = React.useRef(0);

  const getScrollSpeed = (current, previousScroll) => {
    if (current < 100) return setVisible(true);
    if (current - previousScroll < -10) {
      setVisible(true);
    } else if (current - previousScroll > 10) {
      setVisible(false);
    }
  };



  const updateTheme = (scrollTop) => {
    let index = 0;
    let height_threshold = 0;

    if (scrollTop === 0) return focusSection(0);

    for (const section of sectionsDataRef.current) {
      const height = section?.height || 0;
      height_threshold += height;
      if (height_threshold > scrollTop) break;
      index++;
    }
    
    if (activeRef.current === index) return;

    focusSection(index);
  };

  // const state = useSelector(state => state.sections)
  const onScroll = (e) => {
    const scrollTop = e.target.scrollTop;

    const threshold = 1000;

    const opacity = clamp(scrollTop / threshold, 0, 0.25);

    setShadow(opacity);
    getScrollSpeed(scrollTop, old_scroll.current);
    updateTheme(scrollTop);

    old_scroll.current = scrollTop;
  };

  useEffect(() => {
    const root = document.getElementById("gatsby-focus-wrapper") as HTMLElement;

    root.addEventListener("scroll", onScroll);
    () => root.removeEventListener("scroll", onScroll);
  }, []);

  const currentSection = sectionsData[active] || {} as sectionData;

  return (
    <>
      <nav
        className={`sticky top-0 z-40 ${styles.ctn} ${
          styles[currentSection.theme]
        }`}
      >
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-0 `}>
          <div
            className={`p-2  ${styles.nav} `}
            style={{
              boxShadow: `0 25px 50px -12px rgba(0,0,0, ${shadow})`,
              // transform: visible && "translateY(0%)" || "translateY(-150%)"
            }}
          >
            <div
              className={`p-1 h-8 max-w-screen-lg m-auto rounded flex`}
              id="nav_header"
            >
              <Burger
                state={open}
                data-cy={"burger"}
                classNameBar={styles.burger_bar}
                className={"sm:hidden mr-auto"}
                onClick={() => setOpen((prev) => !prev)}
              />

              <div className="flex align-center gap-6">
                <PageIcon className="inline-block h-full w-auto -sm:hidden " />
                <a href="/#Home">KODOH</a>
                <PageIcon className="inline-block h-full w-auto sm:hidden " />
              </div>

              <ul className="hidden m-auto mr-16 gap-16 sm:flex text-sm justify-between">
                {Links.map((link) => (
                  <li key={link} className=" block">
                    <a href={`#${link}`} className={"w-full h-full block"}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <FadeIn
          id="overlay"
          visible={open}
          type={"from_big"}
          data-cy="overlay"
          className={`md:hidden fixed flex flex-col  top-0 left-0 w-full h-screen bg-opacity-98 z-10 ${styles.overlay}`}
        >
          <div className="m-2 py-1 h-10 absolute">
            <Burger
              classNameBar={styles.burger_bar}
              className={"sm:hidden"}
              data-cy={"overlay_burger"}
              state={open}
              onClick={() => setOpen((prev) => !prev)}
            />
          </div>
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
          </ul>
        </FadeIn>
        
      </nav>
    </>
  );
};

const mapStateToProps = (state, ownProps: ComponentProps) => {
  return {
    sectionsData: state.sections.sectionsData,
    active: state.sections.active,
   };
};

const mapDispatchToProps = (dispatch, ownProps: ComponentProps) => {
  return {
    focusSection: (activeSection: number) =>{{
      dispatch(focusSection(activeSection))
    }
    }
  };
};

export default connect<StateProps, DispatchProps, ComponentProps>(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
