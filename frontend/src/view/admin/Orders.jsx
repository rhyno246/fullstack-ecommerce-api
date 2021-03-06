import React from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  allAdminOrder,
  clearErrors,
  deleteOrderAdmin,
} from "../../redux/actions/orderAction";
import Layout from "./Layout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../../component/Loader";
import { DELETE_ORDER_RESET } from "../../redux/types";

const Orders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { allOrderAdmin, error, isDeleted, loading } = useSelector(
    (state) => state.order
  );

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrderAdmin(id));
  };

  useEffect(() => {
    dispatch(allAdminOrder());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, alert, error, isDeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.formattedValue === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "amount",
      headerName: "Amount",
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
              to={`/admin/orders/${params.id}`}
              style={{ color: "#1976d2" }}
            >
              <EditIcon />
            </Link>

            <Button onClick={() => deleteOrderHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];
  const rows = [];
  allOrderAdmin &&
    allOrderAdmin.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Layout title="Orders">
      {loading ? (
        <Loader />
      ) : (
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
      )}
    </Layout>
  );
};

export default Orders;
