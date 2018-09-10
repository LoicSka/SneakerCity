import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './Layout';

const LayoutContainer = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <Layout {...matchProps}>
        <Component {...matchProps} />
      </Layout>
    )} />
  )
}

export default LayoutContainer;