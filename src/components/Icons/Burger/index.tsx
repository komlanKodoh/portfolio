import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as styles from "./style.module.scss";
import { useFirstTimeLoading } from "../../../lib/hooks";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  state: boolean;
  onClick: () => void;
  className: string;
  classNameBar: string;
}

const progress = ["open", "mid", "close"];
const map = {
  true: "open",
  false: "close",
};

const Burger: React.FC<Props> = ({
  state,
  onClick,
  className,
  classNameBar,
  ...props
}) => {
  const [myState, setMyState] = useState("close");

  const firstTimeLoading = useFirstTimeLoading()

  useEffect(() => {
    if (firstTimeLoading) return;
    setMyState((prev) => (prev === "mid" ? map[`${state}`] : "mid"));
  }, [state]);


  return (
    <div
      {...props}
      onClick={onClick}
      className={` w-fit p-1 flex-col flex justify-around relative h-full z-20 ${className}`}
    >
      <div
        className={`${styles.bar} ${styles[myState]} relative `}
        onTransitionEnd={() => {
          setMyState(state ? "open" : "close");
        }}
      >
        <div className={classNameBar}></div>
        <div className={classNameBar}></div>
        <div
          className={classNameBar}
          style={{
            opacity:
              myState === "close" || (myState === "mid" && state === true                  )
                ? 1
                : 0,
          }}
        ></div>
      </div>
    </div>
  );
};


export default Burger;
