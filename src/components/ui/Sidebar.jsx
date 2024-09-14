import { Badge, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box, useTheme } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import LogoutIcon from "../../assets/logoutIcon.svg?react";
import WebsocketService from "../../pages/Messages/WebsocketService";
import { clearToken } from "../../utils/auth";

const Sidebar = ({ open, onClose, menuItems }) => {
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState(null);
  const dashboardData = useSelector((e) => e.dashboardSlice.dashboardData);
  const { pathname } = useLocation();
  const currentPathArray = pathname
    .split("/")
    .map((e) => e.replace(/[^A-Z0-9]/gi, ""))
    .filter((e) => e);

  const isListItemActive = (item) => {
    const currentPath = item.replace(/[^A-Z0-9]/gi, "").toLowerCase();
    if (item && currentPathArray.includes(currentPath)) {
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setSelectedItem(null);
    clearToken();
    WebsocketService.disconnectSocket();
  };

  return (
    <Drawer
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          width: 280,
          marginTop: 8,
          paddingTop: 2,
        },
      }}
      variant="persistent"
      open={open}
      onClose={onClose}
    >
      <List
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "90%",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              component={Link}
              to={item.path}
              sx={{
                borderRadius: 2,
                color: isListItemActive(item.text)
                  ? theme.palette.primary.main
                  : theme.palette.common.white,
                backgroundColor: isListItemActive(item.text)
                  ? theme.palette.common.white
                  : "transparent",
              }}
              onClick={() => setSelectedItem(item.text)}
            >
              {index === 1 &&
              dashboardData &&
              !dashboardData.healthProfileCompleted ? (
                <Badge color="error" variant="dot">
                  <ListItemIcon
                    sx={{
                      minWidth: "25px",
                      color: isListItemActive(item.text)
                        ? theme.palette.primary.main
                        : theme.palette.common.white,
                      backgroundColor: isListItemActive(item.text)
                        ? theme.palette.common.white
                        : "transparent",
                    }}
                  >
                    {React.cloneElement(item.icon, {
                      fill: isListItemActive(item.text)
                        ? theme.palette.primary.main
                        : theme.palette.common.white,
                    })}
                  </ListItemIcon>
                </Badge>
              ) : (
                <ListItemIcon
                  sx={{
                    minWidth: "25px",
                    color: isListItemActive(item.text)
                      ? theme.palette.primary.main
                      : theme.palette.common.white,
                    backgroundColor: isListItemActive(item.text)
                      ? theme.palette.common.white
                      : "transparent",
                  }}
                >
                  {React.cloneElement(item.icon, {
                    fill: isListItemActive(item.text)
                      ? theme.palette.primary.main
                      : theme.palette.common.white,
                  })}
                </ListItemIcon>
              )}

              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: isListItemActive(item.text) ? "600" : "400",
                      ml: 2,
                    }}
                  >
                    {item.text}
                  </Typography>
                }
                sx={{
                  fontWeight: isListItemActive(item.text) ? "600" : "200",
                }}
              />
            </ListItem>
          ))}
        </Box>

        <ListItem
          onClick={() => handleLogout()}
          sx={{
            cursor: "pointer",
            borderRadius: 0.5,
            color: theme.palette.common.white,
            backgroundColor: "#047AB9",
          }}
        >
          <ListItemIcon
            sx={{
              color: theme.palette.common.white,
            }}
          >
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
