import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Drawer } from 'antd';
import laptop from '../../images/laptop.png';
import { NAV_LINKS } from '../../constants';

const imageStyle = {
  width: '100%',
  height: '50px',
  objectFit: 'cover',
};

const SideDrawer = () => {
  const { cart } = useSelector((state) => state.cart);

  const { drawer } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  return (
    <Drawer
      className='text-center'
      title={`Cart / ${cart.length} Product`}
      placement='right'
      closable={false}
      onClose={() => {
        dispatch({
          type: 'SET_VISIBLE',
          payload: false,
        });
      }}
      visible={drawer}
    >
      {cart.map((p) => (
        <div key={p._id} className='row'>
          <div className='col'>
            <img
              src={p.images[0] ? p.images[0].url : laptop}
              style={imageStyle}
              alt='prodduct preview'
            />
            <p className='text-center bg-secondary text-light'>
              {p.title} x {p.count}
            </p>
          </div>
        </div>
      ))}

      <Link to={NAV_LINKS.CART.ROUTE}>
        <button
          onClick={() =>
            dispatch({
              type: 'SET_VISIBLE',
              payload: false,
            })
          }
          className='text-center btn btn-primary btn-raised btn-block'
        >
          Go To Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
