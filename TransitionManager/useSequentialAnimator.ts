
import React from "react";
import { AnimationControls } from "framer-motion";
import { ChainedAnimation } from "./Transitions/types";
import { AnimationConfig } from "./typesAnimation";
import PageTransitionManager from "./sequentialAnimatiorManager";
import { useFirstTimeLoading } from "../src/lib/hooks";

/**
 *
 * @param controllers
 * @param custom
 * @param keyframes
 * @returns
 */
export function useAnimationController<Animation extends ChainedAnimation>({
  emitter,
  animation,
  controllers,
  animationDependencies,
}: AnimationConfig<Animation>) {
  
  const pageTransitionManager = React.useMemo(() => {
    return new PageTransitionManager({
      emitter,
      animation,
      controllers,
      animationDependencies,
    });
  }, []);

  const firstTimeLoading = useFirstTimeLoading();

  React.useEffect(() => {4 
    if (firstTimeLoading) return;
    pageTransitionManager.setAnimationDependencies(animationDependencies);
  }, [animationDependencies]);

  return [pageTransitionManager.activeControllers, pageTransitionManager] as const;
}
