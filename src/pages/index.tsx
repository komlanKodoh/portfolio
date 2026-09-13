import { graphql } from "gatsby";
import React, { useState } from "react";
import { LinkButton } from "../components/Basic/Button";
import SeparationH from "../components/Basic/SeparationH";
import Linkedin from "../components/svg/Linkedin";
import FadeIn from "../components/Effect/Fade";
import Gmail from "../components/svg/Gmail";
import Phone from "../components/svg/Phone";
import ShowProject from "../components/BuildingBlocks/ShowProject";
import PageSection from "../components/BuildingBlocks/pageSection";
import DottyBg from "../components/Basic/DottyBg";
import { Variants, motion } from "framer-motion";
import { useNavStyle } from "../lib/hooks";

const cardVariants: Variants = {
  offscreen: {
    y: 20,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const skillCategories = [
  { category: "Frontend & UI", skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Gatsby", "HTML5/CSS3"] },
  { category: "Backend & APIs", skills: ["Node.js", "Python", "Java", "C#", "REST / GraphQL", "Express"] },
  { category: "Systems & Low-Level", skills: ["Rust", "Matrix Math", "Concurrent Systems", "Performance Optimization"] },
  { category: "Databases & Cloud", skills: ["PostgreSQL", "DynamoDB", "MySQL", "NoSQL", "AWS", "Docker"] },
];

const Page = () => {
  useNavStyle(
    {
      theme: "",
      height: 1,
    },
    0
  );

  return (
    <>
      {/* HERO SECTION */}
      <PageSection
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-20"
        theme="dark"
        index={1}
        id="Home"
        data-cy={"landing_home"}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d0d]/50 to-[#0d0d0d] pointer-events-none z-10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#3b82f6]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#1d4ed8]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="lm-size w-full grid lg:grid-cols-12 gap-12 items-center relative z-20">
          <div className="lg:col-span-7 space-y-6">
            <FadeIn
              id="badge"
              visible={true}
              type={"from_bottom"}
              preserve={true}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-medium text-zinc-300 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for Elite Engineering & AI Roles
              </div>
            </FadeIn>

            <FadeIn
              id="introduction"
              visible={true}
              type={"from_bottom"}
              preserve={true}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                Hi, I'm <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">Daniel Kodoh</span>
              </h1>
            </FadeIn>

            <FadeIn
              id="profession"
              visible={true}
              type={"from_bottom"}
              preserve={true}
              transition={{ duration: 0.8 }}
            >
              <p className="text-2xl sm:text-3xl font-semibold text-[#60a5fa] tracking-wide">
                Software Engineer & AI Systems Architect
              </p>
            </FadeIn>

            <FadeIn
              id="landing_text"
              visible={true}
              type={"from_left"}
              preserve={true}
              transition={{ duration: 0.9 }}
            >
              <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                I build high-performance distributed systems, resilient full-stack web applications, and cutting-edge artificial intelligence pipelines. Technology is an ever-evolving canvas of endless opportunities.
              </p>
            </FadeIn>

            <FadeIn
              id="cta_buttons"
              visible={true}
              type={"from_bottom"}
              preserve={true}
              transition={{ duration: 1 }}
            >
              <div className="flex flex-wrap gap-4 pt-2">
                <LinkButton
                  href="#Work"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] text-white font-medium shadow-lg shadow-[#3b82f6]/25 hover:opacity-95 transition-all text-sm tracking-wide"
                  data-cy={"call_to_action"}
                >
                  Explore Work
                </LinkButton>
                <LinkButton
                  href="#Contact"
                  className="px-8 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:bg-zinc-800/80 hover:text-white transition-all text-sm font-medium tracking-wide"
                >
                  Get In Touch
                </LinkButton>
              </div>
            </FadeIn>
          </div>

          {/* Hero Bento / Stats Card */}
          <div className="lg:col-span-5 hidden lg:block">
            <FadeIn
              id="hero_card"
              visible={true}
              type={"simple"}
              preserve={true}
              transition={{ duration: 1.2 }}
            >
              <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#60a5fa]/10 rounded-full blur-2xl group-hover:bg-[#60a5fa]/20 transition-all duration-500" />
                <div className="font-mono text-xs text-zinc-500 mb-4 tracking-wider uppercase">System Spec</div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/50 flex justify-between items-center">
                    <span className="text-zinc-400">Core Focus</span>
                    <span className="text-[#93c5fd]">Full-Stack & AI</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/50 flex justify-between items-center">
                    <span className="text-zinc-400">Primary Stack</span>
                    <span className="text-zinc-200">TS / React / Rust / Java</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/50 flex justify-between items-center">
                    <span className="text-zinc-400">Architecture</span>
                    <span className="text-emerald-400">Event-Driven & Microservices</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/50 flex justify-between items-center">
                    <span className="text-zinc-400">Status</span>
                    <span className="text-amber-400">Shipping Production Code</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        <DottyBg
          bgSize="1.5rem"
          color="rgba(255,255,255,0.08)"
          className="w-64 h-64 absolute -bottom-10 -left-10 z-0 pointer-events-none -sm:hidden"
        />
      </PageSection>

      {/* ABOUT SECTION */}
      <PageSection
        className="py-24 relative"
        id="About"
        theme="dark"
        index={2}
        data-cy="landing_about"
      >
        <div className="lm-size w-full">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              About Me
            </h2>
            <div className="w-16 h-1 bg-[#3b82f6] mx-auto rounded-full mb-6" />
            <p className="text-zinc-400 text-lg leading-relaxed">
              Passionate software engineer driven by complexity, elegant architecture, and continuous learning. Specializing in high-performance web applications and intelligent systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Engineering Philosophy</h3>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  I believe that exceptional software lies at the intersection of rigorous engineering principles and intuitive user experience. Whether designing high-throughput backend services in Java/Rust or crafting responsive reactive interfaces in TypeScript and React, my goal is always maintainability, performance, and scale.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/50 text-xs font-mono text-zinc-400">
                "Simplicity is prerequisite for reliability." — Edsger W. Dijkstra
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-md space-y-6">
              <h3 className="text-2xl font-bold text-white mb-2">Technical Mastery</h3>
              <div className="space-y-5">
                {skillCategories.map((group) => (
                  <div key={group.category} className="space-y-2">
                    <h4 className="text-xs font-mono tracking-wider text-[#93c5fd] uppercase">{group.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800/80 text-zinc-300 text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      {/* FEATURED PROJECTS SECTION */}
      <PageSection
        className="py-24 relative"
        index={3}
        id="Work"
        theme="dark"
        data-cy={"landing_projects"}
      >
        <div className="lm-size text-zinc-100 relative">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Featured Projects
            </h2>
            <div className="w-16 h-1 bg-[#3b82f6] mx-auto rounded-full mb-6" />
            <p className="text-zinc-400 text-lg">
              A curated selection of production-grade applications, AI platforms, and systems engineering projects.
            </p>
          </div>

          <div className="space-y-12">
            <ShowProject
              project={{
                name: "Aether AI Showcase",
                description: "An elegant single-page showcase of modern artificial intelligence capabilities: reason, see, speak, write code, and act. Features a hand-rolled canvas neural field animation engine, interactive streaming studio, and strict accessibility.",
                techStack: ["TypeScript", "React", "Tailwind CSS", "Vite", "Vitest"],
                previewUrl: "https://aether.komlankodoh.com/",
                sourceCodeUrl: "https://github.com/komlanKodoh/aether-ai",
                imageSrc: "/images/aether-preview.png",
              }}
              right={false}
            />
            <ShowProject
              project={{
                name: "Graph Algorithm Visualization",
                description: "This project aims to provide a visualization tool for graph algorithms. It offers an interactive environment to visualize the workings of various graph algorithms such as Breadth First Search, Dijkstra's Algorithm, and more.",
                techStack: ["Rust", "Wasm", "cloudflare", "matter-js", "nextjs", "pixi", "typescript"],
                previewUrl: "https://graph.komlankodoh.com/editor",
                sourceCodeUrl: "https://github.com/komlan-kodoh-project/graph-algorithms",
                imageSrc: "https://images.ctfassets.net/zh3fom3plzla/1Qh0AjHOLnQXkDglJUnRrB/c1315d57057843f5a6392cce739ba87e/Screenshot_from_2024-03-23_14-17-45.png?w=1920&h=1200&q=50&fm=png",
              }}
              right={true}
            />
            <ShowProject
              project={{
                name: "Conway's game of life",
                description: "A fast implementation of Conway's game of life. This implementation is fully configurable and allows users to share they configuration. It also support username/password authentication.",
                techStack: ["AWS ECS", "Docker", "Dynamodb", "Koa", "Rust", "Wasm"],
                previewUrl: "https://gameoflife.komlankodoh.com/",
                sourceCodeUrl: "https://github.com/KomlanKodoh/game-of-life",
                imageSrc: "https://images.ctfassets.net/zh3fom3plzla/2tIRvTs13FiZAlWuaFfu25/5443b868f6df7be5eb7f85dae19073f0/Screenshot_from_2022-07-19_11-58-49.png?w=1366&h=768&q=50&fm=png",
              }}
              right={false}
            />
            <ShowProject
              project={{
                name: "Easy responsive images",
                description: "A web application that creates responsive images for web, developers. With outstanding lighthouse scores, this serves many developers improve their application performances.",
                techStack: ["angular", "angular material", "docker", "golang", "nginx"],
                previewUrl: "https://optimizer.komlankodoh.com",
                sourceCodeUrl: "https://github.com/KomlanKodoh/responsive-images",
                imageSrc: "https://images.ctfassets.net/zh3fom3plzla/1nCAEN5BWKBfq4cmmPnfY5/1af6b8e25e86278ae767017500e34c35/Responsive_images.png?w=982&h=612&q=50&fm=png",
              }}
              right={true}
            />
            <ShowProject
              project={{
                name: "Scraper copier",
                description: "Scraper copier is a fast, powerful, and portable web scrapper. Given a root URL, it finds and retrieves all valuable files. Scrapper-copier can also serve the retrieved files through a minimal proxy that features live background caching. ",
                techStack: ["Jest", "SQLite & MySQL", "Typescript ( Node js)", "docker"],
                sourceCodeUrl: "https://github.com/Behemoth11/scraper-copier",
                imageSrc: "https://images.ctfassets.net/zh3fom3plzla/4xm9dupBo2Xr47oN7IXq4T/6da9497f9b21b71f7423abc3e41df9a8/Internet-Technology-Networking-Computer-Network-4091432-removebg.jpg?w=821&h=472&fl=progressive&q=50&fm=jpg",
              }}
              right={false}
            />
            <ShowProject
              project={{
                name: "KdShop - Commerce",
                description: "KdShop is a platform for retail businesses to present and manage their product. KdShop works closely with Facebook's graph API to help extends the visibility of its users.",
                techStack: ["Mongodb", "Next.js", "Sass", "Serverless Functions", "cloudinary"],
                previewUrl: "https://commerce-behemoth11.vercel.app/find?categories=all",
                imageSrc: "https://images.ctfassets.net/zh3fom3plzla/2hhhQYWpCKeW15rYWeGIx/723fab6b4d6b06e059d8586b2ce19abb/preview1.png?w=723&h=530&q=50&fm=png",
              }}
              right={true}
            />
          </div>
        </div>
      </PageSection>

      {/* CONTACT SECTION */}
      <PageSection
        theme="dark"
        className="py-24 relative flex justify-center items-center"
        index={4}
        id="Contact"
        data-cy="landing_contact"
      >
        <div className="lm-size w-full max-w-4xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Get In Touch
            </h2>
            <div className="w-16 h-1 bg-[#3b82f6] mx-auto rounded-full mb-6" />
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              I'm always open to discussing new engineering challenges, AI systems, full-stack opportunities, or collaborations. Let's connect!
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Email Card */}
            <a
              href="mailto:komlankodoh@gmail.com"
              className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl hover:border-[#3b82f6]/50 transition-all group flex flex-col justify-between shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-[#60a5fa]">
                  <Gmail fill="currentColor" className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-zinc-500 group-hover:text-[#93c5fd] transition-colors">Direct Mail →</span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Email Me</h3>
                <p className="text-zinc-400 text-sm font-mono truncate">komlankodoh@gmail.com</p>
              </div>
            </a>

            {/* Phone Card */}
            <a
              href="tel:5312256403"
              className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl hover:border-emerald-600/50 transition-all group flex flex-col justify-between shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-emerald-400">
                  <Phone fill="currentColor" className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-zinc-500 group-hover:text-emerald-400 transition-colors">Call / Text →</span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Phone</h3>
                <p className="text-zinc-400 text-sm font-mono">(531) 225-6403</p>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://www.linkedin.com/in/komlankodoh"
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl hover:border-sky-600/50 transition-all group flex flex-col justify-between shadow-xl sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-sky-400">
                  <Linkedin fill="currentColor" className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-zinc-500 group-hover:text-sky-400 transition-colors">Connect →</span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">LinkedIn</h3>
                <p className="text-zinc-400 text-sm font-mono">in/komlankodoh</p>
              </div>
            </a>
          </div>

          <div className="mt-8 p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/60 text-center text-zinc-400 text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Based in United States • Open to Remote & On-Site</span>
            </div>
            <a
              href="https://github.com/komlanKodoh"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-[#60a5fa] font-medium transition-colors"
            >
              Explore GitHub Profile →
            </a>
          </div>
        </div>
      </PageSection>
    </>
  );
};

export default Page;
