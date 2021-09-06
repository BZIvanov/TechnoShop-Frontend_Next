import StarRating from 'react-star-ratings';

const StarsRating = ({ ratings }) => {
  const allStarsSum = ratings
    .map((rating) => rating.star)
    .reduce((total, star) => total + star, 0);

  const averageRating = allStarsSum / ratings.length;

  return (
    <div className='text-center pt-1 pb-3'>
      <span>
        <StarRating
          starDimension='20px'
          starSpacing='2px'
          starRatedColor='red'
          rating={averageRating}
          editing={false}
        />{' '}
        ({ratings.length})
      </span>
    </div>
  );
};

export default StarsRating;
