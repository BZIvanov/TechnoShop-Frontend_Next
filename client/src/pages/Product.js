import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SingleProduct from '../components/cards/SingleProduct';
import ProductCard from '../components/cards/ProductCard';
import {
  getProductAction,
  getSimilarProductsAction,
  apiCallReset,
} from '../store/action-creators';

const Product = () => {
  const { user } = useSelector((state) => state.user);
  const { selectedProduct: product, similarProducts } = useSelector(
    (state) => state.product
  );
  const { success, error } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(getProductAction(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (product) {
      dispatch(getSimilarProductsAction(product._id));
    }
  }, [dispatch, product]);

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
    if (error) {
      toast.error(error);
    }
    dispatch(apiCallReset());
  }, [success, error, dispatch]);

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        {product && user && <SingleProduct product={product} />}
      </div>

      <div className='row'>
        <div className='col text-center pt-5 pb-5'>
          <hr />
          <h4>Similar Products</h4>
          <hr />
        </div>
      </div>
      <div className='row pb-5'>
        {similarProducts.products.length ? (
          similarProducts.products.map((similar) => (
            <div key={similar._id} className='col-md-4'>
              <ProductCard product={similar} />
            </div>
          ))
        ) : (
          <div className='text-center col'>No Products Found</div>
        )}
      </div>
    </div>
  );
};

export default Product;
