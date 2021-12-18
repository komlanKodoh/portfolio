import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import * as styles from "./style.module.scss"

interface Props {
  state: boolean,
  onClick: () => void,
  className: string,
  classNameBar: string,
}

const progress = ["open", "mid", "close"]
const map = {
    true: "open",
    false: "close"
}

const Burger: React.FC<Props> = ({ state , onClick , className, classNameBar}) => {
  const [myState, setMyState] = useState("close")

//   const onClick = () => {
//     setMyState("mid")
//   }

  useEffect(() => {

      setMyState(prev => prev ==="mid"?  map[`${state}`] : "mid")
  }, [state])

  // const b_style = "w-8 h-1 bg-white"
  return (
    <div
      onClick={onClick}
      className={` w-fit p-1 flex-col flex justify-around relative h-full z-20 ${className}`}
    >
      {/* <div className={b_style}></div> */}
      <div
        className={`${styles.bar} ${styles[myState]} relative `}
        onTransitionEnd={() => {
          setMyState(state ? "open" : "close")
        }}
      >
        <div className={classNameBar}></div>
        <div className={classNameBar}></div>
        <div className={classNameBar}></div>
      </div>
      {/* <div className={b_style}></div> */}
    </div>
  )
}

// const Bar: React.FC<{ className: string }> = ({ className }) => {
//   return (
//     <div
//       className={`absolute top-1/2 left-1/2  h-1 w-90p bg-blue-50 -translate-x-1/2 ${className}`}
//     ></div>
//   )
// }

export default Burger
