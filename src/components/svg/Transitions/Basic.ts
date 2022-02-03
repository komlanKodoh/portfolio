import { AnimationStyles, Shape } from "./../useAnimationController";
import { TargetWithKeyframes } from "framer-motion/types/types";

type BasicCustom = {
  window: Window;
  ctn: DOMRect;
  default?: TargetWithKeyframes;
};



type BasicStyles = AnimationStyles<BasicCustom>;

const initial: BasicStyles = (custom) => {
  return {
    x: custom.ctn.x,
    y: custom.ctn.y,
    opacity: 1,
    scale: 1,
    rotate: 0,
    backgroundColor: "#1F1C24",
  };
};

const offset: BasicStyles = (custom) => ({
  opacity: 0,
  x: custom.ctn.x,
  y: -custom.ctn.y,
  scale: 1,
  backgroundColor: "#1F1C24",
});

const screenCenter: BasicStyles = (custom) => ({
  x: custom.window.innerWidth / 2 - custom.ctn.width / 2,
  y: custom.window.innerHeight / 2 - custom.ctn.height / 2,
  backgroundColor: "#1F1C24",
  opacity: 0,
  method: "set",
});

const centerShow: BasicStyles = (custom) => ({
  x: custom.window.innerWidth / 2 - custom.ctn.width / 2,
  y: custom.window.innerHeight / 2 - custom.ctn.height / 2,
  backgroundColor: "#1F1C24",
  scale: 5,
  method: "start",
  transition: { duration: 0.21 },
});

const centerSmall: BasicStyles = (custom) => ({
  x: custom.window.innerWidth / 2 - custom.ctn.width / 2,
  y: custom.window.innerHeight / 2 - custom.ctn.height / 2,
  backgroundColor: "#1F1C24",
  rotate: "-50deg",
  scale: 2,
  transition: {},
});

const bgFull_default: BasicStyles = (custom) => {
  const subSize =
    Math.max(custom.window.innerWidth, custom.window.innerHeight) * 1.5;

  return {
    x: custom.window.innerWidth / 2 - custom.ctn.width / 2,
    y: custom.window.innerHeight / 2 - custom.ctn.height / 2,
    transition: { duration: 2 },
    scale: subSize / custom.ctn.height,
    backgroundColor: "#0d0d0d",
    opacity: 1,
  };
};

const bgFull_logo: BasicStyles = (custom) => {
  const styles = { ...custom.default };
  styles.scale = 5;
  return styles;
};

const bgFull = {
  default: bgFull_default,
  logo: bgFull_logo,
};

const hide: BasicStyles = (custom) => {
  const common = bgFull_default(custom);
  common.opacity = 0;

  return common;
};

function asDefault<T>(obj: T) {
  return { default: obj };
}

type Transition = {
  keyframes: Shape<BasicStyles, ["logo", "bg"]>[];
  directives: { [key: number]: "start" | "set" };
};

const BasicTransition = {
  keyframes: [
    asDefault(initial),
    asDefault(offset),
    asDefault(screenCenter),
    asDefault(centerShow),
    asDefault(centerSmall),
    bgFull,
    asDefault("swap"),
    asDefault(hide),
    asDefault(offset),
    asDefault(initial),
  ],
  directives: {2: "set"}
};

export default BasicTransition;
