import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import { LinkButton } from "../components/Basic/Button";
import Img from "gatsby-image";
import Human from "../components/svg/Human";
import ContactForm from "../components/BuildingBlocks/ContactForm";
import SeparationH from "../components/Basic/SeparationH";
import Linkedin from "../components/svg/Linkedin";
import FadeIn from "../components/Effect/Fade";
import Gmail from "../components/svg/Gmail";
import Phone from "../components/svg/Phone";
import ShowProject from "../components/BuildingBlocks/ShowProject";
import PageSection from "../components/BuildingBlocks/pageSection";
import DottyBg from "../components/Basic/DottyBg";
import StandingHuman from "../components/svg/Human/Standing";
import { Variants, motion, Transition } from "framer-motion";
import { useNavStyle } from "../lib/hooks";

const cardVariants: Variants = {
  offscreen: {
    scale: 0.8,
    opacity: 0,
  },
  onscreen: {
    scale: 1,
    opacity: 1,
    // transition: {duration: 0.7, damping: 0, velocity: 0.2}
  },
};

type d = (keyof Transition)[];

const Page = ({ data }) => {
  const [int_index, setInt_index] = useState(10);

  useNavStyle(
    {
      theme: "",
      height: 1,
    },
    0
  );

  return (
    <>
      <PageSection
        className="   relative  -sm:h-auto max-h-[900px]"
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
                visible={true}
                type={"from_bottom"}
                preserve={true}
                transition={{ ease: "easeOut", duration: 1 }}
              >
                <span className=" text-zinc-200">Hello, I am </span>
                <span className=" text-zinc-200 underline underline-offset-4">
                  Daniel
                </span>
              </FadeIn>
              <FadeIn
                id="profession"
                visible={true}
                type={"from_bottom"}
                preserve={true}
                transition={{ ease: "easeOut", duration: 1.0 }}
              >
                <span className=" text-4xl block py-2">
                  An aspiring software engineer
                </span>
              </FadeIn>
            </p>

            <FadeIn
              id="landing_text"
              visible={true}
              type={"from_left"}
              preserve={true}
              transition={{ ease: "easeOut", duration: 1 }}
            >
              <p className="m-0 py-2 text-gray-500">
                To me, <strong className="text-gray-400"> technology </strong>{" "}
                is <strong className="text-gray-400">beautiful </strong>.
                Because of its ever-changing nature that creates an environment
                with{" "}
                <strong className="text-gray-400">
                  {" "}
                  endless opportunities{" "}
                </strong>
                . An environment with always more to learn.
              </p>
              <LinkButton
                href="#Contact"
                className="w-fit h-full block mt-3 border-red-600 bg-neutral-900"
                data-cy={"call_to_action"}
              >
                Get In Touch
              </LinkButton>
            </FadeIn>

            <FadeIn
              id="human_svg_sm"
              visible={true}
              type={"simple"}
              preserve={true}
              transition={{ duration: 3, delay: 0 }}
            >
              <Human className="sm:hidden w-1/2 h-auto float-right my-8" />
            </FadeIn>
          </div>
          <FadeIn
            id="human_svg_big"
            visible={true}
            type={"simple"}
            preserve={true}
            transition={{ duration: 2, delay: 0 }}
          >
            <Human className="hidden sm:block my-auto w-full float-right" />
          </FadeIn>

          <DottyBg
            bgSize="1em"
            color="white"
            className=" w-52 h-72 absolute bottom-0  -left-4  z-10 -sm:hidden -translate-x-full translate-y-1/2 "
          />

          <DottyBg
            bgSize="1em"
            color="white"
            className=" w-52 h-52 absolute top-9 -z-10 right-0 -sm:hidden translate-x-1/2"
          />
        </div>
      </PageSection>
      <PageSection
        className="   flex text-white relative flex-wrap"
        id="About"
        theme="dark"
        index={2}
        data-cy="landing_about"
      >
        <div className="lm-size w-full grid md:grid-cols-2  py-10 text-justify">
          <h1 className=" text-2xl text-center sm:hidden underline">
            {" "}
            About me{" "}
          </h1>
          <motion.div
            className=" w-full h-auto md:-translate-x-12f lex"
            variants={cardVariants}
          >
            <StandingHuman className="w-full h-auto p-8 my-auto" />
          </motion.div>

          <motion.div className="max-w-prose m-auto " variants={cardVariants}>
            <h1 className=" text-4xl -sm:hidden text-center m-4 underline ">
              About me
            </h1>
            <p className=" leading-loose ">
              I am Daniel, a computer science major. I like learning about new
              technology and building interactive user experiences.
              <br />
              <br /> While I explore all kinds of technologies, my set of skills
              makes me very qualified for web-related development. My knowledge
              of front-end and back-end technologies helps me create fast and
              reliable web experiences
            </p>

            <ul className="flex gap-5 flex-wrap">
              {[
                "postgres",
                "C#",
                "Dynamo DB",
                "My sql",
                "Java",
                "CSS",
                "HTML",
                "React",
                "Vue",
                "NoSql",
                "Typescript",
                "Rust"
              ].map((item, index) => (
                <li className="underline text-blue-500 inline-block whitespace-nowrap" key={item}>
                  #{item}{ "  "}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </PageSection>
      <PageSection
        className="flex"
        index={3}
        id="Work"
        theme="dark"
        data-cy={"landing_projects"}
      >
        <div className="lm-size text-blue-200 relative flex-wrap ">
          <h1 className=" text-4xl -sm:text--2xl text-center mb-12 underline py-6">
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
        theme="dark"
        className="  flex text-white justify-center align-center "
        index={4}
        id="Contact"
        data-cy="landing_contact"
      >
        <div className="lm-size py-6 px-2 w-[60ch] max-w-full ">
          <h1 className=" text-4xl -sm:text-2xl text-center underline m-4">
            Contact Me
          </h1>
          <ContactForm />
          <SeparationH color="black" padding="1em">
            or
          </SeparationH>
          <div className="flex justify-center gap-4">
            <a href={"mailto:komlankodoh@gmail.com"} aria-label="gmail contact">
              <Gmail fill="white" className="w-11 h-auto" />
            </a>
            <a href="tel:5312256403" aria-label="phone contact">
              <Phone fill="#36f5b2" className="w-11 h-auto" />
            </a>
            <a
              href="https://www.linkedin.com/in/komlankodoh"
              aria-label="linkedin contact"
            >
              <Linkedin fill="#1ca7f4" className="w-11 h-auto" />
            </a>
          </div>
        </div>
      </PageSection>
    </>
  );
};

Page.getValues = "newstring";

export default Page;

export const query = graphql`
  query MyQuery {
    projects: allContentfulProject ( sort: {fields: createdAt, order: DESC} ) {
      edges {
        node {
          previewUrl
          sourceCodeUrl
          techStack
          importance
          moreAbout
          description
          name
          id
          previewImage {
            title
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              quality: 50
            )
          }
        }
      }
    }
  }
`;
