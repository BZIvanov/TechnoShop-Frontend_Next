import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getAllSubcategoriesAction,
  apiCallReset,
} from '../../store/action-creators';
import { NAV_LINKS } from '../../constants';

const SubcategoriesList = () => {
  const { subcategories } = useSelector((state) => state.subcategory);
  const { loading, success, error } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSubcategoriesAction());
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

  const showSubcategories = () =>
    subcategories.map(({ _id, slug, name }) => (
      <div
        key={_id}
        className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'
      >
        <Link to={`${NAV_LINKS.SUBCATEGORY.ROUTE}/${slug}`}>{name}</Link>
      </div>
    ));

  return (
    <div className='container'>
      <div className='row'>
        {loading ? (
          <h4 className='text-center'>Loading...</h4>
        ) : (
          showSubcategories()
        )}
      </div>
    </div>
  );
};

export default SubcategoriesList;
