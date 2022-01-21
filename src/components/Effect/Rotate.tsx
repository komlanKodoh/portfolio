import React, { useEffect, useState } from "react"

interface Props {
  width: number
  className: string
  children: React.ReactNode
  rotation: { theta: number; phi: number }
  init: { theta: number; phi: number }
}


export const Rotate: React.FC<Props> = ({ children, width, className, rotation, init }) => {

  width = width || 2;

  let x = (width/2 )* Math.cos(init.theta + rotation.theta) * Math.sin(init.phi + rotation.phi)
  let y = (width/2) * Math.sin(init.theta+ rotation.theta) * Math.sin(init.phi + rotation.phi)
  let z = 100 * Math.cos(init.phi + rotation.phi)

  return (
    <div
      className={`absolute rounded-full p-2  left-1/2 top-1/2  ${className}`}
      style={{
        transform: `translate3d(calc( ${x}px - 50%), calc( ${y}px - 50%) , ${z}px)`,
        color: `hsla(0, 0%, 0%, ${z/ (100*2)+0.5})`
      }}
    >
      {children}
    </div>
  )
}
