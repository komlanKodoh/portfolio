import { graphql } from "gatsby"
import React, { useEffect, useRef, useState } from "react"
import Button from "../components/Basic/Button"
import Img from "gatsby-image"
import TurningWord from "../components/Effect/preset/TurningWord"
import { Rotate } from "../components/Effect/Rotate"
import Triangle from "../components/Icons/markers/triangle"

import Layout, { useNavContext } from "../components/Layout"
import Human from "../components/svg/Human"
import ContactForm from "../components/Complex/ContactForm"
import SeparationH from "../components/Basic/SeparationH"
import Facebook from "../components/svg/Facebook"
import Linkedin from "../components/svg/Linkedin"
import FadeIn from "../components/Effect/FadeIn"
import { useIntersectionObserver } from "../lib/hooks"
import Gmail from "../components/svg/Gmail"
import Phone from "../components/svg/Phone"

const Page = ({ data }) => {
  // console.log(data)
  // const { int_index, setCurrent } = useNavContext()
  // const intersectionIndex = useRef(0)
  const [int_index, setInt_index] = useState(10)

  // // console.log(int_index)

  // const observer = useIntersectionObserver(entries => {
  //   entries.forEach(entry => {
  //     if (entry.isIntersecting) {
  //       setInt_index(p => p + 1)
  //     }
  //   })
  // }, {
  //   rootMargin: "50%"
  // })

  return (
    <>
      <Section
        className=" bg-slate-900  bg-cover relative h-screen -sm:h-auto max-h-[900px]"
        index="1"
        id="Home"
        // observer={observer}
      >
        <div className="lm-size h-full flex text-white relative z-20">
          <div className="my-auto sm:w-[60ch] sm:max-w-[60%] sm:flex-shrink-0 -sm:mt-24">
            <p className="m-0 p-0">
              <FadeIn
                visible={int_index >= 0}
                type={"from_bottom"}
                preserve={true}
                transition={{ duration: 0.5 }}
              >
                <span className=" text-zinc-200">Hello, I am </span>
                <span className=" text-zinc-200 underline underline-offset-4">
                  Daniel
                </span>
              </FadeIn>
              <FadeIn
                visible={int_index >= 0}
                type={"from_bottom"}
                preserve={true}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className=" text-4xl block py-2">
                  A Full Stack Web developer
                </span>
              </FadeIn>
            </p>

            <FadeIn
              visible={int_index >= 0}
              type={"from_left"}
              preserve={true}
              transition={{ duration: 0.5, delay: 0.4 * 2 }}
            >
              <p className="m-0 p-0 text-slate-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                tempus ac nisi sit amet molestie. Nunc non accumsan velit.
                Mauris mattis auctor lorem sed tincidunt. Vivamus egestas
                dapibus scelerisque. Nam cursus elit quis erat venenatis
                volutpat
              </p>
              <Button className="mt-3">
                <a href="#Contact" className="w-full h-full block">
                  Get In Touch
                </a>
              </Button>
            </FadeIn>
            <FadeIn
              visible={int_index >= 0}
              type={"simple"}
              preserve={true}
              transition={{ duration: 3, delay: 0.4 * 3 }}
            >
              <Human className="sm:hidden w-1/2 h-auto float-right my-8" />
            </FadeIn>
          </div>
          <FadeIn
            visible={int_index >= 0}
            type={"simple"}
            preserve={true}
            transition={{ duration: 3, delay: 0.4 * 3 }}
          >
            <Human className="hidden sm:block my-auto w-full float-right" />
          </FadeIn>
        </div>
      </Section>
      <Section
        // observer={observer}
        id="About"
        className="flex bg-white text-gray-900 relative flex-wrap"
        index="2"
      >
        <div className="lm-size w-full grid sm:grid-cols-2  py-10 text-justify">
          <h1 className=" text-2xl text-center sm:hidden">About me</h1>
            <div className="flex w-full h-full py-8">
              <Img
                className="w-1/2 m-auto rounded-xl border-4 shadow-2xl "
                fluid={data.me.childImageSharp.fluid}
              />
            </div>

            <div className="">
              <h1 className=" text-4xl -sm:hidden text-center m-4">About me</h1>
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
                  <li className="inline-block whitespace-nowrap" key={item}>
                    # - {item}
                  </li>
                ))}
              </ul>
            </div>
          {/* <TurningWord className="relative flex-1 top-0 z-10 min-h-[400px] w-2/4"  classNameWord=" text-blue-900 transition-transform"/>  */}
        </div>
      </Section>
      <Section className=" bg-slate-900  flex " index="3" id="Work">
        <div className="lm-size text-blue-200 relative flex-wrap py-14">
          <h1 className=" text-4xl -sm:text-2xl text-center mb-12 underline">
            What I worked on
          </h1>

          <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-12 place-items-center">
            <div className="relative rounded-md overflow-hidden w-full">
              <Img className="" fluid={data.kdshop.childImageSharp.fluid} />
              <div className="absolute w-full bg-red top-0 left-0 bg-slate-900"></div>
            </div>
            <div className="flex">
              <div className="my-auto ">
                <h2 className=" text-2xl sm:text-right  my-4">E-commerce </h2>
                <ul className="sm:flex flex-start justify-end gap-2   my-2 flex-wrap">
                  {["Next.js", "Mongod db", "Serverless Functions"].map(
                    item => (
                      <div key={item}>
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

      <Section
        // observer={observer}
        className="bg-white flex justify-center align-center "
        index="3"
        id="Contact"
      >
        <div className="lm-size py-12 px-2 w-[60ch] max-w-full ">
          <h1 className=" text-4xl -sm:text-2xl text-center m-4">Contact Me</h1>
          <ContactForm />
          <SeparationH>or</SeparationH>
          <div className="flex justify-center gap-4">
            <a href={"mailto:komlankodoh@gmail.com"}>
              <Gmail fill="white" className="w-11 h-auto" />
            </a>
            <a href="tel:5312256403">
              <Phone fill="#42c452" className="w-11 h-auto" />
            </a>
            <a href="https://www.linkedin.com/in/komlankodoh">
              <Linkedin fill="#0a66c2" className="w-11 h-auto" />
            </a>
          </div>
        </div>
      </Section>
    </>
  )
}

const Section = ({ className, index, children, ...rest }) => {
  const sectionRef = React.useRef<HTMLDivElement>()
  const { sections } = useNavContext()

  // useEffect(() => {
  //   observer?.observe(sectionRef.current)
  // }, [observer])

  useEffect(() => {
    // console.log(sectionDiv)
    sections.current[index] = { height: sectionRef.current?.offsetHeight }
  }, [sectionRef.current])
  return (
    <div
      ref={sectionRef}
      className={`${className} w-full scroll-m-16`}
      {...rest}
    >
      {children}
    </div>
  )
}

// const IndexPage = props => {
//   return (
//     <Layout>
//       <Page {...props} />
//     </Layout>
//   )
// }

export default Page

export const query = graphql`
  query Project1 {
    kdshop: file(relativePath: { eq: "preview1.png" }) {
      id
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    me: file(relativePath: { eq: "me.jpeg" }) {
      id
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
