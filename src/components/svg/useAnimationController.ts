import { AnimationControls } from "framer-motion";
import { TargetWithKeyframes } from "framer-motion/types/types";
import React from "react";
import { useFirstTimeLoading } from "../../lib/hooks";
import PageTransitionManager from "./PageTransitionManager";
import {
  AnimationStyles,
  AssignTypesToKeys,
  TransitionManagerConfig,
} from "./transition";

/**
 *
 * @param controllers
 * @param custom
 * @param keyframes
 * @returns
 */
export function useAnimationController<
  AnimationControllers extends { [key: string]: AnimationControls },
  KeyframeDependencies extends {
    [K in keyof AnimationControllers]: Exclude<
      Keyframe[K],
      string | TargetWithKeyframes | undefined
    > extends (custom: infer KeyframeDependencies) => any
      ? KeyframeDependencies
      : null;
  },
  Keyframe extends AssignTypesToKeys<
    AnimationStyles<any>,
    AnimationControllers
  >
>({
  emitter,
  keyframes,
  controllers,
  keyframeDependencies,
}: TransitionManagerConfig<
  AnimationControllers,
  KeyframeDependencies,
  Keyframe
>) {
  const pageTransitionManager = React.useMemo(() => new PageTransitionManager({
    emitter,
    keyframes,
    controllers,
    keyframeDependencies,
  }), [])

  const ftl = useFirstTimeLoading();

  const activeControllers = pageTransitionManager.activeControllers;

  React.useEffect(() => {
    if (ftl) return;
    
    console.log("Creation of the new interval")
    const interval = setInterval(() => {
      console.log(pageTransitionManager.activeControllers, "th")
    }, 5000)

    return () => clearInterval(interval)
  }, [])
  
  return [activeControllers, pageTransitionManager] as const;
}


