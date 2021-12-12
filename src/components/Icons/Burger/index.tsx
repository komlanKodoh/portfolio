import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import * as styles from "./style.module.scss"

interface Props {
  state: boolean,
  onClick: () => void,
}

const progress = ["open", "mid", "close"]
const map = {
    true: "open",
    false: "close"
}

const Burger: React.FC<Props> = ({ state , onClick }) => {
  const [myState, setMyState] = useState("close")

//   const onClick = () => {
//     setMyState("mid")
//   }

  useEffect(() => {

      setMyState(prev => prev ==="mid"?  map[`${state}`] : "mid")
  }, [state])

  const b_style = "w-8 h-1 bg-slate-700"
  return (
    <div
      onClick={onClick}
      className={`${styles.b} w-fit p-1 flex-col flex justify-around relative h-full z-20`}
    >
      {/* <div className={b_style}></div> */}
      <div
        className={`${styles.bar} ${styles[myState]} relative `}
        onTransitionEnd={() => {
          setMyState(state ? "open" : "close")
        }}
      >
        <div className="bg-slate-700"></div>
        <div className="bg-slate-700"></div>
        <div className="bg-slate-700"></div>
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
