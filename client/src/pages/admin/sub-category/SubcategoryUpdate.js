import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/nav/AdminNav';
import CategoryForm from '../../../components/forms/CategoryForm';
import {
  getAllCategoriesAction,
  getSubcategoryAction,
  updateSubcategoryAction,
  apiCallReset,
} from '../../../store/action-creators';
import { NAV_LINKS } from '../../../constants';

const SubcategoryUpdate = () => {
  const { user } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.category);
  const selectedSubcategory = useSelector(
    (state) => state.subcategory.selectedSubcategory
  );
  const { loading, success, error } = useSelector((state) => state.apiCall);

  const history = useHistory();
  const dispatch = useDispatch();
  const { slug } = useParams();

  const [parent, setParent] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getSubcategoryAction(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    setParent(selectedSubcategory ? selectedSubcategory.parent : '');
    setName(selectedSubcategory ? selectedSubcategory.name : '');
  }, [selectedSubcategory]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      history.push(NAV_LINKS.ADMIN_SUBCATEGORY.ROUTE);
    }
    if (error) {
      toast.error(error);
    }
    dispatch(apiCallReset());
  }, [success, error, dispatch, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateSubcategoryAction(slug, { parent, name }, user.token));
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
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Update subcategory</h4>
          )}

          <div className='form-group'>
            <label>Parent category</label>
            <select
              name='parent'
              className='form-control'
              value={parent}
              onChange={(e) => setParent(e.target.value)}
            >
              <option disabled>Please select</option>
              {categories.length > 0 &&
                categories.map(({ _id, name }) => (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
  );
};

export default SubcategoryUpdate;
