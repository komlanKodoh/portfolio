import { AnimationControls } from "framer-motion";
import { TargetWithKeyframes } from "framer-motion/types/types";
import PageTransitionManager, {
  TransitionManagerConfig,
} from "./PageTransitionManager";

export type AnimationStyles<TCustom> =
  | string
  | TargetWithKeyframes
  | ((custom: TCustom) => TargetWithKeyframes);

// Create a type from given keys + default , and specific types
export type Shape<T, TKeys extends (string | number | symbol)[]> = {
  [P in TKeys[number]]?: T;
} & {
  default?: T;
};

export type AssignTypesToKeys<T, Obj> = {
  [P in keyof Obj]?: T;
} & {
  default?: T;
};

/**
 *
 * @param controllers
 * @param custom
 * @param keyframes
 * @returns
 */
export function useAnimationController<
  TAnimationTargets extends Shape<AnimationControls, any[]>,
  TCustom
>({
  custom,
  emitter,
  keyframes,
  controllers,
}: TransitionManagerConfig<TAnimationTargets, TCustom>) {
  const pageTransitionManager = new PageTransitionManager({
    custom,
    emitter,
    keyframes,
    controllers,
  });

  return pageTransitionManager;
}
