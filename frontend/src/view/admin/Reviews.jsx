import React from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./Layout";

const Reviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, isDeleted, loading, reviewsAdmin } = useSelector(
    (state) => state.products
  );

  return <Layout title="Reviews">Reviews</Layout>;
};

export default Reviews;
