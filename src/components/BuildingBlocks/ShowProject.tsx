import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { LinkButton } from "../Basic/Button";
import { Link } from "gatsby";

const ShowProject = ({ project, right }) => {
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-12 place-items-center my-16 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm shadow-2xl transition-all duration-300 hover:border-zinc-700">
      <div className="relative rounded-xl overflow-hidden w-full shadow-2xl shadow-black/60 group">
        {project.previewImage?.gatsbyImageData ? (
          <GatsbyImage
            className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
            image={project.previewImage?.gatsbyImageData}
            alt={project.previewImage?.title || "project preview"}
          />
        ) : project.imageSrc ? (
          <img
            src={project.imageSrc}
            alt={project.name || "project preview"}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-950 p-16 text-center text-zinc-400 font-mono">
            Preview
          </div>
        )}
      </div>
      <div
        className={`flex ${
          right && "col-start-1  row-start-1"
        } -sm:col-start-1 -sm:row-start-2 w-full`}
      >
        <div className="my-auto sm:text-right w-full">
          <h2 className="text-3xl font-bold my-4 text-zinc-100 tracking-tight">{project.name}</h2>
          <ul className="flex flex-start sm:justify-end gap-2 my-3 flex-wrap">
            {project.techStack?.sort().map((item) => (
              <li key={item}>
                <div className="rounded-full px-4 py-1 bg-zinc-800 text-zinc-300 text-xs font-medium tracking-wide inline-block my-1 border border-zinc-700/50">
                  {item}
                </div>
              </li>
            ))}
          </ul>
          <p className="text-justify sm:text-right text-zinc-400 text-sm leading-relaxed my-4">
            {project.description}
          </p>
          <div className="flex sm:justify-end gap-3 mt-6 flex-wrap">
            {project.moreAbout && (
              <Link
                to={project.moreAbout}
                className="inline-block px-5 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-white font-medium text-sm transition-all hover:bg-zinc-800"
              >
                More Details
              </Link>
            )}

            {project.previewUrl && (
              <LinkButton
                href={project.previewUrl}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] text-white font-medium text-sm transition-all hover:opacity-90 shadow-lg shadow-[#3b82f6]/20"
                target="_blank"
                theme="one"
              >
                Live Preview
              </LinkButton>
            )}
            {project.sourceCodeUrl && (
              <LinkButton
                target="_blank"
                href={project.sourceCodeUrl}
                className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-sm transition-all border border-zinc-700"
                theme="one"
              >
                Source Code
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProject;
