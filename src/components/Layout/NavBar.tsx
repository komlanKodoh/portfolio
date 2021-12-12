import React, { useEffect, useState } from "react"
import { useNavContext } from "."
import * as styles from "./style.module.scss"
import { clamp } from "../../lib/utils"
import FadeIn from "../Effect/FadeIn"
import Burger from "../Icons/Burger"

interface Props {
  Links: string[]
  data: { [key: string]: object }
}

const theme = {
  dark: {
    backgroundColor: "black",
  },
}
export const NavBar: React.FC<Props> = ({ Links, data }) => {
  const { open, setOpen , theme} = useNavContext()

  const [visible, setVisible] = useState(true)

  const [shadow, setShadow] = useState(0)
  const old_scroll = React.useRef(0)

  const getScrollSpeed = (current, previousScroll) => {
    if (current < 100) return setVisible(true)
    // if (current - previousScroll < -10) {
    //   setVisible(true)
    // } else if (current - previousScroll > 10) {
    //   setVisible(false)
    // }
  }
  const onScroll = e => {
    const scrollTop = e.target.scrollTop

    const threshold = 10

    const opacity = clamp(scrollTop / threshold, 0, 0.25)

    setShadow(opacity)
    getScrollSpeed(scrollTop, old_scroll.current)
    old_scroll.current = scrollTop
  }

  useEffect(() => {
    const root = document.getElementById("gatsby-focus-wrapper")

    root.addEventListener("scroll", onScroll)
    ;() => root.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <nav className="sticky top-0 ">
        <div
          className={`lm-shape absolute top-2 left-1/2 -translate-x-1/2 w-full h-0 `}
        >
          <div
            className={`m-2 p-1 h-10 rounded flex ${styles[theme]} ${styles.nav} `}
            style={{
              boxShadow: visible
                ? `0 25px 50px -12px rgba(0,0,0, ${shadow})`
                : "0 0 0 0 rgba(0,0,0,0)",
              transform: visible ? "translateY(0%)" : "translateY(-150%)",
            }}
            id="nav_header"
          >
            <Burger
              className={"sm:hidden"}
              state={open}
              onClick={() => setOpen(prev => !prev)}
            />

            <ul className="hidden m-auto mr-6  sm:flex text-sm">
              {Links.map(link => (
                <li className=" ml-4 block">{link}</li>
              ))}
            </ul>
          </div>
        </div>

        <FadeIn
          visible={open}
          type={"from_big"}
          className=" md:hidden fixed flex flex-col  top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-98 z-10 "
          // onClick={() => setOpen(prev => !prev)}
        >
          <div className="m-2 p-1 h-10">
            <Burger
              className={"sm:hidden"}
              state={open}
              onClick={() => setOpen(prev => !prev)}
            />
          </div>
          <ul className="m-auto text-white text-center text-2xl pb-10">
            {Links.map((link_name, index) => (
              <FadeIn visible={open} type="from_bottom" delay={index / 5}>
                <li className={"px-12 py-4"}>{link_name}</li>
              </FadeIn>
            ))}
          </ul>
        </FadeIn>
      </nav>
    </>
  )
}
