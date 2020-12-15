import { Card, Skeleton } from 'antd';

const LoadingCard = ({ count }) => (
  <div className='row pb-5'>
    {new Array(count).fill(undefined).map((_, idx) => (
      <Card key={idx} className='col-md-4'>
        <Skeleton active></Skeleton>
      </Card>
    ))}
  </div>
);

export default LoadingCard;
