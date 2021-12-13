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
export const Links = ["About", "Contact", "Blog", "Work and Skills"]

export const NavContext = React.createContext<{ [key: string]: any }>({})


const Layout = ({ children }) => {
  const sections = React.useRef([])
  
  return (
    <NavContext.Provider value={{ sections}}>
      <NavBar Links={Links} data={Link_data} />
      <main className="">{children}</main>
    </NavContext.Provider>
  )
}

export const useNavContext = () => {
  return React.useContext(NavContext)
}
export default Layout
