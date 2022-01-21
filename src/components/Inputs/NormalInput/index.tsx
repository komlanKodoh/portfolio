import React from "react";
import * as styles from "./style.module.scss";
import * as inputStyles from "../style.module.scss";
import { memo, useEffect, useRef } from "react";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  name: string,
  state: [
    {
      [key: string]: any;
    },
    React.Dispatch<
      React.SetStateAction<{
        [key: string]: any;
      }>
    >
  ];
}

const Input: React.FC<InputProps> = ({
  state: [inputValue, setInputValue],
  id,
  name,
  label,
  ...props
}) => {
  const handleChange = (e, name) => {
    setInputValue((prev) => ({ ...prev, [name]: e.target.value }));
  };
  return (
    <div>
      <label htmlFor={id}>
        {label} {props.required && <span className=" text-red-600">*</span>}
      </label>
      <input
        name={name}
        id={id}
        {...props}
        value={inputValue[name]}
        onChange={(e) => {
          handleChange(e, name);
        }}
      ></input>
    </div>
  );
};
export default memo(Input);
