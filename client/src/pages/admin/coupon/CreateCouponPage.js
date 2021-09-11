import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { DeleteOutlined } from '@ant-design/icons';
import 'react-datepicker/dist/react-datepicker.css';
import AdminNav from '../../../components/nav/AdminNav';
import {
  getAllCouponsAction,
  createCouponAction,
  removeCouponAction,
  apiCallReset,
} from '../../../store/action-creators';

const CreateCouponPage = () => {
  const { user } = useSelector((state) => state.user);
  const { coupons } = useSelector((state) => state.coupon);
  const { loading, success, error } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [discount, setDiscount] = useState(0);
  const [expiry, setExpiry] = useState(new Date());

  useEffect(() => {
    dispatch(getAllCouponsAction());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
    if (error) {
      toast.error(error);
    }
    dispatch(apiCallReset());
  }, [success, error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createCouponAction({ name, discount, expiry }, user.token));
    setName('');
    setDiscount('');
    setExpiry(new Date());
  };

  const handleRemove = (id) => {
    if (window.confirm('Delete the coupon?')) {
      dispatch(removeCouponAction(id, user.token));
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Coupon</h4>
          )}

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label className='text-muted'>Name</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='form-control'
                autoFocus
                required
              />
            </div>

            <div className='form-group'>
              <label className='text-muted'>Discount %</label>
              <input
                type='number'
                value={discount}
                onChange={(e) => setDiscount(+e.target.value)}
                className='form-control'
                required
              />
            </div>

            <div className='form-group'>
              <label className='text-muted'>Expiry</label>
              <br />
              <DatePicker
                className='form-control'
                selected={expiry}
                onChange={(date) => setExpiry(date)}
                required
              />
            </div>

            <button className='btn btn-outline-primary'>Save</button>
          </form>

          <h4>{coupons.length} Coupons</h4>

          <table className='table table-bordered'>
            <thead className='thead-light'>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Expiry</th>
                <th scope='col'>Discount</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map(({ _id, name, discount, expiry }) => (
                <tr key={_id}>
                  <td>{name}</td>
                  <td>{new Date(expiry).toLocaleDateString()}</td>
                  <td>{discount}%</td>
                  <td>
                    <DeleteOutlined
                      onClick={() => handleRemove(_id)}
                      className='text-danger pointer'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
