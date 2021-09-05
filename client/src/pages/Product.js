import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct, productStar } from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';
import { getRelated } from '../functions/product';
import ProductCard from '../components/cards/ProductCard';
import { getProductAction } from '../store/action-creators';

const Product = () => {
  const { user } = useSelector((state) => state.user);
  const { selectedProduct: product } = useSelector((state) => state.product);

  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);

  const { slug } = useParams();
  const dispatch = useDispatch();

  const loadSingleProduct = useCallback(() =>
    getProduct(slug).then((res) => {
      getRelated(res.data._id).then((res) => setRelated(res.data));
    })
  );

  useEffect(() => {
    dispatch(getProductAction(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (product && product.ratings && user) {
      const existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  }, [product, user]);

  const onStarClick = (newRating, name) => {
    setStar(newRating);

    productStar(name, newRating, user.token)
      .then(() => {
        // loadSingleProduct();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        {product && (
          <SingleProduct
            product={product}
            onStarClick={onStarClick}
            star={star}
          />
        )}
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
