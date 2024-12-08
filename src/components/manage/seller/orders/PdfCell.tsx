import { FC } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

import { SellerOrder } from "@/providers/store/services/types/orders";
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
  order: SellerOrder;
}

const PdfCell: FC<PdfCellProps> = ({ order }) => {
  const {
    _id,
    createdAt,
    totalPrice,
    deliveryAddress,
    deliveryStatus,
    coupon,
    products,
  } = order;
  const { name: couponName } = coupon || {};

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
          <Text>Coupon: {couponName || "-"}</Text>
          <Text>Order Status: {deliveryStatus}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Products</Text>
          {products.map((orderProduct) => {
            const { product, count } = orderProduct;

            if (!product) {
              return (
                <View key={orderProduct._id}>
                  <Text>No longer available product</Text>
                </View>
              );
            }

            return (
              <View key={product._id} style={styles.product}>
                <Text>Product name: {product.title}</Text>
                <Text>Product price: {currencyFormatter(product.price)}</Text>
                <Text>Quantity: {count}</Text>
                <Text>
                  Total Price: {currencyFormatter(product.price * count)}
                </Text>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export default PdfCell;
