/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
// import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "../style/tailwind.css"
import Burger from "./Icons/Burger"
import FadeIn from "./Effect/FadeIn"

const Layout = ({ children }) => {
  const [open, setOpen] = React.useState(false)

  const li = "px-12 py-4"
  return (
    <>
      <div className="lm-shape sticky top-2  ">
        <nav className="m-2 p-1 h-10 rounded shadow-2xl bg-white">
          <Burger state={open} onClick={() => setOpen(prev => !prev)} />
        </nav>
        <FadeIn
          visible={open}
          type={"from_big"}
          className="fixed flex flex-col  top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-98 z-10 "
          onClick={() => setOpen(prev => !prev)}
        >
          <ul className="m-auto text-white text-center text-2xl pb-10">
            <li className={li}>About</li>
            <li className={li}>Contact</li> 
            <li className={li}>Blog</li>
            <li className={li}>Work and Skills</li>
          </ul>
        </FadeIn>
      </div>
      <main className="lm-shape p-4">{children}</main>
    </>
  )
}

export default Layout
