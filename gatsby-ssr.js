import React from 'react';
import Layout from './src/components/Layout';
import ReduxProvider from "./src/Redux/ReduxProvider";

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

export const wrapRootElement = ReduxProvider;