import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import { useGetShopsQuery } from '@/providers/store/services/shops';
import { ShopActivityStatus } from '@/providers/store/services/types/shops';
import ShopsList from './ShopsList';
import ShopsPagination from './ShopsPagination';

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50];

const shopActivityStatuses: Record<ShopActivityStatus, ShopActivityStatus> = {
  active: 'active',
  deactive: 'deactive',
};

const ManageShops: FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    ROWS_PER_PAGE_OPTIONS[0]
  );
  const [activityStatus, setActivityStatus] = useState<ShopActivityStatus>(
    shopActivityStatuses.active
  );

  const { data, isLoading } = useGetShopsQuery({
    page,
    perPage: rowsPerPage,
    activityStatus,
  });

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h5'>Manage Shops</Typography>

      <Divider sx={{ marginBlock: 2 }} />

      <Box sx={{ marginBlock: 2 }}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <InputLabel id='activity-status-label'>Activity Status</InputLabel>
          <Select
            labelId='activity-status-label'
            id='activity-status'
            value={activityStatus}
            label='Activity Status'
            onChange={(event) => {
              setActivityStatus(event.target.value as ShopActivityStatus);
            }}
            disabled={isLoading}
          >
            {Object.keys(shopActivityStatuses).map((shopActivityStatus) => {
              return (
                <MenuItem key={shopActivityStatus} value={shopActivityStatus}>
                  {shopActivityStatus}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>

      <ShopsList
        shops={data?.shops || []}
        paginationComponent={
          <ShopsPagination
            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
            totalCount={data?.totalCount}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        }
      />
    </Box>
  );
};

export default ManageShops;
