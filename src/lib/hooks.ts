import { useState, useRef, useEffect } from "react"

export const useIntersectionObserver: (
  cb,
  config,
  getRoot?: () => HTMLElement
) => IntersectionObserver = (cb, config, getRoot) => {
  const [observer, setObserver] = useState<IntersectionObserver>()

  useEffect(() => {
    config.root = getRoot && getRoot()
    setObserver(new IntersectionObserver(cb, config))
  }, [])

  return observer
}
