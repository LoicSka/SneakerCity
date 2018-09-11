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
      const list = products.map((product, index) => {
        const { id, name, colorWay, releaseDate = '', price } = product;
        return (
          <div key={`${id}_${releaseDate}_${index}`} className={`col-${isDisplayGrid ? 4 : 2} p-${isDisplayGrid ? 2 : 1} product-ctn`}>
            <Link to={`/p/${product.permalink}`} className='product-desc-link d-flex flex-column'>
              <div style={{ minHeight: `${isDisplayGrid ? '500px' : '200px'}`}} className='product-image-ctn'><img className='product-image' style={{ width: '100%'}} src={product.imageUrls[0]} alt='product'/></div>
              <div className={`product-desc py-4 flex-column justify-content-center align-items-center ${isDisplayGrid ? 'd-flex' : 'd-none'}`}>
                <h4 className='product-desc__title'>{name}</h4>
                <h3 className='product-desc__colorway'>{colorWay}</h3>
                <h4 className='product-desc__date pt-1'>{releaseDate.slice(0,10).replace(/-/g, '/')}</h4>
                <div className='product-desc__button-ctn d-flex flex-column justify-content-center align-items-center'>
                  <button className='btn btn-primary'>buy ${price}</button>
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

