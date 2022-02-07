import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../component/Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  clearErrors,
  deleteReviews,
  getAdminReviews,
} from "../../redux/actions/productAction";
import Layout from "./Layout";
import { DELETE_REVIEW_RESET } from "../../redux/types";

const Reviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const param = useParams();
  const { id } = param;
  const { error, isReviewsDeleted, loading, reviewsAdmin } = useSelector(
    (state) => state.products
  );

  const handleDeleteReviews = (reviewsId, productId) => {
    dispatch(deleteReviews(reviewsId, productId));
  };

  const columns = [
    { field: "id", headerName: "Reviews ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "comment",
      headerName: "Reviews",
      minWidth: 350,
      flex: 1,
    },
    { field: "rating", headerName: "Rating", minWidth: 200, flex: 0.5 },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDeleteReviews(params.id, id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  reviewsAdmin &&
    reviewsAdmin.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        comment: item.comment,
        rating: item.rating,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isReviewsDeleted) {
      alert.success("Reviews Deleted Successfully");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
    dispatch(getAdminReviews(id));
  }, [dispatch, id, error, alert, isReviewsDeleted]);

  return (
    <Layout title={`Reviews - ${id}`}>
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
            sx={{ marginTop: 3 }}
          />
        </div>
      )}
    </Layout>
  );
};

export default Reviews;
