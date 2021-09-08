import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
import { userCart } from '../functions/user';
import { NAV_LINKS } from '../constants';

const Cart = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const history = useHistory();

  const getTotal = () =>
    cart.reduce(
      (currentValue, nextValue) =>
        currentValue + nextValue.count * nextValue.price,
      0
    );

  const saveOrderToDb = (isCashPayment) => {
    dispatch({
      type: 'COD',
      payload: isCashPayment,
    });

    userCart(cart, user.token)
      .then((res) => {
        if (res.data.ok) history.push(NAV_LINKS.CHECKOUT.ROUTE);
      })
      .catch((err) => console.log('cart save err', err));
  };

  return (
    <div className='container-fluid pt-2'>
      <div className='row'>
        <div className='col-md-8'>
          <h4>Cart / {cart.length} Products</h4>
          {!cart.length ? (
            <p>
              No products in cart.{' '}
              <Link to={NAV_LINKS.SHOP.ROUTE}>Continue Shopping.</Link>
            </p>
          ) : (
            <table className='table table-bordered'>
              <thead className='thead-light'>
                <tr>
                  <th scope='col'>Image</th>
                  <th scope='col'>Title</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Brand</th>
                  <th scope='col'>Color</th>
                  <th scope='col'>Count</th>
                  <th scope='col'>Shipping</th>
                  <th scope='col'>Remove</th>
                </tr>
              </thead>

              {cart.map((product) => (
                <ProductCardInCheckout key={product._id} product={product} />
              ))}
            </table>
          )}
        </div>

        <div className='col-md-4'>
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map(({ _id, title, price, count }) => (
            <div key={_id}>
              <p>
                {title} x {count} = ${price * count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <>
              <button
                onClick={() => saveOrderToDb(false)}
                className='btn btn-sm btn-primary mt-2'
                disabled={!cart.length}
              >
                Proceed to Checkout
              </button>
              <br />
              <button
                onClick={() => saveOrderToDb(true)}
                className='btn btn-sm btn-warning mt-2'
                disabled={!cart.length}
              >
                Pay Cash on Delivery
              </button>
            </>
          ) : (
            <button className='btn btn-sm btn-primary mt-2'>
              <Link
                to={{
                  pathname: NAV_LINKS.LOGIN.ROUTE,
                  state: { from: 'cart' },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
