import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { searchAction } from '../../store/action-creators';
import { NAV_LINKS } from '../../constants';

const Search = () => {
  const { text } = useSelector((state) => state.search);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    dispatch(searchAction({ text: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(NAV_LINKS.SHOP.ROUTE);
  };

  return (
    <form className='form-inline my-2 my-lg-0' onSubmit={handleSubmit}>
      <input
        type='search'
        value={text}
        onChange={handleChange}
        className='form-control mr-sm-2'
        placeholder='Search'
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: 'pointer' }} />
    </form>
  );
};

export default Search;
