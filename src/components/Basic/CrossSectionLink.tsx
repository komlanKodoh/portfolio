import { Link } from "gatsby";
import React from "react";
import { useDispatch } from "react-redux";
import { useRoutingStateContext } from "../../../TransitionManager/usePageTransition";
import { useAppDispatch } from "../../lib/hooks";

const rest = {};

interface Props extends React.HTMLProps<HTMLAnchorElement> {}
function CrossSectionLink<Props>(props) {
  const router = useRoutingStateContext();

  return (
    <Link {...props} onClick={() => router.tryChange("exit")} >
      {props.children}
    </Link>
  );
}

export default CrossSectionLink;
