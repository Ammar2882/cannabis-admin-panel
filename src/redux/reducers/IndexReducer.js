import productReducer from './ProductReducer'
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
const rootReducer = combineReducers({
    productReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default store;