import React from "react"
import styled from "styled-components"

const Icon = styled.span`
  width: 0;
  height: 0;
  border-top: 1em solid transparent;
  border-bottom: 1em solid transparent;

  border-left: 1em solid green;
`

const Triangle = ({ className }) => {
  return (
    <Icon
    //   className={`${className} border-t-8 border-b-8 border-r-8 border-cyan-900`}
      style={{}}
    ></Icon>
  )
}

export default Triangle
