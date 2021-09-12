import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { PDFDownloadLink } from '@react-pdf/renderer';
import UserNav from '../../components/nav/UserNav';
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo';
import Invoice from '../../components/order/Invoice';
import { getOrdersAction } from '../../store/action-creators';
import { SHIPPING_OPTIONS } from '../../constants';

const History = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersAction(user.token));
  }, [dispatch, user.token]);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>

        <div className='col text-center'>
          <h4>
            {orders.length > 0
              ? 'User purchased orders'
              : 'No purchased orders'}
          </h4>
          {orders.reverse().map((order) => (
            <div key={order._id} className='m-5 p-3 card'>
              <ShowPaymentInfo order={order} />

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

              <div className='row'>
                <div className='col'>
                  <PDFDownloadLink
                    document={<Invoice order={order} />}
                    fileName='invoice.pdf'
                    className='btn btn-sm btn-block btn-outline-primary'
                  >
                    Download PDF
                  </PDFDownloadLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
