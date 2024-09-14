import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Password from "../../src/components/ui/forms/signup/Password";
import UserDetails from "../../src/components/ui/forms/signup/UserDetails";
import {
  userSignUp,
  createPassword,
  otpVerification,
} from "../Redux/actions/auth";
import CustomButton from "../components/common/CustomButton";
import Loader from "../components/common/Loader";
import Otp from "../components/ui/forms/signup/Otp";
import { signupFormValidation } from "../validation/signupFormValidation";

const steps = ["Basic Details", "Verification", "Create Password"];

const formInitialValues = {
  customer_name: "",
  first_name: "",
  last_name: "",
  email: "",
  mobile_number: "",
  otp: "",
  password: "",
  confirmPassword: "",
  agreement: false,
};

const Signup = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((e) => e.authSlice.isLoading);
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;
  const currentValidationSchema = signupFormValidation[activeStep];
  const currentStepTitle = {
    0: "Sign up",
    1: "OTP Verification",
    2: "Create Password",
  };

  const submitForm = (values) => {
    const payload = {
      email: localStorage.getItem("customerEmail"),
      password: values.password,
    };

    dispatch(createPassword(payload)).then((e) => {
      console.log(e, "slbkabk");
      if (
        e?.payload?.data?.status?.message?.success &&
        e?.payload?.data?.status?.message?.message
      ) {
        toast.success(e?.payload?.data?.status?.message?.message);
        navigate("/");
        localStorage.clear();
      }
    });
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      submitForm(values, actions);
    } else if (activeStep === 0) {
      const keysToInclude = [
        "email",
        "first_name",
        "last_name",
        "mobile_number",
        "customer_name",
      ];

      const registerKeys = Object.fromEntries(
        Object.entries(values).filter(([key]) => keysToInclude.includes(key))
      );

      let payload = {
        ...registerKeys,
        first_name:
          registerKeys.first_name.split("")[0].toUpperCase() +
          registerKeys.first_name.slice(1),
        last_name:
          registerKeys.last_name.split("")[0].toUpperCase() +
          registerKeys.last_name.slice(1),
        customer_name:
          registerKeys.customer_name.split("")[0].toUpperCase() +
          registerKeys.customer_name.slice(1),
      };

      dispatch(userSignUp(payload)).then((e) => {
        console.log(e, "slnls");
        if (
          e?.payload?.data?.status?.message?.success &&
          e?.payload?.data?.user?.id &&
          e?.payload?.data?.user?.email
        ) {
          localStorage.setItem("customerId", e?.payload?.data?.user?.id);
          localStorage.setItem("customerEmail", e?.payload?.data?.user?.email);
          setActiveStep(activeStep + 1);
          actions.setTouched({});
          actions.setSubmitting(false);
        }
      });
    } else if (activeStep === 1) {
      const payload = {
        email: values.email,
        otp: values.otp,
      };

      dispatch(otpVerification(payload)).then((e) => {
        console.log(e, "otpotptotp");
        if (e?.payload?.data?.status?.message?.success) {
          setActiveStep(activeStep + 1);
          actions.setTouched({});
          actions.setSubmitting(false);
        }
      });
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const renderStepContent = (
    step,
    errors,
    handleBlur,
    handleChange,
    touched,
    values,
    setFieldValue
  ) => {
    const commonProps = {
      errors,
      handleBlur,
      handleChange,
      touched,
      values,
      setFieldValue,
    };

    switch (step) {
      case 0:
        return <UserDetails {...commonProps} />;
      // return <Otp {...commonProps} />;
      // return <Password {...commonProps} />;
      case 1:
        return <Otp {...commonProps} />;
      case 2:
        return <Password {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        display="flex"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          sx={{
            maxWidth: { xs: 400, sm: 500, md: 400, lg: 480 },
          }}
        >
          <Stack>
            <Typography variant="h5" mb={4}>
              {currentStepTitle[activeStep]}
            </Typography>
          </Stack>

          <Grid
            item
            xs={12}
            display={isSmallScreen ? "flex" : "initial"}
            justifyContent={isSmallScreen ? "center" : "initial"}
          >
            <Stepper
              activeStep={activeStep}
              sx={{
                mb: 4,
              }}
              orientation={isSmallScreen ? "vertical" : "horizontal"}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Formik
            initialValues={formInitialValues}
            validationSchema={currentValidationSchema}
            onSubmit={handleSubmit}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                {renderStepContent(
                  activeStep,
                  errors,
                  handleBlur,
                  handleChange,
                  touched,
                  values,
                  setFieldValue
                )}

                <Grid item xs={12}>
                  <Stack
                    justifyContent="center"
                    direction={"row"}
                    spacing={2}
                    mt={3}
                  >
                    {activeStep !== 0 && !isLastStep && (
                      <CustomButton
                        fullWidth
                        variant="outlined"
                        onClick={handleBack}
                        startIcon={<ArrowBackIcon />}
                      >
                        Back
                      </CustomButton>
                    )}
                    <CustomButton
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary"
                      endIcon={!isLastStep && <ArrowForwardIcon />}
                    >
                      {isLastStep ? "Submit" : "Next"}
                    </CustomButton>
                  </Stack>
                </Grid>
                <Grid item xs={12} textAlign={"center"} marginTop={2}>
                  <Typography
                    variant="body1"
                    color={theme.palette.primary.main}
                    sx={{
                      textAlign: "center",
                      textDecoration: "none",
                    }}
                    component={Link}
                    to="/"
                  >
                    Already have an account?{" "}
                    <Typography variant="subtitle1" component={"span"}>
                      Sign In
                    </Typography>
                  </Typography>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </Grid>
      <Loader isLoading={isLoading} />
    </Grid>
  );
};

export default Signup;
