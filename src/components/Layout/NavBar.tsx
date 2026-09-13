import React, { useState } from "react";
import CrossSectionLink from "../Basic/CrossSectionLink";
import { useRoutingStateContext } from "../../../TransitionManager/usePageTransition";
import { useSectionIs } from "../../lib/hooks";

interface ComponentProps {
  Links: string[];
}

const NavBar = ({ Links }: ComponentProps) => {
  const [open, setOpen] = useState(false);
  const page = useRoutingStateContext();
  const blogIsShown = useSectionIs("/blog", page.id);

  return (
    <nav className="sticky top-0 w-full z-50 backdrop-blur-md bg-[#0d0d0d]/85 border-b border-zinc-800/80 transition-all">
      <div className="max-w-screen-lg mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <CrossSectionLink to="/#Home" className="text-lg font-extrabold tracking-wider text-white hover:text-red-500 transition-colors">
            KODOH
          </CrossSectionLink>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-8 text-sm font-medium text-zinc-300">
          {!blogIsShown && Links.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className="hover:text-white transition-colors tracking-wide"
            >
              {link}
            </a>
          ))}
          <CrossSectionLink
            to="/blog"
            className="text-red-500 font-semibold hover:text-red-400 transition-colors tracking-wide"
          >
            BLOG
          </CrossSectionLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="sm:hidden p-2 text-zinc-300 hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="sm:hidden absolute top-16 left-0 w-full bg-[#0d0d0d]/95 backdrop-blur-xl border-b border-zinc-800 py-6 px-6 shadow-2xl">
          <ul className="flex flex-col gap-4 text-center text-lg font-medium text-zinc-200">
            {!blogIsShown && Links.map((link) => (
              <li key={link}>
                <a
                  href={`#${link}`}
                  onClick={() => setOpen(false)}
                  className="block py-2 hover:text-red-500 transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
            <li>
              <CrossSectionLink
                to="/blog"
                onClick={() => setOpen(false)}
                className="block py-2 text-red-500 font-bold"
              >
                Blog
              </CrossSectionLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
