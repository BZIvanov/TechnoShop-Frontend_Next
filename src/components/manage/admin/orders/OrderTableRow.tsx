import { useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { PDFDownloadLink } from "@react-pdf/renderer";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DownloadIcon from "@mui/icons-material/Download";
import DownloadingIcon from "@mui/icons-material/Downloading";

import { AdminOrder } from "@/providers/store/services/types/orders";
import { currencyFormatter, dateFormatter } from "@/utils/formatting";
import PdfCell from "./PdfCell";

interface OrderTableRowProps {
  order: AdminOrder;
}

const OrderTableRow = ({ order }: OrderTableRowProps) => {
  const [isRowExpanded, setIsRowExpanded] = useState(false);

  const {
    _id,
    createdAt,
    buyer,
    totalPrice,
    deliveryAddress,
    deliveryStatus,
    couponDetails,
    orderItems,
  } = order;

  return (
    <>
      <TableRow>
        <TableCell align="center">
          <IconButton
            size="small"
            onClick={() => setIsRowExpanded((prevValue) => !prevValue)}
          >
            {isRowExpanded ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell align="center">{_id}</TableCell>
        <TableCell align="center">
          {dateFormatter(createdAt, {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </TableCell>
        <TableCell align="center">{buyer.username}</TableCell>
        <TableCell align="center">{currencyFormatter(totalPrice)}</TableCell>
        <TableCell align="center">{deliveryAddress}</TableCell>
        <TableCell align="center">{couponDetails[0]?.name || "-"}</TableCell>
        <TableCell align="center">{deliveryStatus}</TableCell>
        <TableCell align="center">
          <PDFDownloadLink
            document={<PdfCell order={order} />}
            fileName="Orders.pdf"
          >
            {/* @ts-expect-error It is how this package works and this will not cause an error */}
            {({ loading }) => {
              return (
                <IconButton disabled={loading}>
                  {loading ? <DownloadingIcon /> : <DownloadIcon />}
                </IconButton>
              );
            }}
          </PDFDownloadLink>
        </TableCell>
      </TableRow>

      <TableRow sx={{ "& > *": { borderBottom: "unset", borderTop: "unset" } }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={isRowExpanded} timeout="auto" unmountOnExit={true}>
            <Box sx={{ margin: 1 }}>
              <Typography variant="body1" gutterBottom={true}>
                Order Items
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Order Item ID</TableCell>
                    <TableCell align="center">Order Item Total Price</TableCell>
                    <TableCell align="center">Delivery Status</TableCell>
                    <TableCell align="center">Payment Status</TableCell>
                    <TableCell align="center">Shop Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    // remove the broders from the last row
                    "& > tr:last-child td": {
                      borderBottom: "none",
                    },
                  }}
                >
                  {orderItems.map((orderItem) => {
                    return (
                      <TableRow key={orderItem._id}>
                        <TableCell align="center">{orderItem._id}</TableCell>
                        <TableCell align="center">
                          {currencyFormatter(orderItem.totalPrice)}
                        </TableCell>
                        <TableCell align="center">
                          {orderItem.deliveryStatus}
                        </TableCell>
                        <TableCell align="center">
                          {orderItem.paymentStatus}
                        </TableCell>
                        <TableCell align="center">
                          {orderItem.shop?.shopInfo?.name || ""}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderTableRow;
