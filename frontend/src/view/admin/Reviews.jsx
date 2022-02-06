import React from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "./Layout";

const Reviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const param = useParams();
  const { id } = param;
  const { error, isDeleted, loading, reviewsAdmin } = useSelector(
    (state) => state.products
  );

  return <Layout title={`Reviews - ${id}`}>Reviews</Layout>;
};

export default Reviews;
