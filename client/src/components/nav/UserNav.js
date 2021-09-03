import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../../constants';

const UserNav = () => (
  <nav>
    <ul className='nav flex-column'>
      <li className='nav-item'>
        <Link to={NAV_LINKS.USER_HISTORY.ROUTE} className='nav-link'>
          {NAV_LINKS.USER_HISTORY.LABEL}
        </Link>
      </li>

      <li className='nav-item'>
        <Link to={NAV_LINKS.USER_PASSWORD.ROUTE} className='nav-link'>
          {NAV_LINKS.USER_PASSWORD.LABEL}
        </Link>
      </li>

      <li className='nav-item'>
        <Link to={NAV_LINKS.USER_WISHLIST.ROUTE} className='nav-link'>
          {NAV_LINKS.USER_WISHLIST.LABEL}
        </Link>
      </li>
    </ul>
  </nav>
);

export default UserNav;
