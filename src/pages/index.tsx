import React, { useEffect, useRef } from "react"
import Button from "../components/Basic/Button"
import TurningWord from "../components/Effect/preset/TurningWord"
import { Rotate } from "../components/Effect/Rotate"
import Triangle from "../components/Icons/markers/triangle"

import Layout, { useNavContext } from "../components/Layout"
import Human from "../components/svg/Human"

const Page = () => {
  return (
    <>
      <Section className=" bg-slate-900  bg-cover relative h-screen " index="0">
        <div className="lm-size h-full flex text-white relative z-20">
          <div className="my-auto ml-3 w-[60ch]">
            <p className="m-0 p-0">
              <span className=" text-zinc-200">Hello, I am </span>
              <span className=" text-zinc-200 underline underline-offset-4">
                Daniel
              </span>
              <span className=" text-4xl block py-2">
                A Full Stack Web developer
              </span>
            </p>
            <p className="m-0 p-0 text-slate-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              tempus ac nisi sit amet molestie. Nunc non accumsan velit. Mauris
              mattis auctor lorem sed tincidunt. Vivamus egestas dapibus
              scelerisque. Nam cursus elit quis erat venenatis volutpat
            </p>
            <Button className="mt-3">Get In Touch</Button>
          </div>

          <Human className="hidden sm:block" />
        </div>
      </Section>
      <Section
        className="flex bg-white  text-gray-900 relative flex-wrap"
        index="1"
      >
        <div className="lm-size w-full">
          <div className=" py-20 max-w-[50ch] px-2 text-justify">
            <h1 className=" text-4xl text-center m-4">About me</h1>
            <p>
              I am Daniel, a computer science major. When not studying to
              maintain my 4.0 gpa, I like learning about new technology and
              build interactive user experiences. <br />
              <br />
              While I explore all kind of technologies my set off skills is
              highly tailored toward the web. My knowledge of front-end
              technologies and understanding of backend languages helps me
              create fast and reliable web experiences. The technologies I use
              includes but are not restrained to :
            </p>

            <ul className="grid grid-cols-3 mt-1 list-inside list-disc py-4 sm:pl-0 gap-4">
              {[
                "HTML",
                "CSS",
                "Node js",
                "My sql",
                "Mongo db",
                "React",
                "Next.js",
              ].map((item, index) => (
                <li className="inline-block"># - {item}</li>
              ))}
            </ul>
          </div>
          {/* <TurningWord className="relative flex-1 top-0 z-10 min-h-[400px] w-2/4"  classNameWord=" text-blue-900 transition-transform"/>  */}
        </div>
      </Section>
      <Section
        className=" bg-blue-800 flex "
        index="2"
      >
        <div className="lm-size text-white relative flex-wrap w-full">
            <h1 className=" text-4xl text-center m-8 underline">What I worked on </h1>
            
        </div>
      </Section>
    </>
  )
}

const Section = ({ className, index, children }) => {
  const sectionRef = React.useRef()
  const { sections } = useNavContext()

  const sectionDiv = sectionRef.current as HTMLDivElement
  useEffect(() => {
    sections.current[index] = sectionDiv?.offsetHeight
  }, [sectionDiv])
  return (
    <div ref={sectionRef} className={`${className} w-full`}>
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
