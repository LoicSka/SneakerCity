import { findLast, filter } from 'lodash';

export const SET_CART_DATA = 'SET_CART_DATA';
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';

export const setCartData = (data) => (dispatch) => {
  dispatch({
    type: SET_CART_DATA,
    data
  });
}

export const addProductToCart = (product) => (dispatch, getState) => {
  const{ cart: { products } }  = getState();
  const productInCart = findLast(products, (p) => p.id === product.id && p.size === product.size);
  if (productInCart) {
    productInCart.quantity = productInCart.quantity + 1;
  } else {
    product.quantity = 1;
    products.push(product);
  }
  localStorage.setItem('cart', JSON.stringify(products))
   
  dispatch({
    type: ADD_PRODUCT_TO_CART,
    data: products
  })
}

export const removeProductFromCart = (product) => (dispatch, getState) => {
  var { cart: { products } }  = getState();
  const filteredProducts = filter(products, (p) => !(p.id === product.id && p.size === product.size));
  localStorage.setItem('cart', JSON.stringify(filteredProducts))
   
  dispatch({
    type: REMOVE_PRODUCT_FROM_CART,
    data: filteredProducts
  })
}