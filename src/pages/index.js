import React, { useEffect, useRef } from "react"
import Button from "../components/Basic/Button"
import TurningWord from "../components/Effect/preset/TurningWord"
import { Rotate } from "../components/Effect/Rotate"

import Layout, { useNavContext } from "../components/Layout"

const Page = () => {
  return (
    <>
      <Section className=" bg-slate-900  bg-cover relative " index="0">
        {/* <TurningWord className="absolute w-full h-full top-0 z-10" classNameWord=" text-blue-900 transition-transform"/> */}
        <div className="lm-size h-full flex text-white relative z-20" >
          <div className="my-auto ml-3 w-[60ch]">
            <p className="m-0 p-0">
              <span className=" text-zinc-200">Hello, I am </span> &nbsp;{" "}
              <span className=" text-zinc-200 text-2xl">Daniel</span>
              <span className=" text-4xl block py-2">
                LOREM IPSUM DOLOER
              </span>
            </p>
            <p className="m-0 p-0 text-slate-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              tempus ac nisi sit amet molestie. Nunc non accumsan velit. Mauris
              mattis auctor lorem sed tincidunt. Vivamus egestas dapibus
              scelerisque. Nam cursus elit quis erat venenatis volutpat
            </p>
            <Button className="mt-3" >Get In Touch</Button>
          </div>

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
