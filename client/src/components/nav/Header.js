import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Menu, Badge } from 'antd';
import {
  AppstoreOutlined,
  ShoppingOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import firebase from 'firebase';
import Search from '../forms/Search';
import { logoutUser } from '../../store/action-creators';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');

  const { user } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch(logoutUser());
    history.push('/login');
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Item key='home' icon={<AppstoreOutlined />}>
        <Link to='/'>Home</Link>
      </Item>

      <Item key='shop' icon={<ShoppingOutlined />}>
        <Link to='/shop'>Shop</Link>
      </Item>

      <Item key='cart' icon={<ShoppingCartOutlined />}>
        <Link to='/cart'>
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>

      {!user ? (
        <>
          <Item
            key='register'
            icon={<UserAddOutlined />}
            className='float-right'
          >
            <Link to='/register'>Register</Link>
          </Item>
          <Item key='login' icon={<UserOutlined />} className='float-right'>
            <Link to='/login'>Login</Link>
          </Item>
        </>
      ) : (
        <SubMenu
          icon={<SettingOutlined />}
          title={user.email.split('@')[0]}
          className='float-right'
        >
          {user.role === 'user' && (
            <Item key='user'>
              <Link to='/user/history'>Dashboard</Link>
            </Item>
          )}
          {user.role === 'admin' && (
            <Item key='admin'>
              <Link to='/admin/dashboard'>Dashboard</Link>
            </Item>
          )}
          <Item key='logout' icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}

      <span className='float-right p-1'>
        <Search />
      </span>
    </Menu>
  );
};

export default Header;
