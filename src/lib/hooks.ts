import { useState, useRef, useEffect } from "react"

export const useIntersectionObserver: (
  cb,
  config,
  getRoot
) => IntersectionObserver = (cb, config, getRoot) => {
  const [observer, setObserver] = useState<IntersectionObserver>()

  useEffect(() => {
    config.root = getRoot()
    setObserver(new IntersectionObserver(cb, config))
  }, [])

  return observer
}
