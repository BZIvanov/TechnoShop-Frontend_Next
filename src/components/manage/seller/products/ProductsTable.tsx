import { FC } from "react";
import { Link, useNavigate } from "react-router";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalImage from "react-modal-image";

import { Product } from "@/providers/store/services/types/products";
import { useConfirmDialog } from "@/providers/custom-providers/confirm-dialog/useConfirmDialog";
import { currencyFormatter } from "@/utils/formatting";

interface ProductsTableProps {
  products: Product[];
  deleteProduct: (productId: string) => void;
}

const ProductsTable: FC<ProductsTableProps> = ({ products, deleteProduct }) => {
  const navigate = useNavigate();

  const { openDialog, closeDialog } = useConfirmDialog();

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Brand</TableCell>
            <TableCell align="center">Color</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Shipping</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product) => {
            return (
              <TableRow key={product._id}>
                <TableCell
                  align="center"
                  sx={{ "& > div > img": { height: "30px" } }} // only apply small height to the small image
                >
                  {product.images.length > 0 ? (
                    <ModalImage
                      small={product.images[0].imageUrl}
                      large={product.images[0].imageUrl}
                      alt={product.title}
                    />
                  ) : (
                    <ModalImage
                      small="/images/product.png"
                      large="/images/product.png"
                      alt="Default preview"
                    />
                  )}
                </TableCell>
                <TableCell align="center">
                  <Link to={`/products/${product._id}`}>{product.title}</Link>
                </TableCell>
                <TableCell align="center">
                  {currencyFormatter(product.price)}
                </TableCell>
                <TableCell align="center">{product.brand}</TableCell>
                <TableCell align="center">{product.color}</TableCell>
                <TableCell align="center">{product.quantity}</TableCell>
                <TableCell align="center">{product.shipping}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => navigate(`/seller/product/${product._id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      openDialog({
                        text: "Are you sure you want to delete this product?",
                        onConfirm: () => {
                          closeDialog();
                          deleteProduct(product._id);
                        },
                      });
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
