import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
import { getProductsAction } from '../../store/action-creators';
import { HOME_PAGE_CARDS_COUNT } from '../../constants';

const FeaturedProducts = ({ sortColumn }) => {
  const { totalCount, products } = useSelector((state) => state.product);
  const { loading } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      getProductsAction({
        page,
        perPage: HOME_PAGE_CARDS_COUNT,
        sortColumn,
      })
    );
  }, [dispatch, page]);

  return (
    <>
      <div className='container'>
        {loading ? (
          <LoadingCard count={HOME_PAGE_CARDS_COUNT} />
        ) : (
          <div className='row'>
            {products.map((product) => (
              <div key={product._id} className='col-md-4'>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='row'>
        <nav className='col-md-4 offset-md-4 text-center pt-5 p-3'>
          <Pagination
            current={page}
            total={(totalCount / HOME_PAGE_CARDS_COUNT) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default FeaturedProducts;
