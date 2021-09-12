import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { emptyUserCart, createCashOrderForUser } from '../functions/user';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  updateUserAction,
  getUserCartAction,
  emptyUserCartAction,
  applyCouponAction,
  applyDiscountCouponAction,
  apiCallReset,
} from '../store/action-creators';
import { NAV_LINKS } from '../constants';

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart, totalPrice, totalAfterDiscount } = useSelector(
    (state) => state.cart
  );
  const { success, error } = useSelector((state) => state.apiCall);
  const { userCoupon } = useSelector((state) => state.coupon);
  const { COD, coupon: isCouponApplied } = useSelector((state) => ({
    ...state,
  }));

  const history = useHistory();
  const dispatch = useDispatch();

  const [address, setAddress] = useState(user.address || '');

  useEffect(() => {
    dispatch(getUserCartAction(user.token));
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

  const emptyCart = () => {
    dispatch(emptyUserCartAction(user.token));
  };

  const updateUserAddress = () => {
    dispatch(updateUserAction({ address }, user.token));
  };

  const applyDiscountCoupon = () => {
    dispatch(applyDiscountCouponAction({ coupon: userCoupon }, user.token));
  };

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, isCouponApplied).then((res) => {
      if (res.data.ok) {
        if (typeof window !== 'undefined') localStorage.removeItem('cart');

        dispatch({
          type: 'ADD_TO_CART_',
          payload: [],
        });
        dispatch({
          type: 'COD',
          payload: false,
        });

        emptyUserCart(user.token)
          .then(() => {
            history.push(NAV_LINKS.USER_HISTORY.ROUTE);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div className='row'>
      <div className='col-md-6'>
        <h4>Delivery Address</h4>
        <ReactQuill theme='snow' value={address} onChange={setAddress} />
        <button className='btn btn-primary mt-2' onClick={updateUserAddress}>
          Save
        </button>

        <hr />

        <h4>Got Coupon?</h4>
        <input
          type='text'
          value={userCoupon}
          onChange={(e) => {
            dispatch(applyCouponAction(e.target.value));
          }}
          className='form-control'
        />
        <button onClick={applyDiscountCoupon} className='btn btn-primary mt-2'>
          Apply
        </button>
      </div>

      <div className='col-md-6'>
        <h4>Order Summary</h4>
        <hr />
        <p>{cart.length} products</p>
        <hr />
        {cart.map(({ _id, title, color, count, price }) => (
          <div key={_id}>
            <p>
              {title} ({color}) x {count} = {price * count}
            </p>
          </div>
        ))}
        <hr />
        <p>Cart Total: {totalPrice}</p>
        {totalAfterDiscount > 0 && (
          <p className='bg-success p-2'>
            Discount Applied: Total Payable: ${totalAfterDiscount}
          </p>
        )}

        <div className='row'>
          <div className='col-md-6'>
            {COD ? (
              <button
                className='btn btn-primary'
                disabled={!user.address || !cart.length}
                onClick={createCashOrder}
              >
                Place Order
              </button>
            ) : (
              <button
                className='btn btn-primary'
                disabled={!user.address || !cart.length}
                onClick={() => history.push(NAV_LINKS.PAYMENT.ROUTE)}
              >
                Place Order
              </button>
            )}
          </div>

          <div className='col-md-6'>
            <button
              disabled={!cart.length}
              onClick={emptyCart}
              className='btn btn-primary'
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
