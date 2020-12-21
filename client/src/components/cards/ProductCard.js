import { useState } from 'react';
import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import laptop from '../../images/laptop.png';
import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/rating';
import { useSelector, useDispatch } from 'react-redux';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { images, title, description, slug, price } = product;
  const [tooltip, setTooltip] = useState('Click to add');

  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const formattedDescription =
    description && description.length > 40
      ? description.substring(0, 40) + '...'
      : description;

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
    }
  };

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className='text-center pt-1 pb-3'>No rating yet</div>
      )}

      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: '150px', objectFit: 'cover' }}
            className='p-1'
            alt='product preview'
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className='text-warning' /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <div onClick={handleAddToCart}>
              <ShoppingCartOutlined className='text-danger' /> <br /> Add to
              Cart
            </div>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - $${price}`}
          description={formattedDescription}
        />
      </Card>
    </>
  );
};

export default ProductCard;
