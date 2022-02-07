import React from "react";

interface RoutingStateContext {
  routingState: "exit" | "enter" | "rest";
  activePage: React.ReactNode;
}

const RoutingStateContext = React.createContext<RoutingStateContext>({
  routingState: "rest",
  activePage: null,
});

export const PageTransitionProvider: React.FC = () => {
  return (
    <RoutingStateContext.Provider value={{}}></RoutingStateContext.Provider>
  );
};

export const useRoutingStateContext = () => {
  return React.useContext(RoutingStateContext);
};
