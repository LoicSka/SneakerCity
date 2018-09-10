import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import LayoutContainer from './LayoutContainer';
import ProductsPage from './ProductsPage';
import ProductPage from './ProductPage';
import CheckoutPage from './CheckoutPage';

const Root = ({ store }) => (
  <Provider store={store}>
  <div>
    <LayoutContainer exact path='/' component={ProductsPage} />
    <LayoutContainer exact path='/p/:permalink' component={ProductPage} />
    <LayoutContainer exact path='/checkout' component={CheckoutPage} />
  </div>
  </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};
export default Root;