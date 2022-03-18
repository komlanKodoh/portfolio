import React, { DetailedHTMLProps, ImgHTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {}

const createSrcSet = (src: string) => {
  let [left, right] = src.split(/\/upload/);

  let srcSet = "";

  srcSet = srcSet + left + "/upload/c_scale,w_1000" + right + " 1000w,";
  srcSet = srcSet + left + "/upload/c_scale,w_700" + right + " 700w,";
  srcSet = srcSet + left + "/upload/c_scale,w_300" + right + " 300w";

  return srcSet;
};

const MarkdownResponsiveImage: React.FC<Props> = ({ src, sizes, ...props }) => {
  console.log(src)
  return (
    <img
      src={src}
      srcSet = {src && createSrcSet(src)}
      {...props}
      sizes="(max-width: 900px) 80vw, 900px"
    ></img>
  );
};

export default MarkdownResponsiveImage;
