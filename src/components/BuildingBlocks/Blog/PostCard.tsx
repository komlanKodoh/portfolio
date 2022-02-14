import { motion } from "framer-motion";
import { Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

interface Props {
  title: string;
  extract: string;
  createdAt: string;
  thumbnail: { gatsbyImageData: IGatsbyImageData };
}

var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function convertDate(date_str) {
  const temp_date = new Date(date_str).toLocaleDateString().split("/");

  return (
    months[Number(temp_date[1]) - 1] + " " + temp_date[0] + ", " + temp_date[2]
  );
}

const PostCard: React.FC<Props> = ({
  title,
  extract,
  thumbnail,
  createdAt,
}) => {
  return (
    <motion.div
    initial="rest"
      whileHover={"hover"}
      variants={{
        hover: { y: -2 },
        // rest: {y:1}
      }}
      className="m-2 w-full overflow-hidden max-w-md leading-7 z-10 rounded-md"
    >
      <motion.div
        variants={{ hover: { scale: 1.05 } }}
        className="relative -z-10"
      >
        <GatsbyImage
          className="w-full"
          image={thumbnail.gatsbyImageData}
          alt={`article "${title}"'s thumbnail `}
        />
      </motion.div>

      <motion.div className="p-4 origin-bottom bg-black text-white">
        <h2 className={" font-bold  text-xl  my-2 text-slate-700 "}> {title}</h2>
        <p className={" text-slate-300 my-4"}>{extract}</p>
        <span className="text-gray-700 text-sm">{convertDate(createdAt)} </span>
        <Link className="text-green-500 underline block float-right" to={`./${title.replace(/ /g, "-")}`} >
          
          {"Read >>"}
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default PostCard;
