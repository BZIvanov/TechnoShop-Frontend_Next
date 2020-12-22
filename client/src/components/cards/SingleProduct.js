import { useState } from 'react';
import { Card, Tabs, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Laptop from '../../images/laptop.png';
import ProductListItems from './ProductListItems';
import StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../functions/rating';
import { useDispatch } from 'react-redux';

const { TabPane } = Tabs;

const SingleProduct = ({ product, star, onStarClick }) => {
  const { title, images, description, _id } = product;

  const [tooltip, setTooltip] = useState('Click to add');

  const dispatch = useDispatch();

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

  return (
    <>
      <div className='col-md-7'>
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images.map((i) => (
              <img src={i.url} key={i.public_id} alt='product-preview' />
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

        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className='text-center pt-1 pb-3'>No rating yet</div>
        )}

        <Card
          actions={[
            <Tooltip title={tooltip}>
              <div onClick={handleAddToCart}>
                <ShoppingCartOutlined className='text-danger' /> <br /> Add to
                Cart
              </div>
            </Tooltip>,
            <Link to='/'>
              <HeartOutlined className='text-info' /> <br /> Add to Wishlist
            </Link>,
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
