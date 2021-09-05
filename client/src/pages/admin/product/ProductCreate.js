import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';
import AdminNav from '../../../components/nav/AdminNav';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import FileUpload from '../../../components/forms/FileUpload';
import {
  getAllCategoriesAction,
  getCategorySubcategoriesAction,
  createProductAction,
  apiCallReset,
} from '../../../store/action-creators';
import { NAV_LINKS } from '../../../constants';

const initialValues = {
  title: '',
  description: '',
  price: 0,
  shipping: 'Yes',
  quantity: 0,
  color: 'Black',
  brand: 'Samsung',
  category: '',
  subcategories: [],
  images: [],
};

const ProductCreate = () => {
  const { user } = useSelector((state) => state.user);
  const {
    categories: availableCategories,
    subcategories: availableSubcategories,
  } = useSelector((state) => state.category);
  const { loading, success, error } = useSelector((state) => state.apiCall);

  const history = useHistory();
  const dispatch = useDispatch();

  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      history.push(NAV_LINKS.ADMIN_PRODUCTS.ROUTE);
    }
    if (error) {
      toast.error(error);
    }
    dispatch(apiCallReset());
  }, [success, error, dispatch, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createProductAction(values, user.token));
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();

    setValues({
      ...values,
      category: e.target.value,
      subcategories: [], // reset previously selected values
    });

    dispatch(getCategorySubcategoriesAction(e.target.value));
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <div className='col-md-10'>
          {loading ? (
            <LoadingOutlined className='text-danger h1' />
          ) : (
            <h4>Product create</h4>
          )}
          <hr />

          <div className='p-3'>
            <FileUpload values={values} setValues={setValues} />
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            availableCategories={availableCategories}
            availableSubcategories={availableSubcategories}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
