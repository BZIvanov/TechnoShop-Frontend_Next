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
      console.log(error);
      dispatch(apiCallFail('Get stripe client secret error'));
    }
  };
};

export const confirmPaymentAction = (token, stripe, card, name) => {
  return async (dispatch, getState) => {
    const clientSecret = getState().stripe.clientSecret;
    dispatch(apiCallStart());

    try {
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name,
          },
        },
      });

      await createOrderCall(paymentIntent, token);
      await emptyUserCartCall(token);

      dispatch(apiCallSuccess('Payment successful'));
      dispatch(removeFromCartAction());
    } catch (error) {
      console.log(error);
      dispatch(apiCallFail('Confirm stripe payment error'));
    }
  };
};
