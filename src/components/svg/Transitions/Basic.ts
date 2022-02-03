import { TargetWithKeyframes } from "framer-motion/types/types";

type AnimationProps = TargetWithKeyframes & { method?: "start" | "set" };

type AnimationPropsBgAndLogo = { logo: AnimationProps; bg: AnimationProps };

type Variants =
  | ((window: Window, ctn: DOMRect) => AnimationPropsBgAndLogo)
  | AnimationPropsBgAndLogo;

const initial: Variants = (window, ctn) => {
  const common = {
    x: ctn.x,
    y: ctn.y,
    opacity: 1,
    scale: 1,
    rotate: 0,
    backgroundColor: "#1F1C24",
  };

  return { logo: common, bg: common };
};

const offset: Variants = (window, ctn) => {
  const common = {
    opacity: 0,
    x: ctn.x,
    y: -ctn.y,
    scale: 1,
    backgroundColor: "#1F1C24",
  };
  return { logo: common, bg: common };
};

const screenCenter: Variants = (window, ctn) => {
  const common = {
    x: window.innerWidth / 2 - ctn.width / 2,
    y: window.innerHeight / 2 - ctn.height / 2,
    backgroundColor: "#1F1C24",
    opacity: 0,
    method: "set",
  } as const;

  return { logo: common, bg: common };
};

const centerShow: Variants = (window, ctn) => {
  const common = {
    x: window.innerWidth / 2 - ctn.width / 2,
    y: window.innerHeight / 2 - ctn.height / 2,
    backgroundColor: "#1F1C24",
    scale: 5,
    method: "start",
    transition: {duration : 0.21}
    // method: "set",
  } as const;

  return { logo: common, bg: common };
};

const centerSmall: Variants = (window, ctn) => {
  const common = {
    x: window.innerWidth / 2 - ctn.width / 2,
    y: window.innerHeight / 2 - ctn.height / 2,
    backgroundColor: "#1F1C24",
    rotate: "-50deg",
    scale: 2,
    transition: {},
  };

  return { logo: {...common, rotate:"-70deg"}, bg: common };
};

const bgFull: Variants = (window, ctn) => {
  const subSize = Math.max(window.innerWidth, window.innerHeight) * 1.5;

  const common = {
    x: window.innerWidth / 2 - ctn.width / 2,
    y: window.innerHeight / 2 - ctn.height / 2,
    transition: { duration: 2 },
    scale: subSize / ctn.height,
    backgroundColor: "#0d0d0d",
    opacity: 1,
  };

  return { logo: {...common, scale: 6}, bg: common };
};

const hide: Variants = (window, ctn) => {
  const subSize = Math.max(window.innerWidth, window.innerHeight) * 1.5;
  const common = bgFull(window, ctn);
  common.logo.opacity = 0;
  common.bg.opacity = 0;

  return { logo: common.logo, bg: common.bg };
};

export default [
  initial,
  offset,
  screenCenter,
  centerShow,
  centerSmall,
  bgFull,
  "swap",
  hide,
  offset,
  initial
] as const;
