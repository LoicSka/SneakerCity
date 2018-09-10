import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Root from './containers/Root';
import configureStore from './store/configureStore';

import { setCartData } from './actions';

import './styles/styles.css';

const store = configureStore();

if (localStorage.cart) {
  store.dispatch(setCartData(JSON.parse(localStorage.cart)));
}

render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById('root')
)