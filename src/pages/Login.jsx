import { Box, Grid, Typography, Card } from "@mui/material";
import React from "react";
import LoginForm from "../components/ui/forms/login/LoginForm";

const Login = () => {
  return (
    <Grid container alignItems="center" justifyContent={"center"}>
      <Grid
        item
        xs={12}
        display="flex"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          sx={{
            maxWidth: { xs: 400, sm: 500, md: 400, lg: 500 },
          }}
        >
          <Typography variant="h4" mb={4}>
            Sign In
          </Typography>
          <LoginForm />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
