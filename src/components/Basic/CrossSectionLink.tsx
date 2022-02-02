import { Link } from "gatsby";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../lib/hooks";
import {
  scheduleTransition,
  startTransition,
} from "../../Redux/slices/pageTransition";
import { createControllerOnContainer, createControllerScreenCenter } from "../svg/presetAnimationFrame";

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
          scheduleTransition([
            1,
            [rest, offset, center],

            // "offset",
            // "center",
            // "centerShow",
            // "centerSmall",
            // "bgFull",
            // "wordFull",
          ])
        )
      }
    >
      {props.children}
    </Link>
  );
}

export default CrossSectionLink;
