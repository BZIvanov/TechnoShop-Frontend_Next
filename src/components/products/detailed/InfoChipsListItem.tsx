import { FC } from 'react';
import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

interface InfoChipsListItemProps {
  linkType: string;
  itemKey: string;
  itemValues: { _id: string; name: string }[] | { _id: string; name: string };
}

const InfoChipsListItem: FC<InfoChipsListItemProps> = ({
  linkType,
  itemKey,
  itemValues,
}) => {
  const navigate = useNavigate();

  const values = Array.isArray(itemValues) ? itemValues : [itemValues];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 1,
        alignItems: 'center',
      }}
    >
      <Typography variant='body1'>{itemKey}:</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {values.map((value) => (
          <Chip
            key={value._id}
            label={value.name}
            variant='outlined'
            onClick={() => navigate(`/${linkType}/${value._id}`)}
            size='small'
            sx={{ margin: 0.2 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default InfoChipsListItem;
