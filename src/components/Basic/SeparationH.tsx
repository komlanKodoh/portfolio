import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  color?: string;
  padding: string;
}

const SeparationH: React.FC<Props> = ({
  children,
  color,
  padding,
  className,
}) => {
  return (
    <p className="flex justify-center align-center h-fit relative m-8">
      <span
        className=" shrink-0 bg-black flex-1 m-auto h-px block"
        style={{ backgroundColor: color }}
      ></span>
      <span style={{padding}}>{children}</span>
      <span
        className=" shrink-0 bg-black flex-1 w-1/3 m-auto h-px block"
        style={{ backgroundColor: color }}
      ></span>
    </p>
  );
};

export default SeparationH;
