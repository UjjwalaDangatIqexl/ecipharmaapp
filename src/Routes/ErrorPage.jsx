import { Box } from "@mui/material";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { hasToken } from "../utils/auth";

const ErrorPage = () => {
  const location = useLocation();
  const isLoggedIn = hasToken();

  return isLoggedIn ? (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      No page Found
    </Box>
  ) : (
    <Navigate to={`/?redirectionURL=${location.pathname}`} />
  );
};

export default ErrorPage;
