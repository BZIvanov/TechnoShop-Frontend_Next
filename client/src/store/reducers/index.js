import { combineReducers } from 'redux';
import { apiCallReducer } from './api-call';
import { userReducer } from './user';
import { categoryReducer } from './category';
import { subcategoryReducer } from './subcategory';
import { productReducer } from './product';
import { searchReducer } from './search';
import { cartReducer } from './cartReducer';
import { drawerReducer } from './drawerReducer';
import { couponReducer } from './couponReducer';
import { CODReducer } from './CODReducer';

const rootReducer = combineReducers({
  apiCall: apiCallReducer,
  user: userReducer,
  category: categoryReducer,
  subcategory: subcategoryReducer,
  product: productReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  coupon: couponReducer,
  COD: CODReducer,
});

export default rootReducer;
