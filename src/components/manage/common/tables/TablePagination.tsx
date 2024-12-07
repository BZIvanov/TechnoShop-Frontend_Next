import { FC } from "react";
import MuiTablePagination, {
  TablePaginationProps as MuiTablePaginationProps,
} from "@mui/material/TablePagination";

interface CustomTablePaginationProps {
  setPage: (newPage: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
}

type TablePaginationProps = Omit<
  MuiTablePaginationProps,
  "onPageChange" | "onRowsPerPageChange"
> &
  CustomTablePaginationProps;

const TablePagination: FC<TablePaginationProps> = ({
  setPage,
  setRowsPerPage,
  ...muiTablePaginationProps
}) => {
  return (
    <MuiTablePagination
      component="div"
      {...muiTablePaginationProps}
      onPageChange={(_, newPage) => setPage(newPage)}
      onRowsPerPageChange={(event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      }}
    />
  );
};

export default TablePagination;
