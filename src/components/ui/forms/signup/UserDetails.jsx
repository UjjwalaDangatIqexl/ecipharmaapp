import React from "react";
import {
  Grid,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  FormControlLabel,
  FormControl,
  InputLabel,
  Link,
  Typography,
  FormHelperText,
  useTheme,
} from "@mui/material";
import { Field } from "formik";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomTextField from "../../../common/CustomTextField";
import CustomSelect from "../../../common/CustomSelect";
import { MuiTelInput } from "mui-tel-input";

const gender = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "others", label: "Others" },
];

const UserDetails = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
  setFieldValue,
}) => {
  const theme = useTheme();

  const handleMobileNumberChange = (value) => {
    setFieldValue("mobile_number", value);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <Field
          component={CustomTextField}
          label="Customer name"
          fieldName="customer_name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.customer_name}
          error={Boolean(touched.customer_name && errors.customer_name)}
          helperText={touched.customer_name && errors.customer_name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Field
          component={CustomTextField}
          label="First name"
          fieldName="first_name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.first_name}
          error={Boolean(touched.first_name && errors.first_name)}
          helperText={touched.first_name && errors.first_name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Field
          component={CustomTextField}
          label="Last name"
          fieldName="last_name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.last_name}
          error={Boolean(touched.last_name && errors.last_name)}
          helperText={touched.last_name && errors.last_name}
        />
      </Grid>

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
      <Grid item xs={12}>
        <Field name="mobile_number">
          {({ field }) => (
            <MuiTelInput
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "grey.400",
                  },
                },
              }}
              fullWidth
              defaultCountry="US"
              label="Mobile Number"
              value={field.value}
              onChange={handleMobileNumberChange}
              onBlur={field.onBlur}
              error={Boolean(touched.mobile_number && errors.mobile_number)}
              helperText={touched.mobile_number && errors.mobile_number}
            />
          )}
        </Field>
      </Grid>
      <Grid item xs={12}>
        <Field name="agreement">
          {({ field, meta }) => (
            <>
              <FormControlLabel
                sx={{
                  alignItems: "flex-start",
                }}
                checked={field.value}
                control={
                  <Checkbox
                    {...field}
                    onChange={field.onChange}
                    sx={{ marginRight: 1 }}
                  />
                }
                label={
                  <Typography variant="caption">
                    By checking the box, you agree that VIA may use your
                    responses to personalize your experience and other purposes
                    as described in our{" "}
                    <Link
                      href="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      privacy policy{" "}
                    </Link>
                    . Responses prior to account creation will not be used as
                    part of your medical assessment.
                  </Typography>
                }
              />

              {meta.touched && meta.error ? (
                <FormHelperText
                  sx={{
                    color: theme.palette.error.main,
                    marginLeft: "2.8rem",
                  }}
                >
                  {meta.touched && meta.error}
                </FormHelperText>
              ) : null}
            </>
          )}
        </Field>
      </Grid>
    </Grid>
  );
};

export default UserDetails;
