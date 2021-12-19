/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
// import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "../../style/tailwind.css"
import Burger from "../Icons/Burger"
import FadeIn from "../Effect/FadeIn"
import { NavBar } from "./NavBar"
import { any } from "prop-types"

export const Link_data = {}
export const Links = ["About", "Contact", "Work"]

export const NavContext = React.createContext<{ [key: string]: any }>({})

const Layout = ({ children }) => {
  const sections = React.useRef([])

  const [currentSection, setCurrentSection] = React.useState(0);

  return (
    <NavContext.Provider value={{ sections, currentSection, setCurrentSection }}>
      <NavBar Links={Links} data={Link_data} />
      <main className="">{children}</main>
      <footer className="bg-green-600 text-white">
        <p className="lm-size flex justify-center py-2 ">
          Copyright 2021, created by Daniel kodoh
        </p>
      </footer>
    </NavContext.Provider>
  )
}

export const useNavContext = () => {
  return React.useContext(NavContext)
}
export default Layout
