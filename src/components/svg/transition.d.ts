import { AnimationControls } from "framer-motion";
import { TargetWithKeyframes } from "framer-motion/types/types";

/**
 * Defines the type of the parameter use with use Transition hook and the pageTransition manager class;
 *
 * @param AnimationControllers The animation controllers passed to the function;
 * @param Keyframe One generic type of the Object passed to it as key frame animation
 */

// const exampleKeyframe = {
//     obj1: "string" | styles | function => styles,
//     obj2: "string" | styles | function => styles,
// }

export type TransitionManagerConfig<
  AnimationControllers,
  KeyframeDependencies,
  Keyframe
> = {
  emitter: (arg: string) => void;
  controllers: AnimationControllers;
  keyframes: Keyframe[];
  keyframeDependencies: KeyframeDependencies;
};

// Produces a type object with type T and the keys of the object passed to it + a default properties
export type AssignTypesToKeys<T, Obj> = {
  [P in keyof Obj]?: T;
} & {
  default?: T;
};

export type AnimationStyles<TDependencies> =
  | string
  | TargetWithKeyframes
  | ((custom: TDependencies) => TargetWithKeyframes);

// Create a type from given keys + default , and specific types
export type Shape<T, TKeys extends (string | number | symbol)[]> = {
  [P in TKeys[number]]?: T;
} & {
  default?: T;
};
