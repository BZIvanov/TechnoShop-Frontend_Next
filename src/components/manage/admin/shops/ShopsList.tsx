import { type ReactNode } from "react";
import { Link } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { Shop } from "@/providers/store/services/types/shops";

interface ShopsListProps {
  shops: Shop[];
  paginationComponent: ReactNode;
}

const ShopsList = ({ shops = [], paginationComponent }: ShopsListProps) => {
  return (
    <Box>
      <Typography variant="h5">Shops List</Typography>

      <Paper sx={{ margin: 1 }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Activity status</TableCell>
                <TableCell align="center">Payment status Date</TableCell>
                <TableCell align="center">Seller</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shops.map((shop) => {
                return (
                  <TableRow key={shop._id}>
                    <TableCell align="center">
                      <Link to={`/admin/shops/${shop._id}`}>
                        {shop?.shopInfo?.name}
                      </Link>
                    </TableCell>
                    <TableCell align="center">{shop.activityStatus}</TableCell>
                    <TableCell align="center">{shop.paymentStatus}</TableCell>
                    <TableCell align="center">{shop.user?.username}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {paginationComponent}
      </Paper>
    </Box>
  );
};

export default ShopsList;
