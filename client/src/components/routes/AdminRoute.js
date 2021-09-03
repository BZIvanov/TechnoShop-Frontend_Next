import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../api/user';

const AdminRoute = (props) => {
  const { user } = useSelector((state) => state.user);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      (async () => {
        try {
          await currentAdmin(user.token);
          setOk(true);
        } catch (_) {
          setOk(false);
        }
      })();
    }
  }, [user]);

  return ok ? <Route {...props} /> : <LoadingToRedirect />;
};

export default AdminRoute;
