import React, { useEffect, useState } from "react"

interface Props {
  width: number
  className: string
  children: React.ReactNode
  speed?: { theta: number; phi: number }
  init?: { theta: number; phi: number }
}

const SPEED = (Math.random() + 5) / 5000;
export const Rotate: React.FC<Props> = ({ children, width, className, speed, init }) => {
  const [phi, setPhi] = useState((Math.random() + 5) * 100)
  const [theta, setTheta] = useState((Math.random() + 5) * 100)

  const [vPhi, setVPhi] = useState(SPEED * 1.2)
  const [vTheta, setVTheta] = useState(SPEED )
  useEffect(() => {
    const intervals = [
      setInterval(() => {
        setPhi(p => p + vPhi)
        setTheta(p => p + vTheta)
      }, 10),

      setInterval(() => {
        setVPhi(SPEED)
        setVTheta(SPEED)
      }, 1000 * 60 *2 ),
    ]

    return () => intervals.forEach(interval => clearInterval(interval))
  }, [])
  
  console.log(width)
  width = width || 2;

  let x = (width/2 )* Math.cos(theta) * Math.sin(phi)
  let y = (width/2) * Math.sin(theta) * Math.sin(phi)
  let z = (width/2) * Math.cos(phi)


  // console.log(x, y, z)
  return (
    <div
      className={`absolute rounded-full p-2  left-1/2 top-1/2  ${className}`}
      style={{
        transform: `translate3d(calc( ${x}px - 50%), calc( ${y}px - 50%) , ${z}px)`,
      }}
    >
      {children}
    </div>
  )
}
