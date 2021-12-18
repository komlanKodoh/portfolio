import React from "react"
import * as styles from "./style.module.scss"
import * as inputStyles from "../style.module.scss"
import { memo, useEffect, useRef } from "react"

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  state: [
    {
      [key: string]: any
    },
    React.Dispatch<
      React.SetStateAction<{
        [key: string]: any
      }>
    >
  ]
}

const Input: React.FC<InputProps> = props => {
  const {
    state: [inputValue, setInputValue],
    id,
    name,
    label,
    ...rest
  } = props

  const handleChange = (e, name) => {
    setInputValue(prev => ({ ...prev, [name]: e.target.value }))
  }
  return (
    <div>
      <label htmlFor={id}>{label} : {props.required && <span className=" text-red-600">*</span>}</label>
      <input
        id={id}
        {...rest}
        value={inputValue[name]}
        onChange={e => {
          handleChange(e, name)
        }}
      ></input>
    </div>
  )
}
export default memo(Input)
