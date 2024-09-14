import React from "react";
import { Box, Typography, useTheme, Paper } from "@mui/material";
import NoAuthNavbar from "./NoAuthNavbar";
import Footer from "../../../ui/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import SignupLayoutImage from "../../../../assets/SignupLayout.png";

const SignupLayout = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: theme.palette.common.white,
      }}
    >
      <NoAuthNavbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: "1",
          backgroundImage: `url(${SignupLayoutImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: 3,
        }}
      >
        <Paper
          elevation={2}
          sx={{
            padding: 3,
            maxWidth: 600,
            width: "100%",
            borderRadius: 2,
            background: theme.palette.common.white,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              mb: 1,
            }}
          >
            <Outlet />
          </Box>
          <Footer />
        </Paper>
      </Box>
    </Box>
  );
};

export default SignupLayout;
