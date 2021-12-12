import React from "react"
import PropTypes from "prop-types"
import { AnimatePresence, motion } from "framer-motion"

interface Props {
  delay?: number
  visible: boolean
  className?: string
  onClick?: () => void
  children: React.ReactNode
  type: "from_big" | "from_bottom"
}

const variants = {
  from_big: {
    scale: 1.2,
    opacity: 0,
  },
  from_bottom: {
    y: "100",
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
  type,
  delay,
  onClick,
  visible,
  children,
  className,
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="modalkl"
          exit={type}
          initial={type}
          onClick={onClick}
          animate={"visible"}
          variants={variants}
          className={className}
          transition={{ type: "linear" , delay}}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FadeIn
