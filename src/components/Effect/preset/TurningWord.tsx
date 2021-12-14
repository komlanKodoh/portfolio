import React, { useEffect, useMemo, useRef, useState } from "react"
import { Rotate } from "../Rotate"


const DENSITY = 2

const create_skill = (arr, density) => {
  const result = []

  for (let i = 0; i < density; i++) {
   result.push(...arr)
  }

  console.log("I am running")
  return result;
  
}

const SKILLS = create_skill(["python", "javascript", "react", "mongo", "mysql", "java"], DENSITY)
// console.log(SKILL)
interface Props {
  classNameWord: string,
  className: string
}

//setting position absolute or relative in className is required for this to work;
const TurningWord = ({classNameWord, className}) => {

    const ctnRef = useRef(null)
    const [width, setWidth] = useState(400)

    useEffect(() => {
        setWidth(ctnRef.current.clientWidth)
    }, [])
  return (
    <div
      style={{ perspective: "400px" }}
      className={`overflow-hidden view ${className}`}
      ref={ctnRef}
    >
      {SKILLS.map( skill => (
        <Rotate width={width} className={classNameWord}>
          {skill}
        </Rotate>
      ))}
    </div>
  )
}

export default TurningWord;
