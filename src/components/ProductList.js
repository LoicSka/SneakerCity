import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { chunk } from 'lodash';
import Loader from './Loader';

class ProductList extends Component {
  render() {
    const { products = [], listDisplayMode = 'grid', isFetching } = this.props;
    const isDisplayGrid = listDisplayMode === 'grid';
    const generateProductList = (products) => {
      const list = products.map((product) => {
        return (
          <div key={product.id} className={`col-${isDisplayGrid ? 4 : 2} p-${isDisplayGrid ? 2 : 1} product-ctn`}>
            <Link to={`/${product.permalink}`} className='d-flex flex-column'>
              <div style={{ minHeight: `${isDisplayGrid ? '500px' : '200px'}`}} className='product-image-ctn'><img className='product-image' style={{ width: '100%'}} src={product.imageUrls[0]} alt='product'/></div>
              <div className={`product-desc py-4 flex-column justify-content-center align-items-center ${isDisplayGrid ? 'd-flex' : 'd-none'}`}>
                <h4 className='product-desc__title'>{product.name}</h4>
                <h3 className='product-desc__colorway'>{product.colorWay}</h3>
                <div className='product-desc__button-ctn d-flex flex-column justify-content-center align-items-center'>
                  <button className='btn btn-primary'>buy ${product.price}</button>
                </div>
              </div>
            </Link>
          </div>
        )
      });
      return list;
    };
    const productList = chunk(products, isDisplayGrid ? 3 : 6).map((productGroup, index) => {
      return (
        <div key={index} className='row'>
          {generateProductList(productGroup)}
        </div>
      )
    });

    return (
      <div className='product-list p-4'>
        {productList}
        { isFetching ? <Loader /> : null }
      </div>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.array,
  listDisplayMode: PropTypes.string,
  isFetching: PropTypes.bool
};

export default ProductList;

