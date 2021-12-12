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

export const NavContext = React.createContext<{ [key: string]: any }>({
  setTheme: () => console.log(0),
  theme: "dark"
})
export const useNavContext = () => {
  return React.useContext(NavContext)
}

const Layout = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [theme, setTheme] = React.useState("default");

  console.log("the theme is ", theme)

  return (
    <NavContext.Provider value={{ open, setOpen, theme, setTheme }}>
      <NavBar Links={Links} data={Link_data} />
      <main className="">{children}</main>
    </NavContext.Provider>
  )
}

export default Layout
