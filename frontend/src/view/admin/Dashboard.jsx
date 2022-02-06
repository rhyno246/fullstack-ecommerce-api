import React, { useEffect } from "react";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LayersIcon from "@mui/icons-material/Layers";
import CommentIcon from "@mui/icons-material/Comment";
import Layout from "./Layout";
import Chart from "react-apexcharts";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../redux/actions/productAction";
import { allAdminOrder } from "../../redux/actions/orderAction";
const Dashboard = () => {
  const { products } = useSelector((state) => state.products);
  const { allOrderAdmin } = useSelector((state) => state.order);
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
  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allAdminOrder());
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
                <div className="total-number">20</div>
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
                <div className="heading">Total Reviews</div>
                <div className="total-number">20</div>
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
              type="line"
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
    </Layout>
  );
};

export default Dashboard;
