import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink, useHistory } from "react-router-dom";
import logo from "../assets/logo.png";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ContactsIcon from "@mui/icons-material/Contacts";
import HvacIcon from "@mui/icons-material/Hvac";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchForm from "../SearchForm";
import { useSelector, useDispatch } from "react-redux";
import { Backdrop, Badge, SpeedDial, SpeedDialAction } from "@mui/material";
import { logout } from "../../redux/actions/userAction";

const Header = () => {
  const [menuMobile, setMenuMobile] = useState({
    left: false,
  });

  const { isAuthenticated, users } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setMenuMobile({ ...menuMobile, [anchor]: open });
  };

  const menu = [
    {
      label: "Home",
      icon: <HomeIcon />,
      to: "/",
    },
    {
      label: "Products",
      icon: <Inventory2Icon />,
      to: "/products",
    },
    {
      label: "Contact",
      icon: <ContactsIcon />,
      to: "/contact",
    },
    {
      label: "About",
      icon: <HvacIcon />,
      to: "/about",
    },
  ];

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <NavLink to="/">
          <img
            src={logo}
            alt="logo"
            style={{
              width: "150px",
              display: "block",
              margin: "auto",
              padding: "20px 0",
            }}
          />
        </NavLink>
        {menu.map((item, index) => (
          <ListItem button key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <NavLink
              to={item.to}
              style={{ textDecoration: "none" }}
              className="mobile-menu"
              exact
            >
              <ListItemText
                primary={item.label}
                sx={{
                  textTransform: "uppercase",
                  color: "#000",
                  textDecoration: " none",
                }}
              />
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  const actions = [
    {
      icon: <PersonIcon onClick={() => history.push("/profile")} />,
      name: "ProFile",
    },
    {
      icon: <FormatListBulletedIcon onClick={() => history.push("/order")} />,
      name: "Orders",
    },
    {
      icon: <LogoutIcon onClick={handleLogout} />,
      name: "Logout",
    },
  ];
  if (users?.role === "admin") {
    actions.unshift({
      icon: <DashboardIcon onClick={() => history.push("/admin/dashboard")} />,
      name: "Dashboard",
    });
  }

  return (
    <Box sx={{ position: "relative" }}>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
              display: { xl: "none", lg: "none", md: "none", xs: "flex" },
            }}
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          {["left"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Drawer
                anchor={anchor}
                open={menuMobile[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: { xl: "left", lg: "left", md: "left", xs: "center" },
              display: { xl: "block", lg: "block", md: "block", xs: "none" },
            }}
          >
            <NavLink to="/">
              <img
                src={logo}
                alt="logo"
                style={{ width: "150px", display: "block" }}
              />
            </NavLink>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <div className="menu">
              {menu.map((item, index) => (
                <NavLink to={item.to} exact key={index}>
                  {item.icon} {item.label}
                </NavLink>
              ))}
            </div>
          </Box>
          <Link to="/cart">
            <Badge
              color="secondary"
              badgeContent={cartItems.length}
              sx={{
                position: "absolute",
                top: { md: "22px", xs: "18px" },
                right: 320,
              }}
            >
              <ShoppingCartIcon sx={{ color: "#fff" }} />
            </Badge>
          </Link>
          <SearchForm />
          {isAuthenticated ? (
            <>
              <Backdrop open={open} />
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{
                  marginLeft: "10px",
                  position: "absolute",
                  top: { md: "10px", xs: "8px" },
                  right: 16,
                }}
                icon={
                  <img
                    className="img-res"
                    src={users?.avatar?.url}
                    alt="profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                }
                direction="down"
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
              >
                {actions?.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={handleClose}
                  />
                ))}
              </SpeedDial>
            </>
          ) : (
            <Box
              sx={{
                position: "absolute",
                top: { md: "25px", xs: "20px" },
                right: 20,
              }}
            >
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                }}
              >
                Login
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
