import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/cards/ProductCard';
import { getSubcategoryAction } from '../../store/action-creators';

const SubcategoryHome = () => {
  const selectedSubcategory = useSelector(
    (state) => state.subcategory.selectedSubcategory
  );
  const { loading } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(getSubcategoryAction(slug));
  }, [dispatch, slug]);

  return (
    <div className='container-fluid'>
      {selectedSubcategory && (
        <>
          <div className='row'>
            <div className='col'>
              {loading ? (
                <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
                  Loading...
                </h4>
              ) : (
                <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
                  {selectedSubcategory.products.length} Products in "
                  {selectedSubcategory.name}" subcategory
                </h4>
              )}
            </div>
          </div>

          <div className='row'>
            {selectedSubcategory.products.map((product) => (
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

export default SubcategoryHome;
