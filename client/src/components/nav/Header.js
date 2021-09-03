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
import { NAV_LINKS } from '../../constants';

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
    history.push(NAV_LINKS.LOGIN.ROUTE);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Item key='home' icon={<AppstoreOutlined />}>
        <Link to={NAV_LINKS.ROOT.ROUTE}>{NAV_LINKS.ROOT.LABEL}</Link>
      </Item>

      <Item key='shop' icon={<ShoppingOutlined />}>
        <Link to={NAV_LINKS.SHOP.ROUTE}>{NAV_LINKS.SHOP.LABEL}</Link>
      </Item>

      <Item key='cart' icon={<ShoppingCartOutlined />}>
        <Link to={NAV_LINKS.CART.ROUTE}>
          <Badge count={cart.length} offset={[9, 0]}>
            {NAV_LINKS.CART.LABEL}
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
            <Link to={NAV_LINKS.REGISTER.ROUTE}>
              {NAV_LINKS.REGISTER.LABEL}
            </Link>
          </Item>
          <Item key='login' icon={<UserOutlined />} className='float-right'>
            <Link to={NAV_LINKS.LOGIN.ROUTE}>{NAV_LINKS.LOGIN.LABEL}</Link>
          </Item>
        </>
      ) : (
        <SubMenu
          icon={<SettingOutlined />}
          title={user.name}
          className='float-right'
        >
          {user.role === 'user' && (
            <Item key='user'>
              <Link to={NAV_LINKS.USER_HISTORY.ROUTE}>
                {NAV_LINKS.USER_HISTORY.LABEL}
              </Link>
            </Item>
          )}
          {user.role === 'admin' && (
            <Item key='admin'>
              <Link to={NAV_LINKS.ADMIN_DASHBOARD.ROUTE}>
                {NAV_LINKS.ADMIN_DASHBOARD.LABEL}
              </Link>
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
