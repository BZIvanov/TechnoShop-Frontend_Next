import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/nav/AdminNav';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import {
  getProductsAction,
  removeProductAction,
  apiCallReset,
} from '../../../store/action-creators';

const AllProducts = () => {
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);
  const { loading, success, error } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAction(20));
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
    if (error) {
      toast.error(error);
    }
    dispatch(apiCallReset());
  }, [success, error, dispatch]);

  const handleRemove = (slug) => {
    if (window.confirm('Delete the product?')) {
      dispatch(removeProductAction(slug, user.token));
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>All Products</h4>
          )}
          <div className='row'>
            {products.map((product) => (
              <div key={product._id} className='col-md-4 pb-3'>
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
