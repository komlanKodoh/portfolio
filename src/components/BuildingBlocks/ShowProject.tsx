import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { LinkButton } from "../Basic/Button";

const ShowProject = ({ project, right }) => {

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-12 place-items-center my-4">
      <div className="relative rounded-md overflow-hidden w-full">
        <GatsbyImage
          className=""
          image={project.previewImage?.gatsbyImageData}
          alt={project.previewImage?.title}
        />
        <div className="absolute w-full bg-red top-0 left-0 bg-slate-900"></div>
      </div>
      <div className={`flex ${right && "col-start-1  row-start-1"} -sm:col-start-1`}>
        <div className="my-auto sm:text-right ">
          <h2 className=" text-2xl my-4">{project.name}</h2>
          <ul className="sm:flex flex-start justify-end gap-2  my-2 flex-wrap">
            {project.techStack?.sort().map(
              (item) => (
                <li key={item}>
                  <div className=" rounded-md px-4 py-0 bg-black inline-block my-1">
                    {item}
                  </div>
                </li>
              )
            )}
          </ul>
          <p className="text-justify text-sm leading-7">
            {project.description}
          </p>
          <br />
          <LinkButton
            href={project.previewUrl}
            className={"mr-2 shadow-2xl border-red-500"}
            target="_blank"
            theme="one"
          >
            Preview
          </LinkButton>
          <LinkButton target="_blank" href={project.sourceCodeUrl} theme="one">
            View Code
          </LinkButton>
        </div>
      </div>
    </div>
  );
};

export default ShowProject;
