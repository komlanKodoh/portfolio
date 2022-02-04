import { animationControls } from "framer-motion";
import { TargetWithKeyframes } from "framer-motion/types/types";

import { AnimationControls } from "framer-motion/types/animation/types";
import { useAppDispatch } from "../../lib/hooks";
import { BasicStyles } from "./Transitions/Basic";
import {
  AnimationStyles,
  AssignTypesToKeys,
  TransitionManagerConfig,
} from "./transition";

type AnimationProcessedStyles<AnimationControllers> = {
  [K in keyof AnimationControllers]?: TargetWithKeyframes;
} & { default: TargetWithKeyframes };

export default class PageTransitionManager<
  AnimationControllers extends { [key: string]: AnimationControls },
  KeyframeDependencies extends {
    [K in keyof AnimationControllers]: Exclude<
      Keyframe[K],
      string | TargetWithKeyframes | undefined
    > extends (custom: infer KeyframeDependencies) => any
      ? KeyframeDependencies
      : null;
  },
  Keyframe extends AssignTypesToKeys<AnimationStyles<any>, AnimationControllers>
> {
  emitter: (message: string) => void;
  keyframes: Keyframe[];
  controllers: AnimationControllers;
  keyframeDependencies: KeyframeDependencies;

  animationIndex: number = 0;
  direction: "forward" | "backward" | "still" = "still";
  activeControllers: AssignTypesToKeys<AnimationControls, AnimationControllers>;

  constructor(
    config: TransitionManagerConfig<
      AnimationControllers,
      KeyframeDependencies,
      Keyframe
    >
  ) {
    this.emitter = config.emitter;
    this.keyframes = config.keyframes;
    this.controllers = config.controllers;
    this.activeControllers = config.controllers;
    this.keyframeDependencies = config.keyframeDependencies;

    console.log("Creattion of a new instance of the controller")
  }
  setDirection(direction: "forward" | "backward") {
    this.direction = direction;
  }

  syncActiveControllers(){
    this.activeControllers = {...this.activeControllers};
  }

  async animate(direction?: typeof this.direction) {
    this.syncActiveControllers();
    // console.log("I start the animation proccess")
    // console.log("animating", this.animationIndex, this.controllers)
    const reset = {
      top: 0,
      left: 0,
      height: null,
      width: null,

      x: null,
      y: null,
      rotate: 0,
      opacity: 1,
      backgroundColor: "#1F1C24",
      method: "start",
    } as const;

    const currentKeyframes = this.keyframes[this.animationIndex];
    if(!currentKeyframes) this.animationIndex = 0;

    let animationStyles: AnimationProcessedStyles<AnimationControllers> = {
      default: {},
    };

    if (currentKeyframes.default) {
      const temp = this.getStyles(
        currentKeyframes.default,
        this.keyframeDependencies.default
      );
      if (temp) animationStyles.default = temp;
    }

    for (const animationTarget of Object.keys(this.controllers)) {
      if (!currentKeyframes[animationTarget]) continue;

      let targetStyles = currentKeyframes[animationTarget];
      if (!targetStyles) continue;

      let targetDependencies = this.keyframeDependencies[animationTarget];

      let styles = this.getStyles(
        targetStyles,
        targetDependencies,
        animationStyles.default
      );
      if (!styles) continue;

      if(this.animationIndex === 5) return;

      //@ts-ignore
      animationStyles[animationTarget] = styles as TargetWithKeyframes;
    }

    const animationsPromises: Promise<void>[] = [];
    for (const controllerName in this.controllers) {
      // console.log(this.animationIndex, controllerName)
      const animationController = this.controllers[controllerName];
      const styles = animationStyles[controllerName];

      if (!styles) {
        // console.log("changing the active controller", controllerName)
        //@ts-ignore
        this.activeControllers[controllerName] = 2
        console.log(this.activeControllers)
        // this.controllers[controllerName].set(animationStyles.default);
        continue;
      };

      animationsPromises.push(animationController.start(styles));
    }

    // console.log("I started doing the animation")
    await Promise.all(animationsPromises);

    // console.log("done animating")
    this.animationIndex ++ ;
    // this.animate();

  }

  public getStyles<T>(
    animationStyles: AnimationStyles<T>,
    keyframeDependency: T,
    defaultStyles?: TargetWithKeyframes
  ) {
    if (typeof animationStyles === "function") {
      return animationStyles({ ...keyframeDependency, default: defaultStyles });
    } else if (typeof animationStyles === "string")
      return this.emitter(animationStyles);
    else return;
  }
}

type AnimationDependencies<T extends AnimationStyles<any>> = Parameters<
  Exclude<T, string | TargetWithKeyframes>
>;
