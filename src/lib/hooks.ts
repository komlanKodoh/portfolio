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

export function useSequentialState<T>(states: readonly T[]) {
  const [stateIndex, setState] = useState(0);

  const updateState = (direction: 1 | -1) => {
    let changed = false;
    setState((prevState) => {
      const newState = clamp(stateIndex + direction, 0, states.length - 1);
      if (newState !== prevState) changed = true;
      return newState;
    });

    if (!changed) setState(0);
    return changed;
  };

  return [states[stateIndex], updateState] as const;
}

const that = async () => "b";

export const useForcedRender = () => {
  const [_, setState] = useState({});

  return () => setState({});
};

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/createStore";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
