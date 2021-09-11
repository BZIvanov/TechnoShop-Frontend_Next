import { actionType } from '../action-types';

const initialState = {
  coupons: [],
  userCoupon: '',
};

export const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_COUPONS:
      return { ...state, coupons: action.payload };
    case actionType.CREATE_COUPON:
      return { ...state, coupons: [...state.coupons, action.payload] };
    case actionType.REMOVE_COUPON:
      const filteredCoupons = state.coupons.filter(
        (coupon) => coupon._id !== action.payload
      );
      return { ...state, coupons: filteredCoupons };
    case actionType.APPLY_COUPON:
      return { ...state, userCoupon: action.payload };
    default:
      return state;
  }
};
