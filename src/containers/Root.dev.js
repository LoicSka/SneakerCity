import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import LayoutContainer from './LayoutContainer';
import ProductsPage from './ProductsPage';
import ProductPage from './ProductPage';

const Root = ({ store }) => (
  <Provider store={store}>
  <div>
    <LayoutContainer exact path='/' component={ProductsPage} />
    <LayoutContainer exact path='/:permalink' component={ProductPage} />
    <DevTools />
  </div>
  </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;