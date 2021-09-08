import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Drawer } from 'antd';
import { toggleVisibleAction } from '../../store/action-creators';
import laptop from '../../assets/images/laptop.png';
import { NAV_LINKS } from '../../constants';

const imageStyle = {
  width: '100%',
  height: '50px',
  objectFit: 'cover',
};

const SideDrawer = () => {
  const { cart } = useSelector((state) => state.cart);
  const { isVisible } = useSelector((state) => state.sidedrawer);

  const dispatch = useDispatch();

  return (
    <Drawer
      className='text-center'
      title={`Cart / ${cart.length} Products`}
      placement='right'
      closable={false}
      onClose={() => dispatch(toggleVisibleAction(false))}
      visible={isVisible}
    >
      {cart.map(({ _id, images, title, count }) => (
        <div key={_id} className='row'>
          <div className='col'>
            <img
              src={images[0] ? images[0].url : laptop}
              style={imageStyle}
              alt='product preview'
            />
            <p className='text-center bg-secondary text-light'>
              {title} x {count}
            </p>
          </div>
        </div>
      ))}

      <Link to={NAV_LINKS.CART.ROUTE}>
        <button
          onClick={() => dispatch(toggleVisibleAction(false))}
          className='text-center btn btn-primary btn-raised btn-block'
        >
          Go To Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
