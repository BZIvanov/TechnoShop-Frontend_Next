import React from 'react';
import { Card } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import laptop from '../../images/laptop.png';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { images, title, description, slug } = product;

  const formattedDescription =
    description && description.length > 40
      ? description.substring(0, 40) + '...'
      : description;

  return (
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
        <>
          <ShoppingCartOutlined className='text-danger' /> <br /> Add to Cart
        </>,
      ]}
    >
      <Meta title={title} description={formattedDescription} />
    </Card>
  );
};

export default ProductCard;
