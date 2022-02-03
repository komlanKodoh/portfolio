import { Link } from "gatsby";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../lib/hooks";
import {
  scheduleTransition,
} from "../../Redux/slices/pageTransition";

const rest = {
  
}

interface Props extends React.HTMLProps<HTMLAnchorElement> {}
function CrossSectionLink<Props>(props) {
  const dispatch = useAppDispatch();

  return (
    <Link
      {...props}
      onClick={() =>
        dispatch(
          scheduleTransition("basic")
        )
      }
    >
      {props.children}
    </Link>
  );
}

export default CrossSectionLink;
