import { Box, Grid, Typography, useTheme } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword } from "../Redux/actions/auth";
import CustomButton from "../components/common/CustomButton";
import CustomTextField from "../components/common/CustomTextField";
import Loader from "../components/common/Loader";
import { forgotPasswordValidation } from "../validation/forgotPasswordValidation";

const ForgotPassword = () => {
  const isLoading = useSelector((state) => state.authSlice.isLoading);
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const dispatch = useDispatch();

  const formInitialValues = {
    email: "",
  };

  const handleSubmit = (values, actions) => {
    if (activeStep === 0) {
      dispatch(forgotPassword(values.email)).then((e) => {
        if (!e.payload.data.success && e.payload.data.message) {
          toast.error(e.payload.data.message);
        }
        if (e.payload.data.success) {
          setActiveStep(activeStep + 1);
          actions.setTouched({});
          actions.setSubmitting(false);
        }
      });
    }
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
            <Typography variant="h4" mb={1}>
              Forgot Password
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Formik
              initialValues={formInitialValues}
              validationSchema={forgotPasswordValidation}
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
                <Form onSubmit={handleSubmit}>
                  {!activeStep ? (
                    <Grid item xs={12}>
                      <Field
                        component={CustomTextField}
                        label="Email"
                        type="email"
                        fieldName="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={12} sx={{ marginTop: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img src={"success"} />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          <Typography variant="subtitle1" textAlign={"center"}>
                            We've sent password reset instructions to:{" "}
                            {values.email}
                          </Typography>
                          <Typography variant="caption" textAlign={"center"}>
                            If it doesn't arrive soon, please check your spam
                            folder.
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  )}
                  {!activeStep ? (
                    <Grid item xs={12} sx={{ marginTop: 3 }}>
                      <CustomButton type="submit" fullWidth variant="contained">
                        Verify Email
                      </CustomButton>
                    </Grid>
                  ) : null}
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

export default ForgotPassword;
