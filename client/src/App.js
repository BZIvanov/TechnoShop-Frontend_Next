import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';
import { auth } from './firebase';
import { loginUser } from './store/action-creators';
import axios from 'axios';
import { NAV_LINKS } from './constants';

const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/auth/Register'));
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'));
const Password = lazy(() => import('./pages/user/Password'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const Login = lazy(() => import('./pages/auth/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AllProducts = lazy(() => import('./pages/admin/product/AllProducts'));
const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'));
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'));
const CategoryCreate = lazy(() =>
  import('./pages/admin/category/CategoryCreate')
);
const CategoryUpdate = lazy(() =>
  import('./pages/admin/category/CategoryUpdate')
);
const SubCreate = lazy(() => import('./pages/admin/sub/SubCreate'));
const SubUpdate = lazy(() => import('./pages/admin/sub/SubUpdate'));
const CreateCouponPage = lazy(() =>
  import('./pages/admin/coupon/CreateCouponPage')
);
const History = lazy(() => import('./pages/user/History'));
const Wishlist = lazy(() => import('./pages/user/Wishlist'));
const Product = lazy(() => import('./pages/Product'));
const CategoryHome = lazy(() => import('./pages/category/CategoryHome'));
const SubHome = lazy(() => import('./pages/sub/SubHome'));
const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Payment = lazy(() => import('./pages/Payment'));
const Header = lazy(() => import('./components/nav/Header'));
const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'));
const UserRoute = lazy(() => import('./components/routes/UserRoute'));
const AdminRoute = lazy(() => import('./components/routes/AdminRoute'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { token } = await user.getIdTokenResult();

        // this call is here like this, because using dispatching something like createOrUpdateUser makes this useEffect to run first
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API}/current-user`,
            {},
            { headers: { authtoken: token } }
          );

          dispatch(loginUser(response, token));
        } catch (error) {
          console.log('Auth reducer error: ', error);
        }
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className='col text-center p-5'>
          __ EC
          <LoadingOutlined />
          MMERCE __
        </div>
      }
    >
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path={NAV_LINKS.ROOT.ROUTE} component={Home} />
        <Route exact path={NAV_LINKS.LOGIN.ROUTE} component={Login} />
        <Route exact path={NAV_LINKS.REGISTER.ROUTE} component={Register} />
        <Route
          exact
          path={NAV_LINKS.REGISTER_COMPLETE.ROUTE}
          component={RegisterComplete}
        />
        <Route
          exact
          path={NAV_LINKS.FORGOT_PASSWORD.ROUTE}
          component={ForgotPassword}
        />
        <UserRoute
          exact
          path={NAV_LINKS.USER_HISTORY.ROUTE}
          component={History}
        />
        <UserRoute
          exact
          path={NAV_LINKS.USER_PASSWORD.ROUTE}
          component={Password}
        />
        <UserRoute
          exact
          path={NAV_LINKS.USER_WISHLIST.ROUTE}
          component={Wishlist}
        />
        <AdminRoute
          exact
          path={NAV_LINKS.ADMIN_DASHBOARD.ROUTE}
          component={AdminDashboard}
        />
        <AdminRoute
          exact
          path={NAV_LINKS.ADMIN_CATEGORY.ROUTE}
          component={CategoryCreate}
        />
        <AdminRoute
          exact
          path={`${NAV_LINKS.ADMIN_CATEGORY.ROUTE}${NAV_LINKS.SLUG.ROUTE}`}
          component={CategoryUpdate}
        />
        <AdminRoute
          exact
          path={NAV_LINKS.ADMIN_SUBCATEGORY.ROUTE}
          component={SubCreate}
        />
        <AdminRoute
          exact
          path={`${NAV_LINKS.ADMIN_SUBCATEGORY.ROUTE}${NAV_LINKS.SLUG.ROUTE}`}
          component={SubUpdate}
        />
        <AdminRoute
          exact
          path={NAV_LINKS.ADMIN_PRODUCT.ROUTE}
          component={ProductCreate}
        />
        <AdminRoute
          exact
          path={NAV_LINKS.ADMIN_PRODUCTS.ROUTE}
          component={AllProducts}
        />
        <AdminRoute
          exact
          path={`${NAV_LINKS.ADMIN_PRODUCT.ROUTE}${NAV_LINKS.SLUG.ROUTE}`}
          component={ProductUpdate}
        />
        <Route
          exact
          path={`${NAV_LINKS.PRODUCT.ROUTE}${NAV_LINKS.SLUG.ROUTE}`}
          component={Product}
        />
        <Route
          exact
          path={`${NAV_LINKS.CATEGORY.ROUTE}${NAV_LINKS.SLUG.ROUTE}`}
          component={CategoryHome}
        />
        <Route
          exact
          path={`${NAV_LINKS.SUBCATEGORY.ROUTE}${NAV_LINKS.SLUG.ROUTE}`}
          component={SubHome}
        />
        <Route exact path={NAV_LINKS.SHOP.ROUTE} component={Shop} />
        <Route exact path={NAV_LINKS.CART.ROUTE} component={Cart} />
        <UserRoute exact path={NAV_LINKS.CHECKOUT.ROUTE} component={Checkout} />
        <AdminRoute
          exact
          path={NAV_LINKS.ADMIN_COUPON.ROUTE}
          component={CreateCouponPage}
        />
        <UserRoute exact path={NAV_LINKS.PAYMENT.ROUTE} component={Payment} />
      </Switch>
    </Suspense>
  );
};

export default App;
