import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  List,
  ListItemButton,
  ListItem,
  ListItemText,
  Drawer,
} from "@mui/material";
import logo from "../../../src/assets/logos/ecipharma-high-resolution-logo.png";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import { clearToken, hasToken } from "../../utils/auth";
import CustomButton from "../common/CustomButton";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const customerUUID = localStorage.getItem("customerUUID");
  const isLoggedIn = hasToken();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    handleClose();
    if (action === "logout") {
      clearToken();
    }

    if (action === "profile") {
      navigate("/home/profile/profileinfo");
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box
        onClick={() => navigate("/home")}
        py={1}
        component="img"
        sx={{
          bgcolor: "white",
          p: 1,
          borderRadius: 2,
          height: 45,
          width: 140,
          cursor: "pointer",
        }}
        alt="VIA Pharma"
        src={logo}
      />
      <Divider />
      <List>
        <ListItem
          disablePadding
          onClick={() => navigate("/home/orders")}
          sx={{ display: isLoggedIn ? "block" : "none" }}
        >
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary={"Orders"} />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          onClick={() => navigate("/")}
          sx={{ display: isLoggedIn ? "none" : "block" }}
        >
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary={"Sign In"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar position="static" elevation={0}>
        <Toolbar
          sx={{
            p: 1,
            display: "flex",
            justifyContent: "space-between",
            gap: { xs: 1, sm: 2, md: 5 },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            onClick={() => navigate("/home")}
            py={1}
            component="img"
            sx={{
              display: { xs: "none", sm: "block" },
              bgcolor: "white",
              borderRadius: 2,
              height: 45,
              width: 140,
              cursor: "pointer",
              p: 1,
            }}
            alt="VIA Pharma"
            src={logo}
          />

          <CustomButton
            size="medium"
            variant="text"
            sx={{ color: "white" }}
            onClick={() => navigate("/")}
          >
            Sign in
          </CustomButton>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default Navbar;
