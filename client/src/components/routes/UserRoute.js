import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

const UserRoute = (props) => {
  const { user } = useSelector((state) => state.user);

  return user && user.token ? <Route {...props} /> : <LoadingToRedirect />;
};

export default UserRoute;
