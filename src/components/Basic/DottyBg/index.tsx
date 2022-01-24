import React from "react";
import * as styles from "./styles.module.scss";

interface Props extends React.HTMLProps<HTMLInputElement> {
  bgSize: string;
  color: string;
}

const DottyBg: React.FC<Props> = ({ className, bgSize, color, ...rest }) => {
  return (
    <div
      className={className}
      style={{
        backgroundPosition: "0 0",
        backgroundSize: `${bgSize} ${bgSize}`,
        backgroundImage: `radial-gradient(${color} 20%, #fefefe00 20%)`,
      }}
    ></div>
  );
};

export default DottyBg;
