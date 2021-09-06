const ProductListItem = ({ label, text }) => {
  return (
    <li className='list-group-item'>
      <span>{label}</span>

      <span className='label label-default label-pill pull-xs-right'>
        {text}
      </span>
    </li>
  );
};

export default ProductListItem;
