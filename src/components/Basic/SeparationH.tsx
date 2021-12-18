import React from "react"

interface Props {
    children: React.ReactNode;
    color?: string;
}

const SeparationH: React.FC<Props> = ({children, color}) => {
  return (
    <p className="flex justify-center align-center h-4 relative m-8">
      <span className=" shrink-0 bg-black w-full m-auto h-px block" style={{backgroundColor: color}}></span>
      <span className="absolute top-1/2 left-1/2 bg-white px-4 -translate-x-1/2 -translate-y-1/2">
        {children}
      </span>
    </p>
  )
}

export default SeparationH
