import { clamp } from "./utils";

import { useState, useRef, useEffect } from "react";
import { types } from "sass";

export const useIntersectionObserver: (
  cb: IntersectionObserverCallback,
  config: IntersectionObserverInit,
  getRoot?: () => HTMLElement
) => IntersectionObserver = (cb, config, getRoot) => {
  const [observer, setObserver] = useState<IntersectionObserver>();

  useEffect(() => {
    config.root = getRoot && getRoot();
    setObserver(new IntersectionObserver(cb, config));
  }, []);

  return observer as IntersectionObserver;
};

/**
 * Create a ref object that follows the change of value of a state object;
 *
 * @param state value to track using ref
 * @returns react ref with the value saved as the Note property
 */
export function useSyncRef<T>(state: T) {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = state;
  }, [state]);

  return ref as React.MutableRefObject<T>;
}

/**
 * Hook that indicate it's the first time the component is loading
 *
 * @returns a boolean indicating if the it's the first time a component is loading
 */
export const useFirstTimeLoading = () => {
  const load = useRef(true);
  useEffect(() => {
    load.current = false;
  }, []);

  return load.current as boolean;
};

export function useSequentialState<T>(states: readonly T[] ) {
  const [stateIndex, setState] = useState(0);

  const updateState = (direction: 1 | -1) => {
    setState((prevState) => {
      return clamp(stateIndex + direction, 0, states.length - 1);
    });
  };


  return [states[stateIndex] , updateState] as const;
}

const that = async () => "b";
