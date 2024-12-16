import { type FC } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

import { AdminOrder } from "@/providers/store/services/types/orders";
import { currencyFormatter, dateFormatter } from "@/utils/formatting";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
  },
  section: {
    margin: 10,
    fontSize: 12,
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  product: {
    marginBottom: 5,
    borderBottom: "1px solid #ccc",
    paddingBottom: 5,
  },
});

interface PdfCellProps {
  order: AdminOrder;
}

const PdfCell: FC<PdfCellProps> = ({ order }) => {
  const {
    _id,
    createdAt,
    totalPrice,
    deliveryAddress,
    deliveryStatus,
    coupon,
    orderItems = [],
  } = order;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Order Details</Text>
          <Text>ID: {_id}</Text>
          <Text>
            Created At:{" "}
            {dateFormatter(createdAt, {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Text>
          <Text>Total Amount: {currencyFormatter(totalPrice)}</Text>
          <Text>Delivery Address: {deliveryAddress}</Text>
          <Text>Coupon: {coupon?.name || "-"}</Text>
          <Text>Order Status: {deliveryStatus}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Products</Text>
          {orderItems.map((orderItem) => {
            return (
              <View key={orderItem._id} style={styles.product}>
                <Text>Order Item ID: {orderItem._id}</Text>
                <Text>
                  Total Price: {currencyFormatter(orderItem.totalPrice)}
                </Text>
                <Text>Delivery Status: {orderItem.deliveryStatus}</Text>
                <Text>Shop: {orderItem.shop?.shopInfo?.name || ""}</Text>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export default PdfCell;
