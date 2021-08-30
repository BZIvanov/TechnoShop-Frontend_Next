import { combineReducers } from 'redux';
import { apiCallReducer } from './api-call';
import { userReducer } from './userReducer';
import { userReducer as UR } from './user';
import { searchReducer } from './searchReducer';
import { cartReducer } from './cartReducer';
import { drawerReducer } from './drawerReducer';
import { couponReducer } from './couponReducer';
import { CODReducer } from './CODReducer';

const rootReducer = combineReducers({
  apiCall: apiCallReducer,
  user: userReducer,
  userr: UR,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  coupon: couponReducer,
  COD: CODReducer,
});

export default rootReducer;
