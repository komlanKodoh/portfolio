import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout, { useNavContext } from "../components/Layout"

const Page = () => {
  return (
    <>
      <Section className=" bg-slate-900" index="0">
        <div className="lm-size h-full flex text-white">
          <p className="w-[50%] my-auto ml-3">
            <span className="text-lg block">Hello, I am Daniel</span>

            <span className="text-5xl block py-2 leading-[1.5em]">A FULL STACK DEVELOPPER</span><br/>
            
          </p>
          <p></p>
        </div>
      </Section>
      <Section className=" bg-white" index="1"></Section>
      <Section className=" bg-blue-800" index="2"></Section>
    </>
  )
}

const Section = ({ className, index, children }) => {
  const sectionRef = React.useRef()
  const { sections } = useNavContext()
  useEffect(() => {
    sections.current[index] = sectionRef.current?.offsetHeight
  }, [sectionRef.current])
  return (
    <div
      ref={sectionRef}
      className={`${className} w-full h-screen max-h-[1250px]`}
    >
      {children}
    </div>
  )
}

const IndexPage = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  )
}

export default IndexPage
