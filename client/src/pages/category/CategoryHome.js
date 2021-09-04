import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/cards/ProductCard';
import { getCategoryAction } from '../../store/action-creators';

const CategoryHome = () => {
  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );
  const { loading } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  const { slug } = useParams();

  useEffect(() => {
    dispatch(getCategoryAction(slug));
  }, [dispatch, slug]);

  return (
    <div className='container-fluid'>
      {selectedCategory && (
        <>
          <div className='row'>
            <div className='col'>
              {loading ? (
                <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
                  Loading...
                </h4>
              ) : (
                <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
                  {selectedCategory.products.length} Products in "
                  {selectedCategory.name}" category
                </h4>
              )}
            </div>
          </div>

          <div className='row'>
            {selectedCategory.products.map((product) => (
              <div className='col' key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryHome;
