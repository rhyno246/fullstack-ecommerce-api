import React, { useEffect } from "react";
import Layout from "../component/layout/Layout";
import ProductItem from "../component/ProductItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import MetaData from "../component/layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllProduct } from "../redux/actions/productAction";
import { useAlert } from "react-alert";
import Loader from "../component/Loader";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllProduct());
  }, [dispatch, alert, error]);
  return (
    <Layout>
      <MetaData title="Ecommerce - Home" />
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 2, sm: 2, md: 2 }}
            >
              {products?.map((item, i) => (
                <ProductItem key={i} product={item} />
              ))}
            </Grid>
          </Box>
        </Container>
      )}
    </Layout>
  );
};

export default Home;
