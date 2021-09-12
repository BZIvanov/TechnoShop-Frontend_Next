import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Card } from 'antd';
import { DollarOutlined, CheckOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import Laptop from '../assets/images/laptop.png';
import { NAV_LINKS } from '../constants';
import {
  createPaymentIntentAction,
  confirmPaymentAction,
  apiCallFail,
  apiCallReset,
} from '../store/action-creators';

const cartStyle = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#32325d',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const StripeCheckout = () => {
  const { user } = useSelector((state) => state.user);
  const { totalPrice, totalAfterDiscount } = useSelector((state) => state.cart);
  const { loading, success, error } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    dispatch(createPaymentIntentAction(user.token));
  }, [dispatch, user.token]);

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
    if (error) {
      toast.error(error);
    }
    dispatch(apiCallReset());
  }, [success, error, dispatch]);

  // this is the payment card input field
  const handleChange = async (e) => {
    if (e.empty) {
      dispatch(apiCallFail('Card number is required'));
    }
    if (e.error) {
      dispatch(apiCallFail(e.error.message));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      confirmPaymentAction(
        user.token,
        stripe,
        elements.getElement(CardElement),
        e.target.name.value
      )
    );
  };

  return (
    <>
      <div>
        <p className='alert alert-success'>
          {totalAfterDiscount > 0
            ? `Total after discount: $${totalAfterDiscount}`
            : 'No coupon applied'}
        </p>
      </div>

      <div className='text-center pb-5'>
        <Card
          cover={
            <img
              src={Laptop}
              style={{
                height: '200px',
                objectFit: 'cover',
                marginBottom: '-50px',
              }}
              alt='product-preview'
            />
          }
          actions={[
            <>
              <DollarOutlined className='text-info' /> <br /> Total: $
              {totalPrice}
            </>,
            <>
              <CheckOutlined className='text-info' /> <br /> Total payable : $
              {(totalAfterDiscount > 0
                ? totalAfterDiscount
                : totalPrice
              ).toFixed(2)}
            </>,
          ]}
        />
      </div>

      <form id='payment-form' className='stripe-form' onSubmit={handleSubmit}>
        <CardElement
          id='card-element'
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className='stripe-button'
          disabled={loading || error || success}
        >
          <span id='button-text'>
            {loading ? <div className='spinner' id='spinner'></div> : 'Pay'}
          </span>
        </button>
      </form>

      {/* totalPrice is reset after successful payment */}
      <p
        className={
          totalPrice === 0 ? 'result-message' : 'result-message hidden'
        }
      >
        Payment Successful.{' '}
        <Link to={NAV_LINKS.USER_HISTORY.ROUTE}>
          Check your purchase history.
        </Link>
      </p>
    </>
  );
};

export default StripeCheckout;
