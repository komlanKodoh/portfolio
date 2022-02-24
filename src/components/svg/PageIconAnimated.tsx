import { HTMLMotionProps, motion, useAnimation } from "framer-motion";
import React from "react";

import {
  useFirstTimeLoading,
  useForcedRender,
  useSyncRef,
} from "../../lib/hooks";

import PageIcon from "./PageIcon";
import { getMainSection, parseDimension } from "../../lib/utils";
import animation from "../../../TransitionManager/Transitions/FirstAnimation";
import { useAnimationSequence } from "../../../TransitionManager";
import { useRoutingStateContext } from "../../../TransitionManager/usePageTransition";

interface Props extends HTMLMotionProps<any> {
  textClass?: string;
}

const PageIconAnimated: React.FC<Props> = ({
  textClass,
  className,
  ...props
}) => {
  const ctnRef = React.useRef<HTMLDivElement>(null);

  const ctnBound = parseDimension(ctnRef?.current?.getBoundingClientRect());

  const background = useAnimation();
  const logo = useAnimation();

  const [controllers, { animate, isAnimatingRef, setAnimationIndex }] =
    useAnimationSequence({
      animation: animation,
      controllers: { logo, background },
      animationDependencies: {
        ctnRef: ctnRef,
      },
      emitter: (message: string, payload: any) => {
        console.log(message, )
        if (message === "swap") {
          page.removeHold("logoAnimation");
        }
      },
      directives: {
        max: 8
      }
    });

  const animateRef = useSyncRef(animate);

  const page = useRoutingStateContext();

  const forceRender = useForcedRender();

  React.useEffect(() => {

    page.addEventListener("onExit", (ctx) => {
      
      const subSection = ["", "blog"];

      const currentSection = getMainSection(ctx.pageId);
      const newSection = getMainSection(ctx.nextPageId);

      if (
        currentSection === null ||
        newSection === null ||
        currentSection === newSection 
      )
        return;

      if (
        subSection.includes(newSection) &&
        subSection.includes(currentSection)
      ) {

        page.waitFor("logoAnimation");

        setAnimationIndex(0);
        console.log("should have started animating")
        animateRef.current("forward");

      }
    });

    page.addEventListener("cancel", (ctx ) => {

      if (ctx.pageId === ctx.nextPageId) {
        animateRef.current("backward")
      }

    })

  }, []);

  return (
    <div
      className={`${className} h-full w-min`}
      ref={ctnRef}
      onClick={() => {
        animateRef.current("forward");
      }}
    >
      <PageIcon className={`${className} h-full opacity-0 w-6`} />

      <motion.div
        animate={controllers.logo}
        className={` fixed `}
        style={{
          zIndex: 2,
          top: 0,
          left: 0,
          width: ctnBound.w,
          height: ctnBound.h,
          borderRadius: "20%",
          y: -ctnBound.h / 2 + ctnBound.y,
          x: -ctnBound.w / 2 + ctnBound.x,
        }}
      >
        <svg
          className="z-10 transition-height inline-block h-full w-auto absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2"
          width="512"
          height="512"
          viewBox="-17 -80 200 400"
          fill="none"
        >
          <path
            d={`M163.885 250.395C163.885 250.395 163.619 250.395 163.088 250.395C154.985 250.395 148.21 246.542 142.763 238.838L88.5641 161.325C85.2431 156.543 80.7265 154.019 75.0143 153.753C69.435 153.62 64.7192 155.812 60.8668 160.329H60.4683V220.705C60.4683 228.941 57.5458 235.982 51.7008 241.827C45.8558 247.672 38.9481 250.528 30.9776 250.395H30.7784C22.5422 250.395 15.5017 247.539 9.65667 241.827C3.81168 235.982 0.889181 228.941 0.889181 220.705V30.2112C0.889181 22.2408 3.81168 15.333 9.65667 9.48803C15.5017 3.64304 22.5422 0.720541 30.7784 0.720541H30.9776C38.9481 0.720541 45.8558 3.64304 51.7008 9.48803C57.5458 15.333 60.4683 22.2408 60.4683 30.2112V73.4509C60.4683 77.3033 61.5974 79.5616 63.8557 80.2258C65.9812 81.0228 67.6417 80.5579 68.8373 78.8309L115.863 13.8718C120.778 6.29985 127.686 2.51389 136.586 2.51389H137.184C147.014 2.51389 154.187 6.83122 158.704 15.4659C163.221 24.1005 162.955 32.5359 157.907 40.772L129.213 86.8014C120.712 100.484 120.712 113.834 129.213 126.853L184.807 211.937C190.121 220.174 190.387 228.609 185.604 237.244C180.822 246.011 173.582 250.395 163.885 250.395Z`}
            fill="white"
          ></path>
        </svg>
      </motion.div>

      <motion.div
        animate={controllers.background}
        className={`${className} fixed z-0`}
        style={{
          backgroundColor: "#1F1C24",
          top: 0,
          left: 0,
          borderRadius: "20%",
          x: -ctnBound.w / 2 + ctnBound.x,
          y: -ctnBound.h / 2 + ctnBound.y,
          height: ctnBound.h,
          width: ctnBound.w,
        }}
        {...props}
      ></motion.div>
    </div>
  );
};

export default PageIconAnimated;
