import { useState, useRef, useEffect } from "react"

export const useIntersectionObserver: (
  cb: IntersectionObserverCallback,
  config: IntersectionObserverInit,
  getRoot?: () => HTMLElement
) => IntersectionObserver = (cb, config, getRoot) => {
  const [observer, setObserver] = useState<IntersectionObserver>()

  useEffect(() => {
    config.root = getRoot && getRoot()
    setObserver(new IntersectionObserver(cb, config))
  }, [])

  return observer as IntersectionObserver;
}

export function useSyncRef<T>(state:T){
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = state;
  }, [state])

  return ref as React.MutableRefObject<T>;
}

export const useFirstTimeLoading = () => {
  const load = useRef(true);
  useEffect(() => {
    load.current = false;
  }, []);

  return load.current as boolean;
};