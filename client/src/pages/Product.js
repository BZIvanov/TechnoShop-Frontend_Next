import { useState, useEffect, useCallback } from 'react';
import { getProduct, productStar } from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';
import { useSelector } from 'react-redux';
import { getRelated } from '../functions/product';
import ProductCard from '../components/cards/ProductCard';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);

  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  const loadSingleProduct = useCallback(
    () =>
      getProduct(slug)
        .then((res) => {
          setProduct(res.data);

          getRelated(res.data._id)
            .then((res) => setRelated(res.data))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err)),
    [slug]
  );

  useEffect(() => {
    loadSingleProduct();
  }, [loadSingleProduct, slug]);

  useEffect(() => {
    if (product.ratings && user) {
      const existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  }, [product.ratings, user]);

  const onStarClick = (newRating, name) => {
    setStar(newRating);

    productStar(name, newRating, user.token)
      .then(() => {
        loadSingleProduct();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
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
