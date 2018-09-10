import { CALL_API, Schemas } from '../middleware/api';
import { values, findLast } from 'lodash';

export const PRODUCTS_REQUEST = 'PRODUCTS_REQUEST';
export const PRODUCTS_SUCCESS = 'PRODUCTS_SUCCESS';
export const PRODUCTS_FAILURE = 'PRODUCTS_FAILURE';

export const SORTED_PRODUCTS_REQUEST = 'SORTED_PRODUCTS_REQUEST';
export const SORTED_PRODUCTS_SUCCESS = 'SORTED_PRODUCTS_SUCCESS';
export const SORTED_PRODUCTS_FAILURE = 'SORTED_PRODUCTS_FAILURE';

export const PRODUCT_REQUEST = 'PRODUCT_REQUEST';
export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS';
export const PRODUCT_FAILURE = 'PRODUCT_FAILURE';

const fetchProducts = (pageNumber, sorted, types) => ({
  pageNumber: String(pageNumber),
  [CALL_API]: {
    types,
    endpoint: `products/?pageNumber=${pageNumber}&&sorted=${sorted}`,
    schema: Schemas.PRODUCT_ARRAY
  }
});

export const loadPaginatedProducts = (sorted) => (dispatch, getState) => {
  const productPages = values(sorted ? getState().pagination.sortedProducts : getState().pagination.paginatedProducts);
  const lastPageData = productPages[productPages.length - 1] || {};
  const {
    nextPage = 1,
    pageCount = 0
  } = lastPageData;
  if ((pageCount > 0 && !nextPage) ) {
    return null;
  }
  dispatch(fetchProducts(nextPage, sorted, sorted ? [SORTED_PRODUCTS_REQUEST, SORTED_PRODUCTS_SUCCESS, SORTED_PRODUCTS_FAILURE] : [PRODUCTS_REQUEST, PRODUCTS_SUCCESS, PRODUCTS_FAILURE]));
};

const fetchProduct = (permalink) => ({
  [CALL_API]: {
    types: [PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_FAILURE],
    endpoint: `products/${permalink}`,
    schema: Schemas.PRODUCT
  }
});

export const loadProduct = (permalink) => (dispatch, getState) => {
  const { products } = getState().entities;
  if (findLast(values(products), (product) => product.permalink === permalink)) {
    return null;
  } else {
    dispatch(fetchProduct(permalink));
  }
}
