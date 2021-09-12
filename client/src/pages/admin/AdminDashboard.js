import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminNav from '../../components/nav/AdminNav';
import Orders from '../../components/order/Orders';
import {
  getOrdersAction,
  updateOrderAction,
} from '../../store/action-creators';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersAction(user.token));
  }, [dispatch, user.token]);

  const handleStatusChange = (id, orderStatus) => {
    dispatch(updateOrderAction(id, { orderStatus }, user.token));
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <div className='col-md-10'>
          <h4>Admin Dashboard</h4>
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
