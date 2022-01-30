import { Container } from "@mui/material";
import React from "react";
import Layout from "../component/layout/Layout";
import MetaData from "../component/layout/MetaData";

const Contact = () => {
  return (
    <Layout>
      <MetaData title="Ecommerce - Contact" />
      <Container>
        <div>Contact</div>
      </Container>
    </Layout>
  );
};

export default Contact;
