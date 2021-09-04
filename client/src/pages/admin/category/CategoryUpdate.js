import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/nav/AdminNav';
import CategoryForm from '../../../components/forms/CategoryForm';
import {
  getCategoryAction,
  updateCategoryAction,
  apiCallReset,
} from '../../../store/action-creators';
import { NAV_LINKS } from '../../../constants';

const CategoryUpdate = () => {
  const { user } = useSelector((state) => state.user);
  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );
  const { loading, success, error } = useSelector((state) => state.apiCall);

  const history = useHistory();
  const { slug } = useParams();
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  useEffect(() => {
    dispatch(getCategoryAction(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    setName(selectedCategory ? selectedCategory.name : '');
  }, [selectedCategory]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      history.push(NAV_LINKS.ADMIN_CATEGORY.ROUTE);
    }
    if (error) {
      toast.error(error);
    }
    dispatch(apiCallReset());
  }, [success, error, dispatch, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateCategoryAction(slug, name, user.token));
    setName('');
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Loading..</h4>
          ) : (
            <h4>Update category</h4>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
