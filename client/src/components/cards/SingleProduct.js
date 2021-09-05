import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, Tabs, Tooltip } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import StarRating from 'react-star-ratings';
import { toast } from 'react-toastify';
import ProductListItems from './ProductListItems';
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../functions/rating';
import { addToWishlist } from '../../functions/user';
import { NAV_LINKS } from '../../constants';
import Laptop from '../../images/laptop.png';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const { TabPane } = Tabs;

const SingleProduct = ({ product, star, onStarClick }) => {
  const { title, images, description, _id } = product;

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const [tooltip, setTooltip] = useState('Click to add');

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
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images.map(({ url, public_id }) => (
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
            {description}
          </TabPane>
          <TabPane tab='More' key='2'>
            Call use on xxxx xxx xxx to learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className='col-md-5'>
        <h1 className='bg-info p-3'>{title}</h1>

        {product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className='text-center pt-1 pb-3'>No rating yet</div>
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
            <RatingModal>
              <StarRating
                name={_id}
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
