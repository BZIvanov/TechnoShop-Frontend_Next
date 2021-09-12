import { combineReducers } from 'redux';
import { apiCallReducer } from './api-call';
import { userReducer } from './user';
import { categoryReducer } from './category';
import { subcategoryReducer } from './subcategory';
import { productReducer } from './product';
import { searchReducer } from './search';
import { cartReducer } from './cart';
import { sidedrawerReducer } from './side-drawer';
import { couponReducer } from './coupon';
import { CODReducer } from './CODReducer';
import { stripeReducer } from './stripe';
import { orderReducer } from './order';
import { wishlistReducer } from './wishlist';

const rootReducer = combineReducers({
  apiCall: apiCallReducer,
  user: userReducer,
  category: categoryReducer,
  subcategory: subcategoryReducer,
  product: productReducer,
  search: searchReducer,
  cart: cartReducer,
  sidedrawer: sidedrawerReducer,
  coupon: couponReducer,
  COD: CODReducer,
  stripe: stripeReducer,
  order: orderReducer,
  wishlist: wishlistReducer,
});

export default rootReducer;
