import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import LayersIcon from "@mui/icons-material/Layers";
import CommentIcon from "@mui/icons-material/Comment";
import { NavLink } from "react-router-dom";
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
