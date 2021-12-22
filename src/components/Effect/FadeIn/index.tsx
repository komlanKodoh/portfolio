import React from "react"
import PropTypes from "prop-types"
import { AnimatePresence, motion } from "framer-motion"

interface Props {
  id: string
  delay?: number
  visible: boolean
  transition?: any
  preserve?: boolean
  className?: string
  onClick?: () => void
  children: React.ReactNode
  type: "from_big" | "from_bottom" | "from_left" | "simple"
}

const variants = {
  from_big: {
    scale: 1.2,
    opacity: 0,
  },
  from_left: {
    x: -10,
    opacity: 0,
  },
  simple: {
    opacity: 0,
  },
  from_bottom: {
    y: 10,
    opacity: 0,
  },
  visible: {
    y: 0,
    x: 0,
    scale: 1,
    opacity: 1,
  },
}
const FadeIn: React.FC<Props> = ({
  id,
  type,
  delay,
  onClick,
  visible,
  children,
  className,
  preserve,
  transition,
}) => {
  if (preserve)
    return (
      <motion.span
        id={id}
        key={id}
        initial={type}
        onClick={onClick}
        animate={(visible && "visible") || type}
        variants={variants}
        className={className + " block"}
        transition={transition || { type: "linear", delay }}
      >
        {children}
      </motion.span>
    )

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
      
          key={id}
          exit={type}
          initial={type}
          onClick={onClick}
          animate={"visible"}
          variants={variants}
          className={className}
          transition={{ type: "linear", delay }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FadeIn
