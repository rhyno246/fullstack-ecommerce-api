import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CartItems from "../component/CartItems";
import Layout from "../component/layout/Layout";
import MetaData from "../component/layout/MetaData";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link, useHistory } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const history = useHistory();
  const handleCheckOut = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <Layout>
      <MetaData title="Ecommerce - Cart" />
      <Container>
        {cartItems?.length ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <caption>
                <p style={{ margin: "0" }}>
                  Gross total : $
                  {cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}
                </p>
                <Button
                  variant="contained"
                  sx={{ marginTop: "15px" }}
                  onClick={handleCheckOut}
                >
                  CheckOut
                </Button>
              </caption>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Subtotal</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems?.map((item, i) => (
                  <CartItems item={item} key={i} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className="emtry-cart">
            <RemoveShoppingCartIcon />
            <Typography>No Product In Your Cart</Typography>
            <Link to="/products">View Products</Link>
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default Cart;
