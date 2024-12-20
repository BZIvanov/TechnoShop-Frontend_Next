import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import {
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useGetCouponsQuery,
} from "@/providers/store/services/coupons";
import { useForm } from "@/components/form/hooks/useForm";
import TablePagination from "@/components/manage/common/tables/TablePagination";
import CouponsList from "./CouponsList";
import CouponForm from "./CouponForm";
import { schema, CouponFormData } from "./couponForm.schema";

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50];

const defaultValues = { name: "", discount: 0, expirationDate: new Date() };

const ManageCoupons = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    ROWS_PER_PAGE_OPTIONS[0]
  );

  const { data, isLoading } = useGetCouponsQuery({
    page,
    perPage: rowsPerPage,
  });
  const [createCoupon, { isLoading: isCreating }] = useCreateCouponMutation();
  const [deleteCoupon, { isLoading: isDeleting }] = useDeleteCouponMutation();

  const form = useForm<CouponFormData>({
    schema,
    defaultValues,
  });

  const handleCreateCoupon = async (values: CouponFormData) => {
    const result = await createCoupon(values);

    if (!("error" in result)) {
      form.reset();
    }
  };

  const handleDeleteCoupon = (couponId: string) => {
    deleteCoupon(couponId);
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant="h5">Manage Coupons</Typography>

      <Divider sx={{ marginBlock: 2 }} />

      <CouponForm
        form={form}
        createCoupon={handleCreateCoupon}
        isSubmitting={isLoading || isCreating || isDeleting}
      />

      <Divider sx={{ marginBlock: 2 }} />

      <CouponsList
        coupons={data?.coupons || []}
        deleteCoupon={handleDeleteCoupon}
        paginationComponent={
          <TablePagination
            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
            count={data?.totalCount || 0}
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

export default ManageCoupons;
