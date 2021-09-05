import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { NAV_LINKS } from '../../constants';
import laptop from '../../images/laptop.png';

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;

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
        <Link to={`${NAV_LINKS.ADMIN_PRODUCT.ROUTE}/${slug}`}>
          <EditOutlined className='text-warning' />
        </Link>,
        <DeleteOutlined
          onClick={() => handleRemove(slug)}
          className='text-danger'
        />,
      ]}
    >
      <Meta title={title} description={formattedDescription} />
    </Card>
  );
};

export default AdminProductCard;
