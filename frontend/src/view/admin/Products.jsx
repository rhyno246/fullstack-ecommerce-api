import React, { useEffect } from "react";
import Layout from "./Layout";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../component/Loader";
import { DataGrid } from "@mui/x-data-grid";
import {
  clearErrors,
  deleteProductAdmin,
  getAdminProducts,
} from "../../redux/actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../redux/types";
const Products = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { products, loading, error, isDeleted } = useSelector(
    (state) => state.products
  );
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`/admin/product/${params.id}`}
              style={{ color: "#1976d2" }}
            >
              <EditIcon />
            </Link>
            <Button onClick={() => handleDeleteProductAdmin(params.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];
  const handleDeleteProductAdmin = (id) => {
    dispatch(deleteProductAdmin(id));
  };

  const rows = [];
  products &&
    products.forEach((item, index) => {
      rows.push({
        id: item.id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProducts());
  }, [dispatch, alert, error, isDeleted]);

  return (
    <Layout title="Products">
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <Link
            to="/admin/product"
            style={{
              textDecoration: "none",
              background: "#1976d2",
              color: "#fff",
              padding: "10px 25px",
            }}
          >
            Add New Product
          </Link>
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

export default Products;
