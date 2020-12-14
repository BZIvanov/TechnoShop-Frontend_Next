import { Card } from 'antd';
import laptop from '../../images/laptop.png';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

const AdminProductCard = ({ product }) => {
  const { title, description, images } = product;

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
        <EditOutlined className='text-warning' />,
        <DeleteOutlined className='text-danger' />,
      ]}
    >
      <Meta title={title} description={formattedDescription} />
    </Card>
  );
};

export default AdminProductCard;
