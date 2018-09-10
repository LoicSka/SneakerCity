import { normalize, schema } from 'normalizr';
import { camelizeKeys, decamelizeKeys, camelize } from 'humps';
import forEach from 'lodash/forEach';
import * as qs from 'query-string';

const API_ROOT = process.env.REACT_APP_API_URL;

const callApi = (endpoint, schema, data = null, method = 'GET') => {
  var fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');

  switch (method) {
      case 'POST':
      case 'PUT':
        var body = JSON.stringify(data);
        return fetch(fullUrl, {
          method,
          body,
          headers,
      }).then(response => response.json().then(json => {
          console.log('RESPONSE', json);
          if (!response.ok) {
            return Promise.reject({ message: 'server.general'});
          }
          if (json.status !== '22000') {
          const { validations } = json;
          forEach(validations, (value, key) => {
              validations[key] = `errors.server.${camelize(value[0])}`
          })
            return Promise.reject({ message: 'server.general', validations: camelizeKeys(validations)});
          }
          const camelizedJson = camelizeKeys(json.result);
          return Object.assign(
            {},
            normalize(camelizedJson, schema)
          )
      }))
      case 'DELETE':
        return fetch(fullUrl, {
          method,
          body,
          headers,
      }).then(response => response.json().then(json => {
          if (!response.ok) {
          return Promise.reject({ message: 'server.general' });
          }
          const camelizedJson = camelizeKeys(data);
          return Object.assign(
          {},
          normalize(camelizedJson, schema)
          )
      }))
      default:
        if (data) {
          let query = qs.stringify(decamelizeKeys(data));
          fullUrl = `${fullUrl}/?${query}`;
        }
        return fetch(fullUrl, {
          method,
          headers
        }).then(response =>
          response.json().then(json => {
            console.log('RESPONSE', json);
            if (!response.ok) {
                return Promise.reject('server');
            }
            const { result = null } = json;
            const camelizedJson = camelizeKeys(result ? result : {})
            return Object.assign({},
              normalize(camelizedJson, schema),
            )
          })
      )
  }
};

// Normalizr Schemas
const productSchema = new schema.Entity('products', {}, {
  idAttribute: product => product.id
});

export const Schemas = {
  PRODUCT: productSchema,
  PRODUCT_ARRAY: [productSchema]
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }
  
  let { endpoint } = callAPI;
  const { schema = null, types, method, data } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!Array.isArray(types) || types.length < 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }
  
  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, schema, data, method).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      errors: error.validations
    }))
  );
}