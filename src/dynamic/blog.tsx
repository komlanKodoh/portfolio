import * as React from "react";
import { Link } from "gatsby";
import { useNavStyle } from "../lib/hooks";
import { Helmet } from "react-helmet";

const UsingDSG = () => {
  useNavStyle(
    {
      theme: "dark",
    },
    0
  );

  return (
    <div className="pt-24 text-white pb-16 max-w-4xl mx-auto px-5">
      <Helmet>
        <title>Blog Post | Daniel Kodoh</title>
      </Helmet>
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">Blog Post</h1>
      <p className="text-zinc-400 text-lg leading-relaxed">
        Articles and tutorials are currently being updated. Check back soon for deep dives into AI engineering, Rust, and React architecture!
      </p>
      <div className="mt-8">
        <Link to="/blog" className="px-6 py-3 rounded-xl bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-all">
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
};

export default UsingDSG;
