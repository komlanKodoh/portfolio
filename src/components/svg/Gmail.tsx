import React from "react"

interface Props extends React.SVGProps<SVGSVGElement> {}

const Gmail: React.FC<Props> = props => {
  return (
    <svg {...props} aria-label="Gmail" role="img" viewBox="0 0 512 512">
      <rect width="512" height="512" rx="15%" fill="none" className="" />
      <path fill="black" d="M120 392V151.075h272V392" />
      <path fillOpacity=".05" d="M256 285L120 392l-4-212" />
      <path fill="#d54c3f" d="M120 392H97c-12 0-22-10-22-23V143h45z" />
      <path fillOpacity=".08" d="M317 392h77V159H82" />
      <path fill="black" d="M97 121h318L256 234" />
      <path fill="#b63524" d="M392 392h23c12 0 22-10 22-23V143h-45z" />
      <path
        fill="none"
        stroke="#de5145"
        strokeLinecap="round"
        strokeWidth="44"
        d="M97 143l159 115 159-115"
      />
    </svg>
  )
}

export default Gmail
