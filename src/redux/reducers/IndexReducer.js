import productReducer from './ProductReducer'
import driversReducer from './DriversReducer'
import ProgressBarReducer from './ProgressBarReducer';

import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
const rootReducer = combineReducers({
    productReducer,
    driversReducer,
    ProgressBarReducer

});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default store;