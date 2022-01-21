import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { focusSection, updateSectionData } from "../../Redux/slices/section";
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

  useEffect(() => {
    loadMyInfo({ height: sectionRef.current.offsetHeight, theme });
  }, [sectionRef.current]);

  return (
    <div ref={sectionRef} className={`${className} w-full`} {...rest}>
      {children}
    </div>
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
