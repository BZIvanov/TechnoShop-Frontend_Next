import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AdminNav from '../../../components/nav/AdminNav';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import {
  getAllCategoriesAction,
  getAllSubcategoriesAction,
  createSubcategoryAction,
  removeSubcategoryAction,
  apiCallReset,
} from '../../../store/action-creators';
import { NAV_LINKS } from '../../../constants';

const searchInSubcategories = (keyword) => (subcategory) =>
  subcategory.name.toLowerCase().includes(keyword);

const SubcategoryCreate = () => {
  const { user } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.category);
  const { subcategories } = useSelector((state) => state.subcategory);
  const { loading, success, error } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    dispatch(getAllCategoriesAction());
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

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createSubcategoryAction({ parent: category, name }, user.token));
    setName('');
  };

  const handleRemove = async (slug) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(removeSubcategoryAction(slug, user.token));
    }
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
            <h4>Create subcategory</h4>
          )}

          <div className='form-group'>
            <label>Parent category</label>
            <select
              name='category'
              className='form-control'
              onChange={(e) => setCategory(e.target.value)}
            >
              <option disabled>Select a category</option>
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

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {subcategories
            .filter(searchInSubcategories(keyword))
            .map(({ _id, name, slug }) => (
              <div className='alert alert-secondary' key={_id}>
                <span>{name}</span>

                <span
                  onClick={() => handleRemove(slug)}
                  className='btn btn-sm float-right'
                >
                  <DeleteOutlined className='text-danger' />
                </span>

                <Link to={`${NAV_LINKS.ADMIN_SUBCATEGORY.ROUTE}/${slug}`}>
                  <span className='btn btn-sm float-right'>
                    <EditOutlined className='text-warning' />
                  </span>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SubcategoryCreate;
