import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import LayoutContainer from './LayoutContainer';
import ProductsPage from './ProductsPage';

const Root = ({ store }) => (
  <Provider store={store}>
  <div>
    <LayoutContainer exact path='/' component={ProductsPage} />
  </div>
  </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};
export default Root;