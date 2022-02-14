import { motion } from "framer-motion";
import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { updateSectionData } from "../../Redux/slices/section";
import { sectionData as sectionDataType } from "../../Redux/slices/section";

interface StateProps {}

interface DispatchProps {
  loadMyInfo: (sectionData: sectionDataType) => void;
}

interface ComponentProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  className: string;
  index: number;
  theme: string;
}

type Props = DispatchProps & ComponentProps;

const PageSection = ({
  index,
  theme,
  children,
  className,
  loadMyInfo,
  ...rest
}: Props) => {
  const sectionRef = React.useRef<HTMLDivElement>(null) as {
    current: HTMLDivElement;
  };

  const onResize = () =>
    loadMyInfo({ height: sectionRef.current.offsetHeight, theme });
    
  useEffect(() => {
    onResize();
  }, [sectionRef.current]);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.div
    //@ts-ignore
      ref={sectionRef}
      className={`${className} w-full`}
      {...rest}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

const mapStateToProps = () => {};
const mapDispatchToProps = (dispatch, ownProps: ComponentProps) => {
  return {
    loadMyInfo: (sectionData) =>
      dispatch(
        updateSectionData({ index: ownProps.index, sectionData: sectionData })
      ),
  };
};

export default connect<StateProps, DispatchProps, ComponentProps>(
  null,
  mapDispatchToProps
)(PageSection);
