import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { values, findLast } from 'lodash';

import { loadProduct } from '../actions'

class ProductPage extends Component {
  componentDidMount = () => {
    const { loadProduct, match: { params: { permalink }} } = this.props;
    loadProduct(permalink);
  }
  render() {
    const { product: { imageUrls = [], name, colorWay, price } } = this.props;
    return (
      <div className='product'>
        <div className='row px-2 py-4'>
          <div style={{ width: '100%' }} className='col-12'>
            <img style={{ height: 'auto', width: '100%' }} src={imageUrls[1]} alt='top'/>
          </div>
          <div className='product-details-top col-12 d-flex flex-column align-items-center justify-content-center'>
            <h4 className='product-details-top__name'>{name}</h4>
            <h3 className='product-details-top__color'>{colorWay}</h3>
            <h4 className='product-details-top__price'>${price}</h4>
            <div></div>
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
  console.log('PATHNAME', permalink);
  return {
    product: findLast(values(products), (product) => product.permalink === permalink) || {}
  }
};

export default withRouter(connect(mapStateToProps,{loadProduct})(ProductPage));