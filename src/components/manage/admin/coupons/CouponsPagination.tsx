import { FC } from "react";
import TablePagination from "@mui/material/TablePagination";

interface CouponsPagination {
  rowsPerPageOptions: number[];
  totalCount?: number;
  page: number;
  setPage: (newPage: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
}

const CouponsPagination: FC<CouponsPagination> = ({
  rowsPerPageOptions,
  totalCount = 0,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) => {
  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={totalCount}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={(_, newPage) => setPage(newPage)}
      onRowsPerPageChange={(event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      }}
    />
  );
};

export default CouponsPagination;
