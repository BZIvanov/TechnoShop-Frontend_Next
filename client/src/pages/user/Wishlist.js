import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import UserNav from '../../components/nav/UserNav';
import {
  getWishlistAction,
  updateWishlistAction,
} from '../../store/action-creators';
import { NAV_LINKS } from '../../constants';

const Wishlist = () => {
  const { user } = useSelector((state) => state.user);
  const { wishlist } = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlistAction(user.token));
  }, [dispatch, user.token]);

  const handleRemove = (productId) => {
    dispatch(updateWishlistAction(productId, user.token));
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>
        <div className='col'>
          <h4>Wishlist</h4>
          {wishlist.length === 0 && <p>No products to display</p>}

          {wishlist.map((product) => (
            <div key={product._id} className='alert alert-secondary'>
              <Link to={`${NAV_LINKS.PRODUCT.ROUTE}/${product.slug}`}>
                {product.title}
              </Link>
              <span
                onClick={() => handleRemove(product._id)}
                className='btn btn-sm float-right'
              >
                <DeleteOutlined className='text-danger' />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
