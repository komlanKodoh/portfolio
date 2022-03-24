import { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLVideoElement> {}

const Video: React.FC<Props> = ({ ...props }) => {
  return (
    <video {...props}>
      <video width="736" height="314" controls>
        <source src="https://youtu.be/nsPO-gXvbDc" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </video>
  );
};
