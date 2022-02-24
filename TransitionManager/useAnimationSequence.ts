import React from "react";
import { useRef, useState } from "react";
import {
  AnimationDependencies,
  AnimationObject,
  controllersReadyStyles,
  ProcessedStyle,
  RawStyle,
} from "./Transitions/types";
import { ChainedAnimation } from "./Transitions/types";
import { AnimationConfig } from "./typesAnimation";

/**
 * Class that controls and plan transitions created in framer motion
 */

export default function useAnimationSequence<
  Animation extends ChainedAnimation
>(config: AnimationConfig<Animation>) {
  const animationIndexRef = useRef(0);
  const directionRef = useRef<Direction>("forward");
  const hasAnimatedRef = useRef(true);
  const targetRef = useRef(0);
  const isAnimatingRef = useRef(false);

  React.useEffect(() => {
    const resizeListener = () => {
      setTimeout(() => {
        animate(null);
      }, 10);
    };
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  });

  function animate(direction: Direction, index?: number) {
    directionRef.current = direction;
    if (index) targetRef.current = index;

    if (!isAnimatingRef.current) {
      private_animate();
    }
  }

  /**
   * Animates animation objects in the given directions or to the specific state.
   *
   * @param direction direction in which to animate
   * @param state an optional state to animated to all animation object
   * @returns void
   */
  async function private_animate(state?: string) {
    console.log(animationIndexRef.current);
    let initialAnimationIndex = animationIndexRef.current;
    let animationIndex: number = initialAnimationIndex;

    if (directionRef.current !== null) {
      animationIndex =
        directionRef.current === "forward"
          ? animationIndexRef.current + 1
          : animationIndexRef.current - 1;
    }

    if (animationIndex < 0 || animationIndex > config.directives.max) {
      config.emitter("done");
      console.log(animationIndex);
      isAnimatingRef.current = false;
      return;
    }

    isAnimatingRef.current = true;
    hasAnimatedRef.current = false;

    const objects = config.animation.objects;
    const abstractObjects = config.animation.abstractObjects || {};

    let abstractStyles: { [key: string]: ProcessedStyle } =
      getObjectMappedStyles(abstractObjects, { animationIndex }, state);

    let controllersStyles: { [key: string]: ProcessedStyle } =
      getObjectMappedStyles(
        objects,
        { ...abstractStyles, animationIndex },
        state
      );

    await animateStyles(controllersStyles);

    // console.log("key frame end")
    // Checking if the animationIndex changed because I ran into a bug where
    // one could change the animation index to 0 between the beginning of the animation
    // and the time the keyframe is confirmed to be invalid. But that  would not trigger
    // an animation because the key frame failed, but since the animationIndex was changed
    // an animation should be always performed to reflect this change.

    if (initialAnimationIndex === animationIndexRef.current) {
      animationIndexRef.current = animationIndex;
    }

    private_animate();
  }

  /**
   * Compute the styles of an AnimationObject dictionary and gives the result as a dictionary of same keys.
   *
   * @param objects an dictionary with Animation object as key values
   * @param addOnsDependencies Dependencies not contained in the global dependency object. NOTE: The only option currently passed in that parameter are the abstract object styles;
   * @param state when provided, styles computation rely on state instead of current animationIndex.current
   * @returns Object with the same key as object dictionary and their corresponding mapped styles
   */
  function getObjectMappedStyles(
    objects: { [key: string]: AnimationObject },
    addOnsDependencies: AnimationDependencies,
    state?: string
  ) {
    const objectMappedStyles: { [key: string]: ProcessedStyle } = {};

    for (const objectName in objects) {
      const object = objects[objectName];

      const objectPreviousState = object.meta.previousState;
      const objectActiveState =
        state ||
        object.meta.directions[animationIndexRef.current] ||
        (object.meta.defaultDirections as string);

      // if (objectName === "backgroundLogo"){
      //   console.log(objectActiveState)
      // }

      // turning on the flag to allow next animation because a minimun of one object had animation to correspond to this key frames.
      if (object.meta.directions[animationIndexRef.current])
        hasAnimatedRef.current = true;
      let objetStyles = getStyles(
        object.states[objectActiveState],
        addOnsDependencies
      );

      // Directives of transition A_B or B_A are specific styles applied when
      // migrating from style A to style B or from style B to style A.
      const directives = object.meta.directives;
      let transitionDirectives: ProcessedStyle = {};

      if (objectPreviousState && directives) {
        const transitionId_1 = objectPreviousState + "_" + objectActiveState;
        const transitionId_2 = objectActiveState + "_" + objectPreviousState;
        const _transitionDirectives =
          directives[transitionId_1] || directives[transitionId_2];

        transitionDirectives = _transitionDirectives || {};
      }

      let defaultStyles: ProcessedStyle = { activeState: objectActiveState };

      if (object.states.default && objetStyles.applyDefault !== false) {
        defaultStyles = getStyles(object.states.default, addOnsDependencies);
      }

      objetStyles = {
        ...defaultStyles,
        ...objetStyles,
        ...transitionDirectives,
        activeState: objectActiveState,
      };

      objectMappedStyles[objectName] = objetStyles;
      object.meta.previousState = objectActiveState;
    }

    return objectMappedStyles;
  }

  const idRef = useRef(Math.floor(Math.random() * 1000));
  React.useEffect(() => {
    // console.log(config.animationDependencies, idRef.current );
  }, [config.animationDependencies]);

  /**
   * Create animation ready styles ProcessedStyle from raw styles ( animation getters).
   * NOTE: Returns the original styles if the style are already in a usable shape.
   *
   * @param rawStyle
   * @param addOnsDependencies Dependencies not contained in the global dependency object. NOTE: The only option currently passed in that parameter are the abstract object styles;
   * @returns ProcessedStyle which are keyframe usable with framer-motion controllers
   */
  function getStyles(
    rawStyle: RawStyle,
    addOnsDependencies: { [key: string]: any } = {}
  ) {
    let computedStyles: ProcessedStyle = {};

    if (typeof rawStyle === "function")
      computedStyles = rawStyle({
        ...config.animationDependencies,
        ...addOnsDependencies,
      });
    else computedStyles = rawStyle || {};

    if (computedStyles.notify)
      config.emitter(
        computedStyles.notify.message,
        computedStyles.notify.payload
      );

    return computedStyles;
  }

  /**
   * Perform async animation of Object mapped styles
   *
   * @param styles Object with instance controllers as keys and processed styles as value.
   */
  async function animateStyles(styles: controllersReadyStyles) {
    const animationPromises: Promise<void>[] = [];
    const controllers = config.controllers;

    const afterAnimationsNotifications: { message: string; payload?: any }[] =
      [];

    for (const controllerName in styles) {
      const controllerStyles = styles[controllerName];

      if (controllerStyles.transitionEnd?.notify) {
        afterAnimationsNotifications.push(
          controllerStyles.transitionEnd.notify
        );
      }

      animationPromises.push(
        controllers[controllerName]["start"](controllerStyles)
      );
    }

    await Promise.all(animationPromises);

    for (const notification of afterAnimationsNotifications) {
      config.emitter(notification.message, notification.payload);
    }
  }

  const setAnimationIndex = (index: number) => {
    animationIndexRef.current = index;
  };

  return [
    config.controllers,
    {
      animate,
      isAnimatingRef,
      setAnimationIndex,
    },
  ] as const;
}
