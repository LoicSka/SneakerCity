import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { values, findLast, filter } from 'lodash';

import { loadProduct } from '../actions';

import CartForm from '../components/CartForm';

class ProductPage extends Component {
  componentDidMount = () => {
    const { loadProduct, match: { params: { permalink }} } = this.props;
    loadProduct(permalink);
  }
  render() {
    const { product, product: { imageUrls = [], name, colorWay, price, decription } } = this.props;
    const productDescription = (expandDescription = false) => {
      return (
        <div className='product-details-top col-12 d-flex flex-column align-items-center'>
          <h4 className='product-details-top__name'>{name}</h4>
          <h3 className='product-details-top__color'>{colorWay}</h3>
          <h4 className='product-details-top__price'>${price}</h4>
          <p className={`product-details-top__desc pt-4 ${ expandDescription ? 'd-block' : 'd-none' }`}>{decription}</p>
          <div className='cart-form-ctn my-3 py-4'>
            <CartForm product={ product|| {} }/>
          </div>
        </div>
      )
    }
    return (
      <div className='product'>
        <div className='row px-2 py-4'>
          <div className='col-12'>
            <img className='img-fluid' src={imageUrls[1]} alt='top'/>
          </div>
          {productDescription()}
        </div>
        <div className='row p-4'>
          <div className='col-8'>
            <div className='row'>
              <div className='col-6 p-1'>
                <img className='product-grid-image' src={imageUrls[2]} alt='grid-1'/>
              </div>
              <div  className='col-6 p-1'>
                <img className='product-grid-image' src={imageUrls[3]} alt='grid-2'/>
              </div>
              <div className='col-6 p-1'>
                <img className='product-grid-image' src={imageUrls[4]} alt='grid-3'/>
              </div>
              <div className='col-6 p-1'>
                <img className='product-grid-image' src={imageUrls[5]} alt='grid-3'/>
              </div>
            </div>
          </div>
          <div className='col-4 d-flex flex-column align-items-center justify-content-center'>
            {productDescription(true)}
          </div>
        </div>
        <div className='row px-2 py-4'>
          <div className='col-12'>
            <img className='img-fluid' src={imageUrls[8]} alt='bottom'/>
          </div>
          <div className='col-12 my-4'>
            <img className='img-fluid' src={imageUrls[9]} alt='bottom'/>
          </div>
        </div>
      </div>
    )
  };
}

ProductPage.propTypes = {
  product: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const { entities: { products } } = state;
  const { match: { params: { permalink }} } = ownProps;
  return {
    product: findLast(values(products), (product) => product.permalink === permalink) || {}
  }
};

export default withRouter(connect(mapStateToProps,{loadProduct})(ProductPage));