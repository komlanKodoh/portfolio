import { Processor } from "postcss";
import { ProcessedStyle, AnimationObject, ChainedAnimation } from "./types";

const logo: AnimationObject<
  ["sync", "middle"],
  { container: HTMLElement; backgroundLogo: ProcessedStyle }
> = {
  states: {
    sync: (dependencies) => {
      return dependencies.backgroundLogo;
    },
    middle: (dependencies) => {
      return {
        ...dependencies.backgroundLogo,
        scale: 5,
        rotate: "-35deg",
        transition: {},
      };
    },
  },
  meta: {
    directions: { 3: "middle" },
    defaultDirections: "sync",
    directives: {},
  },
};

const background: AnimationObject<
  ["middle", "sync"],
  { container: HTMLElement; backgroundLogo: ProcessedStyle }
> = {
  states: {
    sync: (dependencies) => {
      return dependencies.backgroundLogo;
    },
    middle: (dependencies) => {
      return dependencies.backgroundLogo;
    },
  },
  meta: {
    directions: [],
    defaultDirections: "sync",
  },
};

const backgroundLogo: AnimationObject<
  ["rest", "middle", "instantMiddle", "offsetTop", "bgFull"],
  { container: HTMLElement }
> = {
  states: {
    default: (dependencies) => {
      const parent = dependencies.container.getBoundingClientRect();

      return {
        top: 0,
        left: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        y: parent.top,
        x: parent.left,
        width: parent.width,
        borderRadius: "20%",
        // transition: {duration: 5},
        height: parent.height,
      };
    },
    rest: (dependencies) => {
      const parent = dependencies.container.getBoundingClientRect();
      return {
        x: parent.left,
        y: parent.top,
        scale: 1,
      };
    },
    offsetTop: {
      y: -+100,
      opacity: 1,
    },
    instantMiddle: (dependencies) => {
      const parent = dependencies.container.getBoundingClientRect();
      return {
        x: window.innerWidth / 2 - parent.width / 2,
        y: window.innerHeight / 2 - parent.height / 2,
        height: 0,
        width: 0,
        opacity: 1,
        scale: 5,
      };
    },
    middle: (dependencies) => {
      const parent = dependencies.container.getBoundingClientRect();
      return {
        x: window.innerWidth / 2 - parent.width / 2,
        y: window.innerHeight / 2 - parent.height / 2,
        opacity: 1,
        scale: 5,
        transition: {
          duration:0.5
        }
      };
    },
    bgFull: (dependencies) => {
      const parent = dependencies.container.getBoundingClientRect();
      return {
        x: window.innerWidth / 2 - parent.width / 2,
        y: window.innerHeight / 2 - parent.height / 2,
        opacity: 1,
        scale: 100,
        transition: { duration: 1 },
      };
    },
  },
  meta: {
    directions: ["offsetTop", "instantMiddle", "middle", "bgFull"],
    directives: {
      offsetTop_middle: {
        transition: { duration: 0 },
      },
      offsetTop_instantMiddle: {
        transition: { duration: 0 },
      },
    },
  },
};

const animation: ChainedAnimation<
  ["background", "logo"],
  { name: string; container: HTMLElement },
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
