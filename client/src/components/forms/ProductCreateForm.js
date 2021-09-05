import { Select } from 'antd';

const { Option } = Select;

const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
const brands = ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'];
const shippingOptions = ['Yes', 'No'];

const ProductCreateForm = ({
  values,
  setValues,
  handleChange,
  handleCategoryChange,
  handleSubmit,
  availableCategories,
  availableSubcategories,
}) => {
  const { title, description, price, quantity, subcategories } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>Title</label>
        <input
          type='text'
          name='title'
          className='form-control'
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>Description</label>
        <input
          type='text'
          name='description'
          className='form-control'
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>Price</label>
        <input
          type='number'
          name='price'
          className='form-control'
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>Shipping</label>
        <select
          name='shipping'
          className='form-control'
          onChange={handleChange}
        >
          <option disabled>Select shipping</option>
          {shippingOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className='form-group'>
        <label>Quantity</label>
        <input
          type='number'
          name='quantity'
          className='form-control'
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>Color</label>
        <select name='color' className='form-control' onChange={handleChange}>
          <option disabled>Select color</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className='form-group'>
        <label>Brand</label>
        <select name='brand' className='form-control' onChange={handleChange}>
          <option disabled>Select brand</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className='form-group'>
        <label>Category</label>
        <select
          name='category'
          className='form-control'
          onChange={handleCategoryChange}
        >
          <option disabled>Select category</option>
          {availableCategories.map(({ _id, name }) => (
            <option key={_id} value={_id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Sub Categories</label>
        <Select
          mode='multiple'
          style={{ width: '100%' }}
          placeholder='Select subcategories'
          value={subcategories}
          onChange={(value) => setValues({ ...values, subcategories: value })}
        >
          {availableSubcategories.map(({ _id, name }) => (
            <Option key={_id} value={_id}>
              {name}
            </Option>
          ))}
        </Select>
      </div>

      <br />
      <button className='btn btn-outline-info'>Save</button>
    </form>
  );
};

export default ProductCreateForm;
