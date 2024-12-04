import { FC } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

import { useGetBuyerOrdersStatsQuery } from '@/providers/store/services/orders';
import DashboardCard from '@/components/manage/common/cards/DashboardCard';

const BuyerDashboard: FC = () => {
  const { data: ordersStatsData } = useGetBuyerOrdersStatsQuery();

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        margin: 2,
        borderRadius: 2,
        background: 'linear-gradient(to right, #ece9e6, #ffffff)',
      }}
    >
      <Typography
        variant='h4'
        sx={{
          textAlign: 'center',
          marginBottom: 4,
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        Dashboard Overview
      </Typography>
      <Grid container={true} spacing={3} columns={{ xs: 1, md: 6, lg: 12 }}>
        <DashboardCard
          label='All orders'
          value={ordersStatsData?.totalOrders || 0}
          valueColor='#1976d2'
          size={{ xs: 1, md: 3, lg: 4 }}
        />

        <DashboardCard
          label='Pending orders'
          value={ordersStatsData?.pendingOrders || 0}
          valueColor='#43a047'
          size={{ xs: 1, md: 3, lg: 4 }}
        />

        <DashboardCard
          label='Canceled orders'
          value={ordersStatsData?.canceledOrders || 0}
          valueColor='#f57c00'
          size={{ xs: 1, md: 3, lg: 4 }}
        />
      </Grid>
    </Paper>
  );
};

export default BuyerDashboard;
