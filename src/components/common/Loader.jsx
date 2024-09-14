import { Backdrop, CircularProgress, alpha } from "@mui/material";
import React from "react";

const Loader = ({ isLoading }) => {
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isLoading}
    >
      <CircularProgress />
    </Backdrop>
  );
};

export default Loader;
