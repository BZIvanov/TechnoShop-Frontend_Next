import { Link } from 'react-router-dom';

const LinkTo = ({ text, linkTo }) => {
  return (
    <Link to={linkTo} className='label label-default label-pill pull-xs-right'>
      {text}
    </Link>
  );
};

export default LinkTo;
