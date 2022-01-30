import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../component/layout/Layout";
import MetaData from "../component/layout/MetaData";
import { useAlert } from "react-alert";
import { clearErrors, myOrders } from "../redux/actions/orderAction";
import Loader from "../component/Loader";
import { DataGrid } from "@mui/x-data-grid";
import LaunchIcon from "@mui/icons-material/Launch";
import { Link } from "react-router-dom";

const Order = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { users } = useSelector((state) => state.user);
  const { loading, error, myorders } = useSelector((state) => state.order);
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
      flex: 0.3,
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
          <Link to={`/order/${params.id}`} style={{ color: "#1976d2" }}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  myorders &&
    myorders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, alert, error]);
  return (
    <Layout>
      <MetaData title={`Order - ${users?.name}`} />
      <Container>
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
            />
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default Order;
