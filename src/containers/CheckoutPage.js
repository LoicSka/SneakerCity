import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { removeProductFromCart } from '../actions';

class CheckoutPage extends Component {
  
  render() {
    const { products, removeProductFromCart } = this.props;
    const cart = products.map((product) => {
      const { colorWay, size, quantity, name, price } = product;
      const removeProduct = () => {
        removeProductFromCart(product);
      };
      return (
        <div className='col-12'>
          <div className='cart-product row p-3'>
            <div className='col-3'>
              <img className='img-fluid' src={product.image} alt='thumbnail'/>
            </div>
            <div className='col-6 px-4 d-flex flex-column'>
              <p style={{textDecoration: 'underline'}} ><b>{name + ' ' + colorWay}</b></p>
              <p><b>Size:</b> {size}</p>
              <p><b>Color:</b> {colorWay}</p>
              <p><b>Qty:</b> {quantity}</p>
              <div className='flex flex-row'>
                <button onClick={removeProduct} className='btn btn-outline-primary mr-3'>Remove</button>
                <button className='btn btn-outline-primary'>Checkout</button>
              </div>
            </div>
            <div className='col-3'>
              <p className='danger'><b>${Number(quantity || 1) * Number(price) }</b></p>
            </div>
          </div>
        </div>
      )
    });
    return (
      <div className='container mt-4'>
        <div className='row py-4'>
          <div className='col-8'>
            <div class='card row'>
              <div class='card-header'>
                <h4>Your cart({products.length})</h4>
              </div>
              <div className='card-body'>
                {cart}
              </div>
            </div>
          </div>
          <div className='col-4'></div>
        </div>
      </div>
    );
  }
}

CheckoutPage.propTypes = {
  products: PropTypes.array,
};

const mapStateToProps = (state) => {
  const { cart: { products } } = state;
  return {
    products
  }
};

export default withRouter(connect(mapStateToProps, {removeProductFromCart})(CheckoutPage));
