import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/nav/AdminNav';
import FileUpload from '../../../components/forms/FileUpload';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import {
  getProductAction,
  getAllCategoriesAction,
  getCategorySubcategoriesAction,
  updateProductAction,
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

const ProductUpdate = () => {
  const { user } = useSelector((state) => state.user);
  const { selectedProduct } = useSelector((state) => state.product);
  const {
    categories: availableCategories,
    subcategories: availableSubcategories,
  } = useSelector((state) => state.category);
  const { loading, success, error } = useSelector((state) => state.apiCall);

  const history = useHistory();
  const dispatch = useDispatch();
  const { slug } = useParams();

  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    dispatch(getProductAction(slug));
    dispatch(getAllCategoriesAction());
  }, [dispatch, slug]);

  useEffect(() => {
    if (selectedProduct) {
      dispatch(getCategorySubcategoriesAction(selectedProduct.category._id));
    }
  }, [dispatch, selectedProduct]);

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

  // rewrite initialValues with the product values
  useEffect(() => {
    if (selectedProduct) {
      const originalCategoryId = selectedProduct.category._id;
      const originalSubcategoriesIds = selectedProduct.subcategories.map(
        (subcategory) => subcategory._id
      );

      setValues((values) => ({
        ...values,
        title: selectedProduct.title,
        description: selectedProduct.description,
        price: selectedProduct.price,
        shipping: selectedProduct.shipping,
        quantity: selectedProduct.quantity,
        color: selectedProduct.color,
        brand: selectedProduct.brand,
        category: originalCategoryId,
        subcategories: originalSubcategoriesIds,
        images: selectedProduct.images,
      }));

      // save the original values in the initial values to be able to reffer to them later if needed
      // we need this for setState for handleCategoryChange
      initialValues.category = originalCategoryId;
      initialValues.subcategories = originalSubcategoriesIds;
    }
  }, [selectedProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProductAction(slug, values, user.token));
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();

    setValues({
      ...values,
      category: e.target.value,
      subcategories:
        e.target.value === initialValues.category
          ? initialValues.subcategories
          : [],
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
            <h4>Product update</h4>
          )}

          <div className='p-3'>
            <FileUpload values={values} setValues={setValues} />
          </div>

          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            availableCategories={availableCategories}
            availableSubcategories={availableSubcategories}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
