import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import { LinkButton } from "../components/Basic/Button";
import Img from "gatsby-image";
import Human from "../components/svg/Human";
import ContactForm from "../components/BuildingBlocks/ContactForm";
import SeparationH from "../components/Basic/SeparationH";
import Linkedin from "../components/svg/Linkedin";
import FadeIn from "../components/Effect/FadeIn";
import Gmail from "../components/svg/Gmail";
import Phone from "../components/svg/Phone";
import ShowProject from "../components/BuildingBlocks/ShowProject";
import PageSection from "../components/BuildingBlocks/pageSection";

const Page = ({ data }) => {
  const [int_index, setInt_index] = useState(10);

  // console.log()

  return (
    <>
      <PageSection
        className=" bg-slate-900  bg-cover relative h-screen -sm:h-auto max-h-[900px]"
        theme="dark"
        index={1}
        id="Home"
        data-cy={"landing_home"}
        // observer={observer}
      >
        <div className="lm-size h-full flex text-white relative z-20">
          <div className="my-auto sm:w-[60ch] sm:max-w-[60%] sm:flex-shrink-0 -sm:mt-24">
            <p className="m-0 p-0">
              <FadeIn
                id="introduction"
                visible={int_index >= 0}
                type={"from_bottom"}
                preserve={true}
                transition={{ ease: "easeOut" ,duration: 1 }}
              >
                <span className=" text-zinc-200">Hello, I am </span>
                <span className=" text-zinc-200 underline underline-offset-4">
                  Daniel
                </span>
              </FadeIn>
              <FadeIn
                id="profession"
                visible={int_index >= 0}
                type={"from_bottom"}
                preserve={true}
                transition={{ ease: "easeOut", duration: 1.0}}
              >
                <span className=" text-4xl block py-2">
                  A Full Stack Web developer
                </span>
              </FadeIn>
            </p>

            <FadeIn
              id="landing_text"
              visible={int_index >= 0}
              type={"from_left"}
              preserve={true}
              transition={{ ease: "easeOut", duration: 1}}
            >
              <p className="m-0 py-2 text-slate-500">
                I design and build{" "}
                <strong className="text-slate-400">beautiful</strong> and{" "}
                <strong className="text-slate-400">accessible</strong> user
                interfaces. My work focuses on{" "}
                <strong className="text-slate-400">security</strong> and{" "}
                <strong className="text-slate-400">performance</strong> by
                leveraging the latest practices and tools of software
                development.
              </p>
              <LinkButton href="#Contact" className="w-fit h-full block mt-3" data-cy={"call_to_action"}>
                Get In Touch
              </LinkButton>
            </FadeIn>
            <FadeIn
              id="human_svg_sm"
              visible={int_index >= 0}
              type={"simple"}
              preserve={true}
              transition={{ duration: 3, delay: 0.5}}
            >
              <Human className="sm:hidden w-1/2 h-auto float-right my-8" />
            </FadeIn>
          </div>
          <FadeIn
            id="human_svg_big"
            visible={int_index >= 0}
            type={"simple"}
            preserve={true}
            transition={{ duration:2, delay: 1 }}
          >
            <Human className="hidden sm:block my-auto w-full float-right" />
          </FadeIn>
        </div>
      </PageSection>
      <PageSection
        className="flex bg-white text-gray-900 relative flex-wrap"
        id="About"
        theme="white"
        index={2}
        data-cy="landing_about"
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
            <p className=" leading-loose">
              I am Daniel, a computer science major. I like learning about new technology and
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
        </div>
      </PageSection>
      <PageSection
        className="bg-gradient-to-b  from-black via-slate-900 to-black flex"
        index={3}
        id="Work"
        theme="blue"
        data-cy={"landing_projects"}
      >
        <div className="lm-size text-blue-200 relative flex-wrap py-14">
          <h1 className=" text-4xl -sm:text-2xl text-center mb-12 underline">
            What I worked on
          </h1>
          {data.projects.edges.map((project, index) => (
            <ShowProject
              project={project.node}
              right={index % 2 === 1}
              key={project.node.id}
            />
          ))}
        </div>
      </PageSection>

      <PageSection
        theme="black"
        className="bg-white flex justify-center align-center "
        index={4}
        id="Contact"
        data-cy="landing_contact"
      >
        <div className="lm-size py-12 px-2 w-[60ch] max-w-full ">
          <h1 className=" text-4xl -sm:text-2xl text-center m-4">Contact Me</h1>
          <ContactForm />
          <SeparationH>or</SeparationH>
          <div className="flex justify-center gap-4">
            <a href={"mailto:komlankodoh@gmail.com"} aria-label="gmail contact">
              <Gmail fill="white" className="w-11 h-auto"/>
            </a>
            <a href="tel:5312256403" aria-label="phone contact" >
              <Phone fill="#42c452" className="w-11 h-auto" />
            </a>
            <a href="https://www.linkedin.com/in/komlankodoh" aria-label="linkedin contact" >
              <Linkedin fill="#0a66c2" className="w-11 h-auto" />
            </a>
          </div>
        </div>
      </PageSection>
    </>
  );
};

export default Page;

export const query = graphql`
  query MyQuery {
    projects: allContentfulProject {
      edges {
        node {
          previewUrl
          sourceCodeUrl
          techStack
          importance
          description
          name
          id
          previewImage {
            title
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 50)
          }
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
`;
