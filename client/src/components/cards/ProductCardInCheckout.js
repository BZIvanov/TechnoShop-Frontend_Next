import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalImage from 'react-modal-image';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { toast } from 'react-toastify';
import {
  addToCartAction,
  removeFromCartAction,
} from '../../store/action-creators';
import laptop from '../../images/laptop.png';
import { COLORS_LIST } from '../../constants';

const ProductCardInCheckout = ({ product }) => {
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const [inputCount, setInputCount] = useState(product.count);

  const handleColorChange = (e) => {
    const targetProduct = cart.find(
      (cartProduct) => cartProduct._id === product._id
    );

    dispatch(addToCartAction({ ...targetProduct, color: e.target.value }, 0));
  };

  const handleQuantityChange = ({ target }) => {
    const currentValue = +target.value;
    if (currentValue < 1 || currentValue > product.quantity) {
      toast.error(`Provide value between 1 and ${product.quantity}`);
      return;
    }

    const targetProduct = cart.find(
      (cartProduct) => cartProduct._id === product._id
    );

    dispatch(addToCartAction(targetProduct, currentValue - inputCount));
    setInputCount(currentValue);
  };

  const handleRemove = () => {
    dispatch(removeFromCartAction(product));
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: '100px', height: 'auto' }}>
            {product.images.length ? (
              <ModalImage
                small={product.images[0].url}
                large={product.images[0].url}
              />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
        <td>{product.title}</td>
        <td>${product.price}</td>
        <td>{product.brand}</td>
        <td>
          <select
            name='color'
            value={product.color}
            onChange={handleColorChange}
            className='form-control'
          >
            {COLORS_LIST.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </td>
        <td className='text-center'>
          <input
            type='number'
            value={inputCount}
            onChange={handleQuantityChange}
            className='form-control'
          />
        </td>
        <td className='text-center'>
          {product.shipping === 'Yes' ? (
            <CheckCircleOutlined className='text-success' />
          ) : (
            <CloseCircleOutlined className='text-danger' />
          )}
        </td>
        <td className='text-center'>
          <CloseOutlined
            onClick={handleRemove}
            className='text-danger pointer'
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
