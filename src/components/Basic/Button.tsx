
import React from 'react'

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    className: string,
    children: React.ReactNode
}
const Button:React.FC<Props> = (props) => {
    const {className, children} = props;
    return (
        <button className={` py-2 px-8 border-2 bg-slate-800 border-blue-900 ${className}`}>
            {children}
        </button>
    )
}

export default Button
