import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { LinkButton } from "../Basic/Button";
import { Link } from "gatsby";

const ShowProject = ({ project, right }) => {
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-12 place-items-center my-12">
      <div className="relative rounded-md overflow-hidden  w-full shadow-xl shadow-black">
        <GatsbyImage
          className=" bg-blue-500"
          image={project.previewImage?.gatsbyImageData}
          alt={project.previewImage?.title || "decoration image"}
        />
      </div>
      <div
        className={`flex ${
          right && "col-start-1  row-start-1"
        } -sm:col-start-1 -sm:row-start-2`}
      >
        <div className="my-auto sm:text-right ">
          <h2 className=" text-2xl my-4">{project.name}</h2>
          <ul className="sm:flex flex-start justify-end gap-2  my-2 flex-wrap">
            {project.techStack?.sort().map((item) => (
              <li key={item}>
                <div className=" rounded-md px-4 py-0 bg-black inline-block my-1">
                  {item}
                </div>
              </li>
            ))}
          </ul>
          <p className="text-justify text-sm leading-7">
            {project.description}
          </p>
          <br />

          {project.moreAbout && (
            <Link
              to={project.moreAbout}
              className="inline-block px-4 py-1 border-2 bg-black text-white shadow undefined border-blue-500 mr-2"
            >
              more Details
            </Link>
          )}

          {project.previewUrl && (
            <LinkButton
              href={project.previewUrl}
              className={"mr-2 border-red-500"}
              target="_blank"
              theme="one"
            >
              Preview
            </LinkButton>
          )}
          {project.sourceCodeUrl && (
            <LinkButton
              target="_blank"
              href={project.sourceCodeUrl}
              theme="one"
            >
              View Code
            </LinkButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowProject;
