import { graphql } from "gatsby"
import React, { useEffect, useRef } from "react"
import Button from "../components/Basic/Button"
import Img from "gatsby-image"
import TurningWord from "../components/Effect/preset/TurningWord"
import { Rotate } from "../components/Effect/Rotate"
import Triangle from "../components/Icons/markers/triangle"

import Layout, { useNavContext } from "../components/Layout"
import Human from "../components/svg/Human"
import ContactForm from "../components/Complex/ContactForm"

const Page = ({ data }) => {
  // console.log()
  return (
    <>
      <Section
        className=" bg-slate-900  bg-cover relative h-screen max-h-[900px]"
        index="0"
      >
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
            <Human className="sm:hidden w-1/2 h-auto float-right my-8" />
          </div>

          <Human className="hidden sm:block my-auto float-right" />
        </div>
      </Section>
      <Section
        className="flex bg-white  text-gray-900 relative flex-wrap"
        index="1"
      >
        <div className="lm-size w-full grid sm:grid-cols-2">
          <div></div>
          <div className=" py-20 text-justify">
            <h1 className=" text-4xl -sm:text-2xl text-center m-4">About me</h1>
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
                <li className="inline-block" key={item}>
                  # - {item}
                </li>
              ))}
            </ul>
          </div>
          {/* <TurningWord className="relative flex-1 top-0 z-10 min-h-[400px] w-2/4"  classNameWord=" text-blue-900 transition-transform"/>  */}
        </div>
      </Section>
      <Section className=" bg-slate-900  flex py-4 " index="2">
        <div className="lm-size text-blue-200 relative flex-wrap">
          <h1 className=" text-4xl -sm:text-2xl text-center m-8 mb-12 underline">
            What I worked on{" "}
          </h1>

          <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-12">
            <div className="relative rounded-md overflow-hidden">
              <Img className=" " fluid={data.file.childImageSharp.fluid} />
              <div className="absolute w-full bg-red top-0 left-0 bg-slate-900"></div>
            </div>
            <div className="flex">
              <div className="my-auto ">
                <h2 className=" text-2xl sm:text-right  my-4">E-commerce </h2>
                <ul className="sm:flex flex-start justify-end gap-2   my-2 flex-wrap">
                  {["Next.js", "Mongod db", "Serverless Functions"].map(
                    item => (
                      <div key="item">
                        <li className=" rounded-md px-4 py-0 bg-black inline-block my-1">
                          {item}{" "}
                        </li>
                      </div>
                    )
                  )}
                </ul>
                <p className="text-justify text-sm sm:text-base">
                  Suspendisse nisi massa, pulvinar id semper eget, consequat in
                  odio. Phasellus vitae dolor imperdiet, finibus lacus a,
                  efficitur mauris. Etiam bibendum, purus sodales pulvinar
                  cursus, turpis tellus auctor nunc, quis bibendum ligula elit
                  et tellus. Duis nisi risus, euismod eu velit a, dictum posuere
                  nulla. Donec maximus eros a elit tempus, sit amet fringilla
                  ipsum vestibulum. Sed dolor libero, suscipit sit amet sodales
                  non, convallis congue lacus. Mauris neque est
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white flex justify-center align-center " index="3">
        <div className="lm-size py-12 max-w-[100ch] px-">
          <h1 className=" text-4xl -sm:text-2xl text-center m-4">Contact Me</h1>
          <ContactForm />
          <p className="flex justify-center align-center h-4 relative mt-8">
            <span className=" shrink-0 bg-black w-full m-auto h-px block"></span>
            <span className="absolute top-1/2 left-1/2 bg-white px-4 -translate-x-1/2 -translate-y-1/2">or</span>
          </p>
        </div>
      </Section>
      <footer className="bg-slate-400 text-white">
        <p className="lm-size flex justify-center ">
          Copyright 2021, created by Daniel kodoh
        </p>
      </footer>
    </>
  )
}

const Section = ({ className, index, children }) => {
  const sectionRef = React.useRef<HTMLDivElement>()
  const { sections } = useNavContext()

  useEffect(() => {
    // console.log(sectionDiv)
    sections.current[index] = sectionRef.current?.offsetHeight
  }, [sectionRef.current])
  return (
    <div ref={sectionRef} className={`${className} w-full`}>
      {children}
    </div>
  )
}

const IndexPage = props => {
  return (
    <Layout>
      <Page {...props} />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query Project1 {
    file(relativePath: { eq: "preview1.png" }) {
      id
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
