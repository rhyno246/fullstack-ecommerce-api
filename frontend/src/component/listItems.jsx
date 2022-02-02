import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import LayersIcon from "@mui/icons-material/Layers";
import CommentIcon from "@mui/icons-material/Comment";
import GroupIcon from "@mui/icons-material/Group";
import { NavLink } from "react-router-dom";
import { Box, Grid } from "@mui/material";

export const mainListItems = (
  <div className="dashboard-menu">
    <NavLink exact to="/admin/dashboard">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </NavLink>

    <NavLink to="/admin/products">
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItem>
    </NavLink>

    <NavLink to="/admin/orders">
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem>
    </NavLink>

    <NavLink to="/admin/users">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
    </NavLink>

    <NavLink to="/admin/reviews">
      <ListItem button>
        <ListItemIcon>
          <CommentIcon />
        </ListItemIcon>
        <ListItemText primary="Reviews" />
      </ListItem>
    </NavLink>
  </div>
);

export const listItemsDashBoard = (
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
          <div className="total-number">20</div>
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
          <div className="total-number">20</div>
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
);
