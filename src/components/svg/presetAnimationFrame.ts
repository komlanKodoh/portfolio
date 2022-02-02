import { TargetWithKeyframes } from "framer-motion/types/types";



export type AnimationController = (
  window: Window,
  ctn: DOMRect,
  custom: TargetWithKeyframes & {
    method?: "set" | "start";
    offset?: { x?: 0; y?: 0 };
  }
) => TargetWithKeyframes & { method: "set" | "start" };

export function createControllerOnContainer(
  offset = { x: 0, y: 0 },
  custom?: ReturnType<AnimationController>
): AnimationController {
  return (window, ctn) => ({
    x: ctn.x + offset.x,
    y: ctn.y + offset.y,
    method: "start",
    ...custom,
  });
}

export function createControllerScreenCenter(
  offset = { x: 0, y: 0 },
  custom?: ReturnType<AnimationController>
): AnimationController {
  return (window, ctn) => ({
    x: window.innerWidth / 2 - ctn.width / 2 + offset.x,
    y: window.innerHeight / 2 - ctn.height / 2 + offset.y,
    backgroundColor: "#1F1C24",
    method: "start",
    ...custom,
  });
}


const controllers = {

  const onParent: AnimationController = (window, ctn, custom) => ({
    x: ctn.x + (custom?.offset?.x || 0),
    y: ctn.y + (custom?.offset?.y || 0),
    method: "start",
    ...custom,
  });
  
  const screenCenter: AnimationController = (window, ctn, custom) => ({
    x: window.innerWidth / 2 - ctn.width / 2 + (custom?.offset?.x || 0),
    y: window.innerHeight / 2 - ctn.height / 2 + (custom?.offset?.y || 0),
    backgroundColor: "#1F1C24",
    method: "start",
    ...custom,
  });
}
  
  export type animationConfig = {
  controller: "string",

}


// const bgVariants: Variants = {
//     rest: (window, ctn) => {
//       if (!window || !ctn) return {};
//       const subSize = Math.max(window.innerWidth, window.innerHeight) * 1.5;

//       return {
//         x: ctn.x,
//         y: ctn.y,
//         opacity: 1,
//         scale: 1,
//         rotate: 0,
//         backgroundColor: "#1F1C24",
//       };
//     },
//     offset: (window, ctn) => {
//       if (!window || !ctn) return {};
//       const subSize = Math.max(window.innerWidth, window.innerHeight) * 1.5;

//       let offsetFactor = -2;

//       if (ctn.x > window.innerWidth / 2) offsetFactor = 2;
//       return {
//         opacity: 0,
//         x: ctn.x,
//         y: -ctn.y,
//         scale: 1,
//         backgroundColor: "#1F1C24",
//       };
//     },
//     center: (window, ctn) => {
//       return {
//         x: window.innerWidth / 2 - ctn.width / 2,
//         y: window.innerHeight / 2 - ctn.height / 2,
//         backgroundColor: "#1F1C24",
//         method: "set",
//       };
//     },
//     centerShow: (window, ctn) => {
//       return {
//         opacity: 1,
//         scale: 3,
//       };
//     },
//     centerSmall: (window, ctn) => {
//       return {
//         rotate: "-50deg",
//         scale: 2,
//         transition: {},
//       };
//     },
//     bgFull: (window, ctn) => {
//       if (!window || !ctn) return {};

//       const subSize = Math.max(window.innerWidth, window.innerHeight) * 1.5;

//       return {
//         transition: { duration: 2 },
//         scale: subSize / ctn.height,
//         backgroundColor: "#0d0d0d",
//         opacity: 1,
//       };
//     },
//     hide: (window, ctn) => {
//       if (!window || !ctn) return {};

//       const subSize = Math.max(window.innerWidth, window.innerHeight) * 1.5;

//       return {
//         transition: { duration: 2 },
//         scale: (subSize / ctn.height) * 2,
//         backgroundColor: "#0d0d0d",
//         opacity: 0,
//       };
//     },
//   };
