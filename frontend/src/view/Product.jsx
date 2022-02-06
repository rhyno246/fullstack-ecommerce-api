import { Box, Container, Grid, Slider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Layout from "../component/layout/Layout";
import MetaData from "../component/layout/MetaData";
import ProductItem from "../component/ProductItem";
import { clearErrors, getAllProduct } from "../redux/actions/productAction";
import Pagination from "react-js-pagination";
import Loader from "../component/Loader";

const Product = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {
    products,
    loading,
    error,
    resultPerPage,
    productCount,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const keyword = query.get("keyword");
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 10000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const handlePrice = (e, newPrice) => {
    setPrice(newPrice);
  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(
      getAllProduct(keyword || "", currentPage, price, category, ratings)
    );
  }, [dispatch, alert, error, keyword, currentPage, price, category, ratings]);

  const categories = [
    "Laptop",
    "Camera",
    "SmartPhones",
    "PC",
    "Watch",
    "Tablet",
    "HeadPhone",
  ];

  return (
    <Layout>
      <MetaData title="Ecommerce - Products" />
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Grid container spacing={5}>
            <Grid item xl={3} md={3} sm={12} xs={12}>
              <div className="filterBox" style={{ padding: "0 10px" }}>
                <Slider
                  getAriaLabel={() => "Minimum distance shift"}
                  size="small"
                  value={price}
                  onChange={handlePrice}
                  valueLabelDisplay="on"
                  min={0}
                  max={10000}
                />
              </div>
              <div className="category">
                <Typography sx={{ fontSize: "22px" }}>Category</Typography>
                <ul>
                  {categories?.map((item, i) => (
                    <li key={i} onClick={() => setCategory(item)}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ratings">
                <fieldset style={{ padding: "5px 20px" }}>
                  <Typography component="legend">Ratings Above</Typography>
                  <Slider
                    value={ratings}
                    onChange={(e, newRating) => {
                      setRatings(newRating);
                    }}
                    valueLabelDisplay="auto"
                    size="small"
                    getAriaLabel={() => "Minimum distance shift"}
                    min={0}
                    max={5}
                  />
                </fieldset>
              </div>
            </Grid>
            <Grid item xl={9} md={9} sm={12} xs={12}>
              <Box sx={{ width: "100%" }}>
                {products?.length ? (
                  <Grid
                    container
                    rowSpacing={2}
                    columnSpacing={{ xs: 2, sm: 2, md: 2 }}
                  >
                    {products?.map((item, i) => (
                      <ProductItem key={i} product={item} />
                    ))}
                  </Grid>
                ) : (
                  <div className="product-notfound">Cannot find product</div>
                )}
                {resultPerPage < count && (
                  <div className="paginationBox">
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={productCount}
                      onChange={setCurrentPageNo}
                      nextPageText="Next"
                      prevPageText="Prev"
                      firstPageText="First"
                      lastPageText="Last"
                      itemClass="page-item"
                      linkClass="page-link"
                      activeClass="pageItemActive"
                      activeLinkClass="pageLinkActive"
                    />
                  </div>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </Layout>
  );
};

export default Product;
