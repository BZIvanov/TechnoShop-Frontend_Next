import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import StarsRating from '../common/StarsRating';
import laptop from '../../assets/images/laptop.png';
import {
  addToCartAction,
  toggleVisibleAction,
} from '../../store/action-creators';
import { NAV_LINKS } from '../../constants';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { images, title, description, slug, price } = product;

  const dispatch = useDispatch();

  const [tooltip, setTooltip] = useState('Click to add');

  const formattedDescription =
    description && description.length > 40
      ? description.substring(0, 40) + '...'
      : description;

  const handleAddToCart = () => {
    dispatch(addToCartAction(product, 1));
    dispatch(toggleVisibleAction(true));

    setTooltip('In the cart already');
  };

  return (
    <>
      {product.ratings.length > 0 ? (
        <StarsRating ratings={product.ratings} />
      ) : (
        <div className='text-center pt-1 pb-3'>Not rated yet</div>
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
          <Link to={`${NAV_LINKS.PRODUCT.ROUTE}/${slug}`}>
            <EyeOutlined className='text-warning' /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <button onClick={handleAddToCart} disabled={product.quantity < 1}>
              <ShoppingCartOutlined className='text-danger' /> <br />
              {product.quantity < 1 ? 'Out of stock' : 'Add to Cart'}
            </button>
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
