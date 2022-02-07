import {
  AnimationDependencies,
  AnimationObject,
  controllersReadyStyles,
  ProcessedStyle,
  RawStyle,
} from "./Transitions/types";
import { ChainedAnimation } from "./Transitions/types";
import { AnimationConfig } from "./typesAnimation";

const BEHAVIOR_MAP = {
  jump: "set",
  continuous: "start",
};

/**
 * Class that controlls and plan transitions created in framer motion
 */
export default class PageTransitionManager<Animation extends ChainedAnimation> {
  emitter: AnimationConfig<Animation>["emitter"];
  animation: AnimationConfig<Animation>["animation"];
  controllers: AnimationConfig<Animation>["controllers"];
  animationDependencies: AnimationConfig<Animation>["animationDependencies"];

  animationIndex: number = 0;
  direction: "forward" | "backward" | "still" = "forward";
  activeControllers: AnimationConfig<Animation>["controllers"];

  currentCache: { defaultStyles: { [key: string]: ProcessedStyle } } = {
    defaultStyles: {},
  };

  constructor(config: AnimationConfig<Animation>) {
    this.emitter = config.emitter;
    this.animation = config.animation;
    this.controllers = config.controllers;
    this.activeControllers = config.controllers;
    this.animationDependencies = config.animationDependencies;

    // this.animate("still");

    // redo any animation if windows resizes;
    //TODO optimize so it does not run on every resize event but after a time threshold
    const resizeCallback = this.animate.bind(this);
    window.addEventListener("resize", () => resizeCallback);
  }

  setDirection(direction: "forward" | "backward") {
    this.direction = direction;
  }

  /**
   * Animates animation objects in the given directions or to the specific state.
   *
   * @param direction direction in which to animate
   * @param state an optional state to animated to all animation object
   * @returns void
   */
  async animate(direction?: typeof this.direction, state?: string) {
    console.log("Animating ");
    const animationIndex = this.animationIndex;

    const objects = this.animation.objects;
    const abstractObjects = this.animation.abstractObjects || {};

    let abstractStyles: { [key: string]: ProcessedStyle } =
      this.getObjectMappedStyles(abstractObjects, {animationIndex}, state);

    let controllersStyles: { [key: string]: ProcessedStyle } =
      this.getObjectMappedStyles(objects, {...abstractStyles, animationIndex}, state);

    await this.animateStyles(controllersStyles);

    if (direction === "still") return;
    this.animationIndex += this.direction === "forward" ? 1 : -1;
    if (this.animationIndex < 10) this.animate();
  }

  /**
   * Compute the styles of an AnimationObject dictionary and gives the result as a dictionary of same keys.
   *
   * @param objects an dictionary with Animation object as key values
   * @param addOnsDependencies Dependencies not contained in the global dependency object. NOTE: The only option currently passed in that parameter are the abstract object styles;
   * @param state when provided, styles computation rely on state instead of current animationIndex
   * @returns Object with the same key as object dictionary and their corresponding mapped styles
   */
  private getObjectMappedStyles(
    objects: { [key: string]: AnimationObject },
    addOnsDependencies: AnimationDependencies,
    state?: string
  ) {
    const objectMappedStyles: { [key: string]: ProcessedStyle } = {};
    const animationIndex = this.animationIndex;

    for (const objectName in objects) {
      const object = objects[objectName];

      const objectPreviousState = object.meta.previousState;
      const objectActiveState =
        state ||
        object.meta.directions[animationIndex] ||
        (object.meta.defaultDirections as string);

      let objetStyles = this.getStyles(
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

      let defaultStyles: ProcessedStyle = {};
      if (object.states.default) {
        defaultStyles = this.getStyles(
          object.states.default,
          addOnsDependencies
        );
      }

      objetStyles = {
        ...defaultStyles,
        ...objetStyles,
        ...transitionDirectives,
      };

      objectMappedStyles[objectName] = objetStyles;
      object.meta.previousState = objectActiveState;
    }

    return objectMappedStyles;
  }

  /**
   * Create animation ready styles ProcessedStyle from raw styles ( animation getters).
   * NOTE: Returns the original styles if the style are already in a usable shape. 
   * 
   * @param rawStyle 
   * @param addOnsDependencies Dependencies not contained in the global dependency object. NOTE: The only option currently passed in that parameter are the abstract object styles;
   * @returns ProcessedStyle which are keyframe usable with framer-motion controllers
   */
  public getStyles(
    rawStyle: RawStyle,
    addOnsDependencies: { [key: string]: any } = {}
  ) {
    let computedStyles: ProcessedStyle = {};

    if (typeof rawStyle === "function")
      computedStyles = rawStyle({
        ...this.animationDependencies,
        ...addOnsDependencies,
      });
    else computedStyles = rawStyle;

    return computedStyles;
  }

  /**
   * Perform async animation of Object mapped styles
   * 
   * @param styles Object with instance controllers as keys and processed styles as value. 
   */
  public async animateStyles(styles: controllersReadyStyles) {
    const animationPromises: Promise<void>[] = [];
    const controllers = this.controllers;

    for (const controllerName in styles) {
      const method = this.mapMethod(
        styles[controllerName].behavior || "continuous"
      );
      const controllerStyles = styles[controllerName];

      animationPromises.push(
        controllers[controllerName]["start"](controllerStyles)
      );
    }

    await Promise.all(animationPromises);
  }

  /**
   * 
   * @param behavior transition behavior
   * @returns 
   */
  public mapMethod(behavior: Exclude<ProcessedStyle["behavior"], undefined>) {
    if (BEHAVIOR_MAP[behavior]) return BEHAVIOR_MAP[behavior];
    else
      throw new Error(
        `${behavior} : is not a valid behavior, Valid behavior are ${Object.keys(
          BEHAVIOR_MAP
        )
          .map((behavior) => BEHAVIOR_MAP[behavior])
          .join(", ")}.`
      );
  }

  public setAnimationDependencies(
    dependencies: typeof this.animationDependencies
  ) {
    this.animationDependencies = dependencies;
    // this.animate("still", "default");
  }
}
