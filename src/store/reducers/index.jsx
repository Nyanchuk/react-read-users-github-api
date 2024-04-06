import { combineReducers } from 'redux'
import productReducers from './reducers';

const rootReducer = combineReducers({
  product: productReducers
});

export default rootReducer;