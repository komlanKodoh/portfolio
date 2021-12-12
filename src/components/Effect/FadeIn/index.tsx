import React from "react"
import PropTypes from "prop-types"
import { AnimatePresence, motion } from "framer-motion"

interface Props {
  type: "from_big"
  visible: boolean
  className?: string
  onClick: () => void
  children: React.ReactNode
}

const variants = {
  from_big: {
    scale: 1.2,
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
  visible,
  children,
  onClick,
  className,
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="modalkl"
          initial={type}
          animate={'visible'}
          exit={type}
          variants={variants}
          className={className}
          onClick={onClick}
          transition={{type:"linear"}}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FadeIn
