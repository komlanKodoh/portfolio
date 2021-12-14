import React, { useEffect, useState } from "react"

interface Props {
  width: number
  className: string
  children: React.ReactNode
  rotation?: { theta: number; phi: number }
  init?: { theta: number; phi: number }
}


export const Rotate: React.FC<Props> = ({ children, width, className, rotation, init }) => {

  width = width || 2;

  let x = (width/2 )* Math.cos(init.theta + rotation.theta) * Math.sin(init.phi + rotation.phi)
  let y = (width/2) * Math.sin(init.theta+ rotation.theta) * Math.sin(init.phi + rotation.phi)
  let z = 100 * Math.cos(init.phi + rotation.phi)


  // console.log(x, y , z)

    // let x = (width/2 )* Math.cos(theta) * Math.sin(phi)
  // let y = (width/2) * Math.sin(theta) * Math.sin(phi)
  // let z = (width/2) * Math.cos(phi)

  // console.log(init, children)
  // console.log(x, y )

  // console.log(rotation.phi, rotation.theta)

  // console.log(`hsla(10, 10%, 10%, ${z/ (width/2) + 1}})`)
  return (
    <div
      className={`absolute rounded-full p-2  left-1/2 top-1/2  ${className}`}
      style={{
        transform: `translate3d(calc( ${x}px - 50%), calc( ${y}px - 50%) , ${z}px)`,
        color: `hsla(100, 100%, 100%, ${z/ (100*2)+0.5})`
      }}
    >
      {children}
    </div>
  )
}
