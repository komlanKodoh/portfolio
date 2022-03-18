import React from "react"
import { useSyncRef } from "./hooks";


export const useScrollBinding = (_element: HTMLElement | null, _id: string, scrollConfig?: {}) =>{

    const scrollBindings = React.useRef({});
    const element = useSyncRef(_element);
    const id = useSyncRef(_id);

    const takeSnapshot = () => {
        if (!element.current ) return;
        scrollBindings.current[id.current] = element.current.scrollTop;
    }

    React.useEffect(() => {
    
        if (!element.current) return;

        element.current.scrollTo({top: scrollBindings.current[_id] || 0});

    },[_id, _element])
    

    return {
        takeSnapshot
    }
}