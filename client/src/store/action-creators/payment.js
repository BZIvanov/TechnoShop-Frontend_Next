import { createPaymentIntentCall } from '../../api/stripe';
import { createOrderCall } from '../../api/order';
import { emptyUserCartCall } from '../../api/user';
import {
  apiCallStart,
  apiCallSuccess,
  apiCallFail,
  removeFromCartAction,
} from './';
import { actionType } from '../action-types';
import { PAYMENT_TYPES } from '../../constants';

export const createPaymentIntentType = (clientSecret) => ({
  type: actionType.SET_CLIENT_SECRET,
  payload: clientSecret,
});

export const createPaymentIntentAction = (token) => {
  return async (dispatch) => {
    dispatch(apiCallStart());

    try {
      const { data } = await createPaymentIntentCall(token);

      dispatch(apiCallSuccess());
      dispatch(createPaymentIntentType(data));
    } catch (error) {
      dispatch(apiCallFail('Get stripe client secret error'));
    }
  };
};

export const confirmPaymentAction = (token, stripe, card, name) => {
  return async (dispatch, getState) => {
    const { paymentType, clientSecret } = getState().payment;
    dispatch(apiCallStart());

    try {
      let paymentInfo = {};

      if (paymentType === PAYMENT_TYPES.STRIPE) {
        const { paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card,
              billing_details: {
                name,
              },
            },
          }
        );
        paymentInfo = paymentIntent;
      }

      await createOrderCall({ paymentType, paymentInfo }, token);
      await emptyUserCartCall(token);

      dispatch(apiCallSuccess('Payment successful'));
      dispatch(removeFromCartAction());
    } catch (error) {
      dispatch(apiCallFail('Confirm stripe payment error'));
    }
  };
};

export const setPaymentTypeAction = (paymentType) => ({
  type: actionType.SET_PAYMENT_TYPE,
  payload: paymentType,
});
