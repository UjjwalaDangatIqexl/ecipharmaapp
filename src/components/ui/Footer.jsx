import React from "react";
import { Typography, Grid, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          textAlign={"center"}
          variant="subtitle2"
          color={theme.palette.grey[600]}
          padding={1}
        >
          Copyright © 2024 Via Health, Inc. All rights reserved. U.S. patents
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
