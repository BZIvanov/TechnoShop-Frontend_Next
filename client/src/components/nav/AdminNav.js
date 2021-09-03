import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../../constants';

const AdminNav = () => (
  <nav>
    <ul className='nav flex-column'>
      <li className='nav-item'>
        <Link to={NAV_LINKS.ADMIN_DASHBOARD.ROUTE} className='nav-link'>
          {NAV_LINKS.ADMIN_DASHBOARD.LABEL}
        </Link>
      </li>
      <li className='nav-item'>
        <Link to={NAV_LINKS.ADMIN_PRODUCT.ROUTE} className='nav-link'>
          {NAV_LINKS.ADMIN_PRODUCT.LABEL}
        </Link>
      </li>
      <li className='nav-item'>
        <Link to={NAV_LINKS.ADMIN_PRODUCTS.ROUTE} className='nav-link'>
          {NAV_LINKS.ADMIN_PRODUCTS.LABEL}
        </Link>
      </li>
      <li className='nav-item'>
        <Link to={NAV_LINKS.ADMIN_CATEGORY.ROUTE} className='nav-link'>
          {NAV_LINKS.ADMIN_CATEGORY.LABEL}
        </Link>
      </li>
      <li className='nav-item'>
        <Link to={NAV_LINKS.ADMIN_SUBCATEGORY.ROUTE} className='nav-link'>
          {NAV_LINKS.ADMIN_SUBCATEGORY.LABEL}
        </Link>
      </li>
      <li className='nav-item'>
        <Link to={NAV_LINKS.ADMIN_COUPON.ROUTE} className='nav-link'>
          {NAV_LINKS.ADMIN_COUPON.LABEL}
        </Link>
      </li>
      <li className='nav-item'>
        <Link to={NAV_LINKS.USER_PASSWORD.ROUTE} className='nav-link'>
          {NAV_LINKS.USER_PASSWORD.LABEL}
        </Link>
      </li>
    </ul>
  </nav>
);

export default AdminNav;
