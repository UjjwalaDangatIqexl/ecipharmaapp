import React from "react";
import { AppBar, Box, Toolbar, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../../../assets/logos/ecipharma-high-resolution-logo.png";

const NoAuthNavbar = () => {
  const theme = useTheme();
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          background: theme.palette.common.white,
          color: theme.palette.grey[600],
        }}
      >
        <Box
          my={2}
          component="img"
          sx={{
            height: 30,
          }}
          alt="ECIPharma"
          src={logo}
        />
        <Box
          display={{
            xs: "none",
            sm: "none",
            md: "none",
            lg: "initial",
            xl: "initial",
          }}
        >
          <Typography>
            Already have an account?{" "}
            <Typography
              variant="subtitle1"
              component={Link}
              to="/"
              color={theme.palette.primary.main}
              sx={{
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Sign In
            </Typography>
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NoAuthNavbar;
