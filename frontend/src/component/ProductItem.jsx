import React from "react";
import { Grid, Paper, Rating } from "@mui/material";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  return (
    <Grid item xl={4} md={4} sm={6} xs={12}>
      <Link to={`product/${product.id}`} style={{ textDecoration: "none" }}>
        <Paper sx={{ padding: "10px" }} elevation={0}>
          <div className="product-item">
            <div
              className="product-image"
              style={{ background: `url(${product.images[0].url})` }}
            ></div>
            <div className="name" style={{ marginBottom: "5px" }}>
              {product.name}
            </div>
            <div className="start" style={{ marginBottom: "5px" }}>
              <Rating
                name="read-only"
                value={product.ratings}
                readOnly
                precision={0.5}
              />
            </div>
            <div className="bottom-item">
              <span className="price">{product.price}$</span>
              <span className="review">
                {product?.numOfReviews === 0
                  ? ""
                  : `${product.numOfReviews} Review`}
              </span>
            </div>
          </div>
        </Paper>
      </Link>
    </Grid>
  );
};

export default ProductItem;
