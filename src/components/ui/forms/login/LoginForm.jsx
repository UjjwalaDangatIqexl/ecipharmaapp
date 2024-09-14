import React from "react";
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import { Field, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { userLogin } from "../../../../Redux/actions/auth";
import { loginFormValidation } from "../../../../validation/loginFormValidation";
import CustomTextField from "../../../common/CustomTextField";
import CustomCheckBox from "../../../common/CustomCheckBox";
import CustomButton from "../../../common/CustomButton";
import { toast } from "react-toastify";
import Loader from "../../../common/Loader";
import { saveToken } from "../../../../utils/auth";

const LoginForm = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isLoading = useSelector((e) => e.authSlice.isLoading);
  const [searchParams] = useSearchParams();
  const redirectionValue = searchParams.get("redirectionURL");

  const initialValues = {
    email: "",
    password: "",
    rememberMe: true,
  };

  const handleSubmit = (values) => {
    const { rememberMe, ...rest } = values;

    try {
      dispatch(userLogin(rest)).then((e) => {
        console.log(e, "askbka");
        if (
          !e?.payload?.status?.message?.success &&
          e?.payload?.status?.message
        ) {
          toast.error(e.payload.message);
        }

        if (
          e?.payload?.status?.message?.success
          // e.payload.token &&
          // e.payload.refreshToken &&
          // e.payload.userUUID &&
          // e.payload.customerId
        ) {
          // localStorage.setItem("customerUUID", e.payload.userUUID);
          // localStorage.setItem("customerId", e.payload.customerId);
          // saveToken(e.payload.token, e.payload.refreshToken);

          if (redirectionValue) {
            window.location.href = redirectionValue;
          } else {
            window.location.href = `/home`;
          }
        }
      });
    } catch (err) {
      setStatus({ success: false });
      setErrors({ submit: err.message });
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginFormValidation}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                component={CustomTextField}
                label="Email Address / Username"
                fieldName="email"
                type="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                component={CustomTextField}
                label="Password"
                fieldName="password"
                type={"password"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Grid>

            <Grid item xs={12}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                flexWrap={"wrap"}
                spacing={1}
                marginTop={2}
              >
                <Field name="rememberMe" type="checkbox">
                  {({ field }) => (
                    <CustomCheckBox
                      label="Remember me"
                      checked={values.rememberMe}
                      onChange={handleChange}
                      name={field.name}
                      color="primary"
                    />
                  )}
                </Field>
                <Typography
                  component={Link}
                  to="/forgot-password"
                  color={theme.palette.primary.main}
                  sx={{
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Forgot Password?
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mt: 2 }}>
                <CustomButton
                  disableElevation
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign in
                </CustomButton>
              </Box>
            </Grid>

            <Grid item xs={12} textAlign={"center"}>
              <Typography
                variant="body1"
                color={theme.palette.primary.main}
                sx={{
                  textAlign: "center",
                  textDecoration: "none",
                }}
                component={Link}
                to="/signup"
              >
                Don't have an account?{" "}
                <Typography variant="subtitle1" component={"span"}>
                  Signup
                </Typography>
              </Typography>
            </Grid>
          </Grid>
          <Loader isLoading={isLoading} />
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
