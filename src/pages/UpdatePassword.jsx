import React from "react";
import { Formik, Field, Form } from "formik";
import { Typography, Grid, useTheme, Box } from "@mui/material";
import { Link } from "react-router-dom";
import CustomTextField from "../components/common/CustomTextFieldNew";
import CustomButton from "../components/common/CustomButton";
import { jwtDecode } from "jwt-decode";
import { confirmPasswordValidation } from "../validation/confirmPasswordValidation";
import { updatePassword } from "../Redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";

const UpdatePassword = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.authSlice.isLoading);
  const queryString = window.location.search;
  const urlSearchParams = new URLSearchParams(queryString);
  const token = urlSearchParams.get("token");
  const email = jwtDecode(token).sub;

  const formInitialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const handleSubmit = (values, actions) => {
    const payload = {
      email: email,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      token: token,
    };

    dispatch(updatePassword(payload)).then((e) => {
      if (!e.payload.status.success && e.payload.status.message) {
        toast.error(e.payload.status.message);
      }

      if (e.payload.status.success && e.payload.status.message) {
        toast.success(e.payload.status.message);
        navigate("/");
      }
    });
  };

  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Box
        sx={{
          maxWidth: { xs: 400, sm: 500, md: 400, lg: 500 },
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              color={theme.palette.primary.main}
              textAlign={"center"}
            >
              Update Password
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Formik
              initialValues={formInitialValues}
              onSubmit={handleSubmit}
              validationSchema={confirmPasswordValidation}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Grid item xs={12} mb={3}>
                    <Field
                      component={CustomTextField}
                      label="Old Password"
                      type="password"
                      fieldName="oldPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values?.oldPassword}
                      error={Boolean(touched.oldPassword && errors.oldPassword)}
                      helperText={touched.oldPassword && errors.oldPassword}
                    />
                  </Grid>
                  <Grid item xs={12} mb={3}>
                    <Field
                      component={CustomTextField}
                      label="New Password"
                      type="password"
                      fieldName="newPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.newPassword}
                      error={Boolean(touched.newPassword && errors.newPassword)}
                      helperText={touched.newPassword && errors.newPassword}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={CustomTextField}
                      label="Confirm New Password"
                      type="password"
                      fieldName="confirmNewPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.confirmNewPassword}
                      error={Boolean(
                        touched.confirmNewPassword && errors.confirmNewPassword,
                      )}
                      helperText={
                        touched.confirmNewPassword && errors.confirmNewPassword
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 3 }}>
                    <CustomButton type="submit" fullWidth variant="contained">
                      Update Password
                    </CustomButton>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
          <Grid item xs={12} textAlign={"center"}>
            <Typography
              color={theme.palette.primary.main}
              sx={{
                textDecoration: "none",
              }}
              component={Link}
              to="/"
            >
              Back to Sign In
            </Typography>
          </Grid>
        </Grid>
        <Loader isLoading={isLoading} />
      </Box>
    </Grid>
  );
};

export default UpdatePassword;
