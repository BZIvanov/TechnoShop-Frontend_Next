import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import SingleProduct from '../components/cards/SingleProduct';
import ProductCard from '../components/cards/ProductCard';
import { getProductAction, rateProductAction } from '../store/action-creators';

const Product = () => {
  const { user } = useSelector((state) => state.user);
  const { selectedProduct: product } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const { slug } = useParams();

  const [related, setRelated] = useState([]);

  useEffect(() => {
    dispatch(getProductAction(slug));
  }, [dispatch, slug]);

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        {product && user && <SingleProduct product={product} />}
      </div>

      <div className='row'>
        <div className='col text-center pt-5 pb-5'>
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
      <div className='row pb-5'>
        {related.length ? (
          related.map((r) => (
            <div key={r._id} className='col-md-4'>
              <ProductCard product={r} />
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
