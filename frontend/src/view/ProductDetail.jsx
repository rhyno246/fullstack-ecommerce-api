import React, { useEffect, useState } from "react";
import Layout from "../component/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../redux/actions/productAction";
import { useParams } from "react-router-dom";
import { Button, Container, Grid, Rating } from "@mui/material";
import { useAlert } from "react-alert";
import MetaData from "../component/layout/MetaData";
import Reviews from "../component/Reviews";
import { addItemsToCart } from "../redux/actions/cartAction";
import InputNumber from "rc-input-number";

const ProductDetail = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { product, error } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const param = useParams();
  const { id } = param;
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProductDetail(id));
  }, [dispatch, id, error, alert]);
  const [index, setIndex] = useState(0);
  const hanleClickSlide = (i) => {
    setIndex(i);
  };

  const increaseQuantity = () => {
    const newQty = Number(quantity) + 1;
    if (product?.stock <= quantity) return;
    setQuantity(newQty);
  };

  const decrimentQuantity = () => {
    const newQty = Number(quantity) - 1;
    if (newQty === 0) return;
    setQuantity(newQty);
  };

  const handleOnchange = (num) => {
    setQuantity(num);
  };

  const hanleAddToCart = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  return (
    <Layout>
      <MetaData title={`Ecommerce - ${product.name}`} />
      <Container>
        <Grid container spacing={2}>
          <Grid item xl={7} md={7} sm={12} xs={12}>
            <div className="product-view">
              <img
                src={product.images ? product.images[index].url : null}
                alt=""
                className="img-res"
              />
            </div>
          </Grid>
          <Grid item xl={5} md={5} sm={12} xs={12}>
            <h2 className="heading-detail">{product?.name}</h2>
            <div className="review">
              <Rating
                name="read-only"
                value={product.ratings ? product.ratings : 0}
                precision={0.5}
                readOnly
              />

              <div className="review-detail">
                {product?.numOfReviews === 0
                  ? ""
                  : `(${product.numOfReviews} Review)`}
              </div>
            </div>
            <div className="price-detail">{product?.price}$</div>
            <div
              className="cartitem-control"
              style={{ margin: "20px 0", justifyContent: "flex-start" }}
            >
              {product?.stock === 0 ? null : (
                <>
                  <Button
                    variant="contained"
                    sx={{ padding: "0px", minWidth: "35px" }}
                    onClick={decrimentQuantity}
                  >
                    -
                  </Button>
                  <InputNumber
                    controls={true}
                    type="number"
                    max={product?.stock}
                    min={1}
                    value={quantity}
                    onChange={handleOnchange}
                  />
                  <Button
                    variant="contained"
                    sx={{ padding: "0px", minWidth: "35px" }}
                    onClick={increaseQuantity}
                  >
                    +
                  </Button>
                </>
              )}
            </div>

            <div className="submit-review">
              <Button variant="contained">Write Review</Button>
              <div className="add-tocart">
                <Button
                  variant="contained"
                  disabled={product?.stock === 0 ? true : false}
                  onClick={hanleAddToCart}
                >
                  Add to cart
                </Button>
              </div>
            </div>

            <div className="child-product">
              {product?.images?.map((item, i) => (
                <div
                  className={`items ${index === i ? "active" : ""}`}
                  key={i}
                  onClick={() => hanleClickSlide(i)}
                >
                  <img src={item?.url} alt={`${i}-Slide`} className="img-res" />
                </div>
              ))}
            </div>
            <div className="status">
              Status :{" "}
              <span
                className={`${product.stock === 0 ? "outstock" : "instock"}`}
              >
                {product.stock === 0 ? "OutStock" : "InStock"}
              </span>
            </div>
            <div className="short-desc">{product.description}</div>
          </Grid>
        </Grid>

        <div className="user-review">
          <h3 className="review-heading">Reviews</h3>
          {product?.reviews?.length ? (
            <div className="review-item">
              {product?.reviews?.map((item, i) => (
                <Reviews key={i} item={item} />
              ))}
            </div>
          ) : (
            <div className="no-review">No Reviews Yet</div>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default ProductDetail;
