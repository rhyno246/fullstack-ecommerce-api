import React from "react";
import MetaData from "../component/layout/MetaData";
import Layout from "../component/layout/Layout";
import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const OrderSuccess = () => {
  return (
    <Layout>
      <MetaData title="Payment" />
      <Container>
        <Typography sx={{ textAlign: "center", fontSize: "30px" }}>
          Your order has been Placed successfully
        </Typography>
        <Typography
          sx={{ textAlign: "center", fontSize: "20px", marginTop: "20px" }}
        >
          <Link
            to="/order"
            style={{
              backgroundColor: "#1976d2",
              textDecoration: "none",
              color: "#fff",
              padding: "10px 40px",
            }}
          >
            View Orders
          </Link>
        </Typography>
      </Container>
    </Layout>
  );
};

export default OrderSuccess;
