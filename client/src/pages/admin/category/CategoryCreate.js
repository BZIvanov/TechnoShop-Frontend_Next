import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/nav/AdminNav';
import {
  getCategoriesAction,
  createCategoryAction,
  removeCategoryAction,
  apiCallReset,
} from '../../../store/action-creators';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const CategoryCreate = () => {
  const { user } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.category);
  const { loading, success, error } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [keyword, setKeyword] = useState('');

  // initial load of already created categories
  useEffect(() => {
    dispatch(getCategoriesAction());
  }, [dispatch]);

  // display success or error message after every api call
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

    dispatch(createCategoryAction({ name }, user.token));
    setName('');
  };

  const handleRemove = async (slug) => {
    if (window.confirm('Delete?')) {
      dispatch(removeCategoryAction(slug, user.token));
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
            <h4>Create category</h4>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {categories.filter(searched(keyword)).map((c) => (
            <div className='alert alert-secondary' key={c._id}>
              {c.name}
              <span
                onClick={() => handleRemove(c.slug)}
                className='btn btn-sm float-right'
              >
                <DeleteOutlined className='text-danger' />
              </span>
              <Link to={`/admin/category/${c.slug}`}>
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

export default CategoryCreate;
