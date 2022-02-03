import {
  AnimationStyles,
  AssignTypesToKeys,
  Shape,
} from "./useAnimationController";
import { AnimationControls } from "framer-motion/types/animation/types";
import { useAppDispatch } from "../../lib/hooks";

type ObjectOfKeys<T> = { [key: string]: T };

export type TransitionManagerConfig<
  TAnimationTargets extends Shape<AnimationControls, any[]>,
  TCustom
> = {
  emitter: (arg: string) => void;
  controllers: TAnimationTargets;
  custom: AssignTypesToKeys<Omit<TCustom, "default">, TAnimationTargets>;
  keyframes: AssignTypesToKeys<AnimationStyles<TCustom>, TAnimationTargets>[];
};

export default class PageTransitionManager<
  T extends Shape<AnimationControls, any[]>,
  D extends Omit<object, "default">
> {
  custom: TransitionManagerConfig<T, D>["custom"];
  emitter: TransitionManagerConfig<T, D>["emitter"];
  keyframes: TransitionManagerConfig<T, D>["keyframes"];
  controllers: TransitionManagerConfig<T, D>["controllers"];

  direction: "forward" | "backward" | "still" = "still";

  constructor(config: TransitionManagerConfig<T, D>) {
    this.custom = config.custom;
    this.emitter = config.emitter;
    this.keyframes = config.keyframes;
    this.controllers = config.controllers;
  }
  setDirection(direction: "forward" | "backward") {
    this.direction = direction;
  }

  private async animate(direction?: typeof this.direction) {
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

    const currentKeyframes = this.keyframes[0];
    const currentCustom = this.custom.default;

    const defaultStyles = PageTransitionManager.getStyles(
      this.keyframes[0].default,
      this.custom.default
    );
  }

  public getStyles(
    styles: AnimationStyles<D>,
    custom: TransitionManagerConfig<T, D>["custom"][string]
  ) {
    if (typeof styles === "function") return styles(custom);
    else return styles;
  }
}
