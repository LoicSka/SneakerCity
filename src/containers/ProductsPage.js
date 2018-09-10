import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { values, flattenDeep, isEmpty } from 'lodash';
import * as qs from 'query-string';

import ProductList from '../components/ProductList';

import { loadPaginatedProducts } from '../actions';

class ProductsPage extends Component {
  fecthProducts = (search) => {
    const { loadPaginatedProducts, location } = this.props;
    const { s } = typeof(search) === 'string' ? qs.parse(search) : qs.parse(location.search);
    console.log('HERE MAte', s);
    s === 'latest' ? loadPaginatedProducts(true) : loadPaginatedProducts();
  }

  componentWillReceiveProps = (newProps) => {
    const { location: { search }, products } = newProps;
    if(search !== this.props.location.search && isEmpty(products)) {
      this.fecthProducts(search);
    }
  }
  
  componentDidMount = () => {
    const { location: { search } } = this.props;
    this.fecthProducts(search);
  };

  render() {
    const { listDisplayMode = 'grid', products, isFetching } = this.props;
    return (
      <div>
        <ProductList isFetching={isFetching} products={products} listDisplayMode={listDisplayMode}/>
        { !isFetching && products.length > 0 ? <div style={{ height: '200px' }} className='d-flex justify-content-center align-items-center py-4'><button onClick={this.fecthProducts} className='btn btn-outline-primary'>Load more</button></div> : null}
      </div>
    );
  };
}

ProductsPage.propTypes = {
  products: PropTypes.array,
  isFetching: PropTypes.bool,
  listDisplayMode: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  const { entities: { products }, listDisplayMode, pagination: { paginatedProducts, sortedProducts } } = state;
  const { location: { search } } = ownProps;
  const { s } = qs.parse(search);
  const paginatedProductsValues = values(paginatedProducts);
  const sortedProductsValues = values(sortedProducts);
  const isProductsLoading = paginatedProductsValues[paginatedProductsValues.length - 1] ? paginatedProductsValues[paginatedProductsValues.length - 1].isFetching : false;
  const isSortedProductsLoading = sortedProducts[sortedProducts.length - 1] ? sortedProducts[sortedProducts.length - 1].isFetching : false;
  const paginatedProductsIds = paginatedProductsValues.map((product) => product.ids);
  const sortedProductsIds = sortedProductsValues.map((product) => product.ids);
  
  return {
    products: s === 'latest' ? flattenDeep(sortedProductsIds).map((id) => products[id]) : flattenDeep(paginatedProductsIds).map((id) => products[id] ),
    isFetching: s === 'latest' ? isSortedProductsLoading : isProductsLoading,
    listDisplayMode
  }
};

export default withRouter(connect(mapStateToProps, {loadPaginatedProducts})(ProductsPage));