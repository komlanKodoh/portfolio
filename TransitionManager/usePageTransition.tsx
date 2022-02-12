"strict";
import React from "react";
import {
  useFirstTimeLoading,
  useForcedRender,
  useSequentialState,
} from "../src/lib/hooks";
import { useTracker } from "../src/lib/utils";

type lifeCycleCallback = (ctx: { pageId: string; nextPageId: string }) => void;

interface lifeCycle {
  beforeSwap: lifeCycleCallback[];
  afterSwap: lifeCycleCallback[];
  onExit: lifeCycleCallback[];
}

// type waitList = Set<string>
export const usePageTransition = (
  children: React.ReactNode & { key: string }
) => {
  const firstTimeLoading = useFirstTimeLoading();
  const render = useForcedRender();

  const [activePage, setActivePage] = React.useState(children);
  const waitListRef = React.useRef(new Set() as Set<string>);

  const lifeCyclesRef = React.useRef<lifeCycle>({
    beforeSwap: [],
    afterSwap: [],
    onExit: [],
  });

  const pageState = useSequentialState(["rest", "exit", "enter"] as const, [
    "rest_enter",
    "exit_rest",
  ]);

  const executeLifeCycleCallBack = (lifeCycle: keyof lifeCycle) => {
    for (const callback of lifeCyclesRef.current[lifeCycle]) {
      callback({ pageId: activePage.key, nextPageId: children.key });
    }
  };

  const syncActivePage = () => {
    if (children.key === activePage.key) return;

    executeLifeCycleCallBack("beforeSwap");

    setActivePage(children);

    executeLifeCycleCallBack("afterSwap");

    waitListRef.current = new Set();
  };

  const waitFor = (id: string) => {
    waitListRef.current.add(id);
  };

  const removeHold = (id: string) => {
    waitListRef.current.delete(id);
    if (waitListRef.current.size === 0) pageState.tryChange("enter");
    // render();
  };

  const pageId = React.useMemo(() => {
    return activePage.key;
  }, [activePage]);

  React.useEffect(() => {
    if (firstTimeLoading) return;
    // there is a page change but the component is the same as the active one the page assumes a enter state;
    else if (children.key === activePage.key) pageState.tryChange("enter");
    else {
      pageState.tryChange("exit");
      executeLifeCycleCallBack("onExit");
    }
  }, [children]);

  React.useEffect(() => {
    if (waitListRef.current.size === 0) syncActivePage();
  }, [pageState.currentState, waitListRef.current.size]);

  const page = {
    ...pageState,
    id: pageId,
    waitFor,
    removeHold,
    addEventListener: (event: keyof lifeCycle, callback: lifeCycleCallback) => {
      const validKeys = Object.keys(lifeCyclesRef.current);
      if (validKeys.includes(event)) {
        console.log("Adding a new event listener", event);
        lifeCyclesRef.current[event].push(callback);
      }

      return true;
    },
  };

  return {
    activePage,
    pageState: page,
    Provider: RoutingStateProvider,
  };
};

export default usePageTransition;

interface RoutingStateContext {
  id: string;
  waitFor: (id: string) => void;
  removeHold: (id: string) => void;
  currentState: "exit" | "enter" | "rest";
  tryChange: (desiredState: "exit" | "enter" | "rest") => void;
  addEventListener: (
    event: keyof lifeCycle,
    callback: lifeCycleCallback
  ) => void;
}

const RoutingStateContext = React.createContext<RoutingStateContext>({
  id: "",
  currentState: "rest",
  waitFor: () => undefined,
  removeHold: () => undefined,
  addEventListener: () => undefined,
  tryChange: () => console.log("state Not available"),
});

export const RoutingStateProvider: React.FC<RoutingStateContext> = ({
  children,
  ...contextValues
}) => {
  return (
    <RoutingStateContext.Provider value={contextValues}>
      {children}
    </RoutingStateContext.Provider>
  );
};

export const useRoutingStateContext = () => {
  return React.useContext(RoutingStateContext);
};
