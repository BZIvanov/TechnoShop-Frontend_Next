import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Card, Tabs, Tooltip } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import StarRating from 'react-star-ratings';
import ProductListItems from './ProductListItems';
import StarsRating from '../common/StarsRating';
import RatingModal from '../modal/RatingModal';
import Laptop from '../../assets/images/laptop.png';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  rateProductAction,
  addToCartAction,
  toggleVisibleAction,
  updateWishlistAction,
} from '../../store/action-creators';

const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const [tooltip, setTooltip] = useState('Click to add');
  const [star, setStar] = useState(0);

  // check if the user already rated the product and use his rating
  useEffect(() => {
    const userRating = product.ratings.find(
      (rating) => rating.postedBy.toString() === user._id.toString()
    );
    userRating && setStar(userRating.star);

    return () => setStar(0);
  }, [product.ratings, user._id]);

  // call the backend with the new rating
  const rateProduct = () => {
    dispatch(rateProductAction(product._id, { rating: star }, user.token));
  };

  const onStarClick = (newRating) => {
    setStar(newRating);
  };

  const handleAddToCart = () => {
    dispatch(addToCartAction(product, 1));
    dispatch(toggleVisibleAction(true));

    setTooltip('In the cart already');
  };

  const handleAddToWishlist = () => {
    dispatch(updateWishlistAction(product._id, user.token));
  };

  return (
    <>
      <div className='col-md-7'>
        {product.images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {product.images.map(({ url, public_id }) => (
              <img src={url} key={public_id} alt='product-preview' />
            ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src={Laptop}
                className='mb-3 card-image'
                alt='default-preview'
              />
            }
          ></Card>
        )}

        <Tabs type='card'>
          <TabPane tab='Description' key='1'>
            {product.description}
          </TabPane>
          <TabPane tab='More' key='2'>
            Call use on 0897 654 321 to learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className='col-md-5'>
        <h1 className='bg-info p-3'>{product.title}</h1>

        {product.ratings.length > 0 ? (
          <StarsRating ratings={product.ratings} />
        ) : (
          <div className='text-center pt-1 pb-3'>Not rated yet</div>
        )}

        <Card
          actions={[
            <Tooltip title={tooltip}>
              <Link
                to={history.location.pathname} // the current path, Link is used here because of the disable option
                onClick={handleAddToCart}
                disabled={product.quantity < 1}
              >
                <ShoppingCartOutlined className='text-success' /> <br />
                {product.quantity < 1 ? 'Out of stock' : 'Add to Cart'}
              </Link>
            </Tooltip>,
            <span onClick={handleAddToWishlist}>
              <HeartOutlined className='text-info' /> <br /> Add to Wishlist
            </span>,
            <RatingModal rateProduct={rateProduct} userRated={star > 0}>
              <StarRating
                name={product._id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor='red'
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
