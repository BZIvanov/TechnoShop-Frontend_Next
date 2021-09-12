import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ShowPaymentInfo from '../cards/ShowPaymentInfo';
import { ORDER_STATUSES, SHIPPING_OPTIONS } from '../../constants';

const Orders = ({ orders, handleStatusChange }) => {
  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className='row mb-5 p-2 card bg-light'>
          <ShowPaymentInfo order={order} showStatus={false} />

          <div className='row'>
            <div className='col-md-4'>Delivery Status:</div>
            <div className='col-md-8'>
              <select
                name='status'
                value={order.orderStatus}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className='form-control'
              >
                {Object.values(ORDER_STATUSES).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <table className='table table-bordered'>
            <thead className='thead-light'>
              <tr>
                <th scope='col'>Title</th>
                <th scope='col'>Price</th>
                <th scope='col'>Brand</th>
                <th scope='col'>Color</th>
                <th scope='col'>Count</th>
                <th scope='col'>Shipping</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <b>{product.product.title}</b>
                  </td>
                  <td>{product.product.price}</td>
                  <td>{product.product.brand}</td>
                  <td>{product.color}</td>
                  <td>{product.count}</td>
                  <td>
                    {product.product.shipping === SHIPPING_OPTIONS.YES ? (
                      <CheckCircleOutlined style={{ color: 'green' }} />
                    ) : (
                      <CloseCircleOutlined style={{ color: 'red' }} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
};

export default Orders;
