import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import { ErrorMessage, Field } from "formik";
import { MuiOtpInput } from "mui-one-time-password-input";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resendOtp } from "../../../../Redux/actions/auth";
import CustomButton from "../../../common/CustomButton";
import Loader from "../../../common/Loader";

const Otp = ({ values }) => {
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.authSlice.isLoading);

  useEffect(() => {
    let intervalId;
    if (!isActive) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive]);

  useEffect(() => {
    if (seconds === 0) {
      setIsActive(true);
    }
  }, [seconds]);

  const handleResendOTP = () => {
    const payload = {
      email: values.email,
    };

    dispatch(resendOtp(payload)).then((e) => {
      if (e.payload.data.success && e.payload.data.message) {
        toast.success(e.payload.data.message);
        setIsActive(false);
        setSeconds(60);
      }

      if (!e.payload.data.success && e.payload.data.message) {
        toast.error(e.payload.data.message);
      }
    });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography textAlign={"center"} variant="subtitle2" p={3}>
          We have sent you an OTP on your email ID: {values.email}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Field name="otp">
          {({ field, form, meta }) => (
            <>
              <MuiOtpInput
                display="flex"
                gap={3}
                label="Enter OTP"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "grey.400",
                  },
                }}
                TextFieldsProps={{
                  error: meta.touched && Boolean(meta.error),
                }}
                value={field.value}
                onChange={(newValue) =>
                  form.setFieldValue(field.name, newValue)
                }
                onBlur={() => form.setFieldTouched(field.name, true)}
                length={6}
              />
              <ErrorMessage
                sx={{ marginTop: 2 }}
                name="otp"
                component={FormHelperText}
                error
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="subtitle2">
                  {` Didn't receive an OTP? 00: ${
                    seconds.toString().length < 2 ? "0" : ""
                  }${seconds}`}
                </Typography>

                <CustomButton
                  variant="text"
                  disabled={!isActive}
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </CustomButton>
              </Box>
            </>
          )}
        </Field>
      </Grid>
      <Loader isLoading={isLoading} />
    </Grid>
  );
};

export default Otp;
