import { useState } from 'react';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { StarOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import { NAV_LINKS } from '../../constants';

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);

  const history = useHistory();
  const { slug } = useParams();

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      history.push({
        pathname: NAV_LINKS.LOGIN.ROUTE,
        state: { from: `${NAV_LINKS.PRODUCT.ROUTE}/${slug}` },
      });
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className='text-danger' /> <br />{' '}
        {user ? 'Leave rating' : 'Login to leave rating'}
      </div>

      <Modal
        title='Leave your rating'
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success('Thanks for your review. It will appear soon');
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
