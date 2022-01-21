import React, { useEffect, useMemo, useRef, useState } from "react"
import { Rotate } from "../Rotate"

const DENSITY = 20

const create_skill = (arr: string[], density: number) => {
  const result = [] as string[];

  for (let i = 0; i < density; i++) {
    result.push(...arr)
  }

  return result
}

const SKILLS = create_skill(
  ["python", "javascript", "react", "mongo", "mysql", "java"],
  DENSITY
)

const getInits = (quantity, start) => {
  const PI = Math.PI

  const phi_spacing = (2 * PI) / quantity
  const matrixes = [] as {phi: number, theta: number}[]

  for (const phi of [0.1 * PI, 0.3* PI, 0.5 * PI , 0.8 * PI]) {
    for (let theta = start; theta < 2 * PI + start; theta += phi_spacing) {
      matrixes.push({ phi, theta })
    }
  }
  return matrixes
}

interface Props {
  classNameWord: string
  className: string
}

const Matrix = getInits(6, 0)
const SPEED = (Math.random() + 5) / 9000

//setting position absolute or relative in className is required for this to work;
const TurningWord = ({ classNameWord, className }) => {
  const ctnRef = useRef<HTMLDivElement>(null) 
  const [width, setWidth] = useState(400)

  useEffect(() => {

    setWidth(ctnRef.current?.clientWidth || 0)
  }, [])
  // console.log(Matrix.map(m => ({phi: m.phi * 180/Math.PI, theta : m.theta * 180/Math.PI})))

  const [phi, setPhi] = useState(0)
  const [theta, setTheta] = useState(0)

  const lastTime = useRef(0)
  useEffect(() => {
    const animate = (timestamp) => {
      console.log(timestamp)
      const elapsed = timestamp - lastTime.current;
      const motion = elapsed /2000000
      setPhi(p => p+motion)
      // setTheta(p => p + motion)

      window.requestAnimationFrame(animate)
    }

    window.requestAnimationFrame(animate)

    // return () => intervals.forEach(interval => clearInterval(interval))
  }, [])

  return (
    <div
      style={{ perspective: "400px" }}
      className={`overflow-hidden view ${className}`}
      ref={ctnRef}
    >
      {Matrix.map( (init, index) => (
        <Rotate width={400} className={classNameWord} rotation={{phi, theta}} init={{phi: init.phi, theta: init.theta}} >
          {SKILLS[index]}
        </Rotate>
      ))}

      {/* {/* <Rotate
        width={200}
        className={classNameWord}
        rotation={{ phi, theta }}
        init={{ phi: 0, theta: 0}}
      >
        {"SKILLS[index]"}
      </Rotate> */}
{/* 
      <Rotate
        width={200}
        className={" bg-black "}
        rotation={{ phi, theta }}
        init={{ phi: 0.5 * Math.PI, theta:0 }}
      >
        {"SKILLS[index] "}
      </Rotate> */}
    </div>
  )
}

export default TurningWord
