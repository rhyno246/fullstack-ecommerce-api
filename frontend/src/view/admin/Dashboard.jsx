import React, { useEffect } from "react";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LayersIcon from "@mui/icons-material/Layers";
import CommentIcon from "@mui/icons-material/Comment";
import Layout from "./Layout";
import Chart from "react-apexcharts";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../redux/actions/productAction";
import { allAdminOrder } from "../../redux/actions/orderAction";
import { allUserAdmin } from "../../redux/actions/userAction";
import { DataGrid } from "@mui/x-data-grid";
import { getAllContact } from "../../redux/actions/contactAction";
const Dashboard = () => {
  const { products } = useSelector((state) => state.products);
  const { allOrderAdmin } = useSelector((state) => state.order);
  const { allUsersAdmin } = useSelector((state) => state.user);
  const { contacts } = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  const chartOptions = {
    series: [
      {
        name: "User Orders",
        data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
      },
    ],
    options: {
      color: ["#2980b9"],
      chart: {
        background: "transparent",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "category",
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
      legend: {
        position: "top",
      },
      grid: {
        show: false,
      },
    },
  };

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
  let totalAmount = 0;
  allOrderAdmin &&
    allOrderAdmin.forEach((item) => {
      totalAmount += item.totalPrice;
    });
  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allAdminOrder());
    dispatch(allUserAdmin());
    dispatch(getAllContact());
  }, [dispatch]);

  return (
    <Layout title="Dashboard">
      <div className="top-items">
        <Grid container spacing={5}>
          <Grid item xl={3} md={3} sm={12} xs={12}>
            <Box sx={{ boxShadow: 1, borderRadius: 2, padding: "30px 15px" }}>
              <div className="icon-items">
                <div className="icons">
                  <GroupIcon />
                </div>
                <div className="heading">Total Users</div>
                <div className="total-number">{allUsersAdmin?.length}</div>
              </div>
            </Box>
          </Grid>
          <Grid item xl={3} md={3} sm={12} xs={12}>
            <Box sx={{ boxShadow: 1, borderRadius: 2, padding: "30px 15px" }}>
              <div className="icon-items">
                <div className="icons">
                  <LayersIcon />
                </div>
                <div className="heading">Total Products</div>
                <div className="total-number">{products?.length}</div>
              </div>
            </Box>
          </Grid>

          <Grid item xl={3} md={3} sm={12} xs={12}>
            <Box sx={{ boxShadow: 1, borderRadius: 2, padding: "30px 15px" }}>
              <div className="icon-items">
                <div className="icons">
                  <ShoppingCartIcon />
                </div>
                <div className="heading">Total Orders</div>
                <div className="total-number">{allOrderAdmin?.length}</div>
              </div>
            </Box>
          </Grid>
          <Grid item xl={3} md={3} sm={12} xs={12}>
            <Box sx={{ boxShadow: 1, borderRadius: 2, padding: "30px 15px" }}>
              <div className="icon-items">
                <div className="icons">
                  <CommentIcon />
                </div>
                <div className="heading">Total Comment</div>
                <div className="total-number">{contacts?.length}</div>
              </div>
            </Box>
          </Grid>
        </Grid>
      </div>
      <Grid container spacing={5} sx={{ marginTop: 0 }}>
        <Grid item xl={6} md={6} sm={6} xs={12}>
          <Box sx={{ boxShadow: 1, borderRadius: 2, padding: "10px" }}>
            <Chart
              options={chartOptions.options}
              series={chartOptions.series}
              type="bar"
              height={400}
            />
          </Box>
        </Grid>

        <Grid item xl={6} md={6} sm={6} xs={12}>
          <Chart
            series={[outOfStock, products?.length - outOfStock]}
            type="donut"
            height={400}
            options={{
              labels: ["OutStock", "InStock"],
              dataLabels: {
                enabled: false,
              },
            }}
          />
        </Grid>
      </Grid>
      <div className="order">
        <Typography variant="h5" component="h5" sx={{ marginTop: 3 }}>
          Total Amount : ${totalAmount}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          className="myOrdersTable"
          autoHeight
          sx={{ marginTop: 1 }}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
