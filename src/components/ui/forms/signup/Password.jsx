import React from "react";
import {
  Box,
  useTheme,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Field } from "formik";
import CustomTextField from "../../../common/CustomTextField";

const Password = ({ errors, handleBlur, handleChange, touched, values }) => {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Field
          type={"password"}
          component={CustomTextField}
          label="Enter Password"
          fieldName="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          error={Boolean(touched.password && errors.password)}
          helperText={touched.password && errors.password}
        />
      </Grid>

      <Grid item xs={12}>
        <Field
          type={"password"}
          component={CustomTextField}
          label="Re-enter password"
          fieldName="confirmPassword"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.confirmPassword}
          error={Boolean(touched.confirmPassword && errors.confirmPassword)}
          helperText={touched.confirmPassword && errors.confirmPassword}
        />
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ color: theme.palette.primary.light }}>
          <List sx={{ listStyleType: "disc", pl: 2 }}>
            <ListItem disablePadding sx={{ display: "list-item" }}>
              <ListItemText primary="Password should be more than 8 characters." />
            </ListItem>
            <ListItem disablePadding sx={{ display: "list-item" }}>
              <ListItemText primary="Password should contain at least one uppercase letter." />
            </ListItem>
            <ListItem disablePadding sx={{ display: "list-item" }}>
              <ListItemText primary="Password should contain at least one special character." />
            </ListItem>
          </List>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Password;
