import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, Tabs, Tooltip } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import StarRating from 'react-star-ratings';
import { toast } from 'react-toastify';
import ProductListItems from './ProductListItems';
import StarsRating from '../common/StarsRating';
import RatingModal from '../modal/RatingModal';
import { addToWishlist } from '../../functions/user';
import { NAV_LINKS } from '../../constants';
import Laptop from '../../images/laptop.png';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { rateProductAction } from '../../store/action-creators';

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
    let cart = [];
    if (typeof window !== 'undefined') {
      const localStorageCart = localStorage.getItem('cart');
      if (localStorageCart) {
        cart = JSON.parse(localStorageCart);
      }

      if (!cart.some((item) => item._id === product._id)) {
        cart.push({
          ...product,
          count: 1,
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      setTooltip('Added');

      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
      dispatch({
        type: 'SET_VISIBLE',
        payload: true,
      });
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();

    addToWishlist(product._id, user.token).then(() => {
      toast.success('Added to wishlist');
      history.push(NAV_LINKS.USER_WISHLIST.ROUTE);
    });
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
              <div onClick={handleAddToCart}>
                <ShoppingCartOutlined className='text-success' /> <br /> Add to
                Cart
              </div>
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
