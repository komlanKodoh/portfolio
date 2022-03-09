import { Processor } from "postcss";
import { ProcessedStyle, AnimationObject, ChainedAnimation } from "./types";

const logo: AnimationObject<
  ["sync"],
  { ctnRef: React.RefObject<HTMLDivElement>; backgroundLogo: ProcessedStyle }
> = {
  states: {
    sync: (dependencies) => {
      if (["bgFull", "hidden"].includes(dependencies.backgroundLogo.activeState || "") ) {
        return {
          ...dependencies.backgroundLogo,
          rotate: "-35deg",
          scale: undefined,
          transitionEnd: undefined
        };
      }
      return dependencies.backgroundLogo;
    },
  },
  meta: {
    directions: {},
    defaultDirections: "sync",
    directives: {},
  },
};

const background: AnimationObject<
  ["sync"],
  { backgroundLogo: ProcessedStyle }
> = {
  states: {
    sync: (dependencies) => {
      return dependencies.backgroundLogo;
    },
  },
  meta: {
    directions: [],
    defaultDirections: "sync",
  },
};

const backgroundLogo: AnimationObject<
  [
    "rest",
    "middle",
    "instantMiddle",
    "offsetTop",
    "bgFull",
    "hidden",
    "default"
  ],
  { ctnRef: React.RefObject<HTMLDivElement> }
> = {
  states: {
    default: (dependencies) => {
      const parent = dependencies.ctnRef.current?.getBoundingClientRect();
      if (!parent) return {};

      return {
        opacity: 1,
        scale: 1,
        rotate: 0,
        y: parent.top,
        x: parent.left,
        borderRadius: "20%",
        background: "#1F1C24",
      };
    },
    rest: (dependencies) => {
      const parent = dependencies.ctnRef.current?.getBoundingClientRect();
      if (!parent) return {};

      return {
        x: parent.left,
        y: parent.top,
        scale: 1,
      };
    },
    offsetTop: {
      y: -100,
      opacity: 0,
      scale: 1,
    },
    instantMiddle: (dependencies) => {
      const parent = dependencies.ctnRef.current?.getBoundingClientRect();
      if (!parent) return {};

      return {
        x: window.innerWidth / 2 - parent.width / 2,
        y: window.innerHeight / 2 - parent.height / 2,
        opacity: 1,
        scale: 0,
      };
    },
    middle: (dependencies) => {
      const parent = dependencies.ctnRef.current?.getBoundingClientRect();
      if (!parent) return {};

      return {
        x: window.innerWidth / 2 - parent.width / 2,
        y: window.innerHeight / 2 - parent.height / 2,
        opacity: 1,
        scale: 5,
        transition: {
          duration: 0.5,
        },

      };
    },
    bgFull: (dependencies) => {
      const parent = dependencies.ctnRef.current?.getBoundingClientRect();
      if (!parent) return {};

      const scale = Math.max(
        window.innerWidth / parent.width,
        window.innerHeight / parent.height
      );

      return {
        x: window.innerWidth / 2 - parent.width / 2,
        y: window.innerHeight / 2 - parent.height / 2,
        opacity: 1,
        scale: scale * 1.1,
        transitionEnd: {
          notify: { message: "swap" },
        },
        background: "#0d0d0d",
      };
    },
    hidden: (dependencies) => {
      const parent = dependencies.ctnRef.current?.getBoundingClientRect();
      if (!parent) return {};

      const scale = Math.max(
        window.innerWidth / parent.width,
        window.innerHeight / parent.height
      );

      return {
        opacity: 0,
        x: window.innerWidth / 2 - parent.width / 2,
        y: window.innerHeight / 2 - parent.height / 2,
        scale: scale * 1.1,
        applyDefault: false
      };
    },
  },
  meta: {
    directions: [
      "default",
      "offsetTop",
      "instantMiddle",
      "middle",
      "bgFull",
      "hidden",
      "offsetTop",
      "default",
    ],
    directives: {
      offsetTop_instantMiddle: {
        transition: { duration: 0 },
      },
      offsetTop_default: {
        transition: { duration: 0.3}
      }
    },
  },
};

const animation: ChainedAnimation<
  ["background", "logo"],
  { ctnRef: React.RefObject<HTMLDivElement> },
  ["backgroundLogo"]
> = {
  abstractObjects: {
    backgroundLogo,
  },
  objects: {
    background,
    logo,
  },
};

export default animation;
