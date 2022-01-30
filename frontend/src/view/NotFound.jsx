import { Container } from "@mui/material";
import React from "react";
import Layout from "../component/layout/Layout";
import MetaData from "../component/layout/MetaData";

const NotFound = () => {
  return (
    <Layout>
      <MetaData title="Ecommerce - NotFound" />
      <Container>Not Found</Container>
    </Layout>
  );
};

export default NotFound;
