import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
} from '../functions/user';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getUserCartAction } from '../store/action-creators';
import { NAV_LINKS } from '../constants';

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const { COD, coupon: isCouponApplied } = useSelector((state) => ({
    ...state,
  }));

  const history = useHistory();
  const dispatch = useDispatch();

  const [address, setAddress] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');

  useEffect(() => {
    dispatch(getUserCartAction(user.token));
  }, [dispatch, user.token]);

  const emptyCart = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }

    dispatch({
      type: 'ADD_TO_CART_',
      payload: [],
    });

    emptyUserCart(user.token).then(() => {
      setTotalAfterDiscount(0);
      setCoupon('');
      toast.success('Cart is empty. Continue shopping.');
    });
  };

  const saveAddressToDb = () => {
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success('Address saved');
      }
    });
  };

  const applyDiscountCoupon = () => {
    applyCoupon(user.token, coupon).then((res) => {
      if (res.data) {
        setTotalAfterDiscount(res.data);
        dispatch({
          type: 'COUPON_APPLIED',
          payload: true,
        });
      }

      if (res.data.err) {
        setDiscountError(res.data.err);
        dispatch({
          type: 'COUPON_APPLIED',
          payload: true,
        });
      }
    });
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
          type: 'COUPON_APPLIED',
          payload: false,
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
        <button className='btn btn-primary mt-2' onClick={saveAddressToDb}>
          Save
        </button>

        <hr />

        <h4>Got Coupon?</h4>
        <input
          onChange={(e) => {
            setCoupon(e.target.value);
            setDiscountError('');
          }}
          value={coupon}
          type='text'
          className='form-control'
        />
        <button onClick={applyDiscountCoupon} className='btn btn-primary mt-2'>
          Apply
        </button>

        {discountError && <p className='bg-danger p-2'>{discountError}</p>}
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
                disabled={!addressSaved || !cart.length}
                onClick={createCashOrder}
              >
                Place Order
              </button>
            ) : (
              <button
                className='btn btn-primary'
                disabled={!addressSaved || !cart.length}
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
