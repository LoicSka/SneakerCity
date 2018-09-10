import * as ActionTypes from '../actions';
import paginate from './paginate';
import { combineReducers } from 'redux';
import { merge } from 'lodash';

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { products: {} }, action) => {
    if (action.response && action.response.entities) {
      return merge({}, state, action.response.entities);
    }
    return state;
};

const listDisplayMode = ( state = { listDisplayMode: 'grid' }, action) => {
    const { type, data } = action;
    if (type === ActionTypes.TOGGLE_LIST_DISPLAY_MODE) {
        return data;
    } else {
        return state.listDisplayMode || 'grid';
    }
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
    paginatedProducts: paginate({
        mapActionToKey: action => action.pageNumber,
        types: [
            ActionTypes.PRODUCTS_REQUEST,
            ActionTypes.PRODUCTS_SUCCESS,
            ActionTypes.PRODUCTS_FAILURE
        ]
    }),
    sortedProducts: paginate({
        mapActionToKey: action => action.pageNumber,
        types: [
            ActionTypes.SORTED_PRODUCTS_REQUEST,
            ActionTypes.SORTED_PRODUCTS_SUCCESS,
            ActionTypes.SORTED_PRODUCTS_FAILURE
        ]
    })
})

const rootReducer = combineReducers({
    entities,
    pagination,
    listDisplayMode
});
  
export default rootReducer;