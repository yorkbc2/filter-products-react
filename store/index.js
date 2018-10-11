import {
    createStore,
    combineReducers
} from "redux";

import {
    productReducer,
    FETCH_PRODUCTS_START,
    FETCH_PRODUCTS_END,
    FETCH_PRODUCTS_ERROR
} from "./ducks/products";

import {
    fetchProducts
} from "./fns/products";

const reducers = combineReducers({
    products: productReducer
});

const store = createStore(reducers);

store.dispatch({type: FETCH_PRODUCTS_START});

fetchProducts()
    .then(response => store.dispatch({type: FETCH_PRODUCTS_END, payload: response.data}))
    .catch(error => store.dispatch({type: FETCH_PRODUCTS_ERROR, error: error}));

export default store;