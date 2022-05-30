import productReducer from './ProductReducer'
import driversReducer from './DriversReducer'

import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
const rootReducer = combineReducers({
    productReducer,
    driversReducer

});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default store;