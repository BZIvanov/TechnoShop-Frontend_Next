import { FC } from 'react';
import { useNavigate } from 'react-router';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import { Image } from '@/providers/store/services/types/common';

interface ChipsListProps {
  title: string;
  parameter: string;
  chipsList: { _id: string; name: string; image?: Image }[];
}

const ChipsList: FC<ChipsListProps> = ({
  title,
  parameter,
  chipsList = [],
}) => {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/${parameter}/${id}`);
  };

  return (
    <Paper sx={{ marginBlock: 3, padding: 2 }}>
      <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: 1 }}>
        {title}
      </Typography>

      {chipsList.map((chipItem) => (
        <Chip
          key={chipItem._id}
          label={chipItem.name}
          variant='outlined'
          avatar={
            chipItem.image && (
              <Avatar alt='Category preview' src={chipItem.image.imageUrl} />
            )
          }
          onClick={() => handleClick(chipItem._id)}
          sx={{ margin: 0.5 }}
        />
      ))}
    </Paper>
  );
};

export default ChipsList;
