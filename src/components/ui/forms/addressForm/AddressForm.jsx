import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  Checkbox,
  FormControlLabel,
  Typography,
  Grid,
  Box,
  Paper,
  useTheme,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import CustomTextField from "../../../common/CustomTextField";
import CustomButton from "../../../common/CustomButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomSelect from "../../../common/CustomSelect";
import {
  getAllPatientAddress,
  savePatientAddress,
} from "../../../../Redux/actions/common";
import { useDispatch, useSelector } from "react-redux";
import addressFormValidation from "../../../../validation/addressFormValidation";
import { saveCatalogueOrder } from "../../../../Redux/actions/catalogue";
import Loader from "../../../common/Loader";

const AddressForm = ({ onClose }) => {
  const isLoading = useSelector((e) => e.commonSlice.isLoading);
  const customerUUID = localStorage.getItem("customerUUID");
  const customerId = localStorage.getItem("customerId");
  const { pathname } = useLocation();
  const cartList = useSelector((e) => e.cartSlice.cartList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const initialValues = {
    shippingAddress: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      country: "",
      city: "",
      state: "",
      zip: "",
    },
    billingAddress: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      country: "",
      city: "",
      state: "",
      zip: "",
    },
    sameAsShipping: false,
  };
  // const states = useSelector((e) => e.commonSlice.states);
  const states = [
    {
      id: 3,
      stateName: "Arizona",
      shortStateName: "AZ",
      operational: true,
    },
    {
      id: 5,
      stateName: "California",
      shortStateName: "CA",
      operational: true,
    },
    {
      id: 6,
      stateName: "Colorado",
      shortStateName: "CO",
      operational: true,
    },
    {
      id: 9,
      stateName: "Florida",
      shortStateName: "FL",
      operational: true,
    },
    {
      id: 10,
      stateName: "Georgia",
      shortStateName: "GA",
      operational: true,
    },
  ];

  const theme = useTheme();

  const getStateList = () => {
    let data = [];
    if (states && states.length) {
      data = states.map((e) => {
        return { value: e?.stateName, label: e?.stateName };
      });
    }
    return data;
  };

  const handleSubmit = (values) => {
    let payload = {};

    if (values.sameAsShipping) {
      payload = {
        customerUUID: customerUUID,
        billingAddress: {
          name: values.shippingAddress.name,
          address1: values.shippingAddress.addressLine1,
          address2: values.shippingAddress.addressLine2,
          city: values.shippingAddress.city,
          state: values.shippingAddress.state,
          postalCode: values.shippingAddress.zip,
          country: values.shippingAddress.country,
        },
        shippingAddress: {
          name: values.shippingAddress.name,
          address1: values.shippingAddress.addressLine1,
          address2: values.shippingAddress.addressLine2,
          city: values.shippingAddress.city,
          state: values.shippingAddress.state,
          postalCode: values.shippingAddress.zip,
          country: values.shippingAddress.country,
        },
      };
    } else {
      payload = {
        customerUUID: customerUUID,
        billingAddress: {
          name: values.billingAddress.name,
          address1: values.billingAddress.addressLine1,
          address2: values.billingAddress.addressLine2,
          city: values.billingAddress.city,
          state: values.billingAddress.state,
          postalCode: values.billingAddress.zip,
          country: values.billingAddress.country,
        },
        shippingAddress: {
          name: values.shippingAddress.name,
          address1: values.shippingAddress.addressLine1,
          address2: values.shippingAddress.addressLine2,
          city: values.shippingAddress.city,
          state: values.shippingAddress.state,
          postalCode: values.shippingAddress.zip,
          country: values.shippingAddress.country,
        },
      };
    }

    let orderDetails = cartList?.customerCartList?.map((e) => {
      return {
        quantity: e.customerCart.quantity,
        catalogueId: e.customerCart.catalogueId,
        catalogueDetailId: e.customerCart?.catalogueDetailId,
      };
    });

    dispatch(savePatientAddress(payload)).then((e) => {
      if (
        e?.payload?.status?.success &&
        e?.payload?.status?.message &&
        e?.payload?.customerOrderAddress &&
        e?.payload?.customerOrderAddress?.billingAddressId &&
        e?.payload?.customerOrderAddress?.shippingAddressId
      ) {
        onClose();

        if (pathname === "/home/profile/address") {
          dispatch(getAllPatientAddress(customerId));
        } else {
          let orderPayload = {
            billingAddressId:
              e?.payload?.customerOrderAddress?.billingAddressId,
            shippingAddressId:
              e?.payload?.customerOrderAddress?.shippingAddressId,
            orderDetails: orderDetails,
          };

          dispatch(saveCatalogueOrder(orderPayload)).then((e) => {
            if (e?.payload?.order.id) {
              navigate(`/home/orderDetails/${e?.payload?.order.id}`);
            }
          });
        }
      }
    });
  };

  return (
    <Box
      sx={{
        padding: theme.spacing(2),
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={addressFormValidation}
      >
        {({ values, handleChange, errors, handleBlur, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Paper sx={{ p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Typography variant={"h5"}>Shipping Address</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Field
                        component={CustomTextField}
                        label="Name"
                        fieldName="shippingAddress.name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.shippingAddress.name}
                        error={Boolean(
                          touched?.shippingAddress?.name &&
                            errors?.shippingAddress?.name
                        )}
                        helperText={
                          touched?.shippingAddress?.name &&
                          errors?.shippingAddress?.name
                        }
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                      <Field
                        component={CustomTextField}
                        label="Last Name"
                        fieldName="shippingAddress.lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.shippingAddress.lastName}
                        error={Boolean(
                          touched?.shippingAddress?.lastName &&
                            errors?.shippingAddress?.lastName
                        )}
                        helperText={
                          touched?.shippingAddress?.lastName &&
                          errors?.shippingAddress?.lastName
                        }
                      />
                    </Grid> */}
                    <Grid item xs={12} sm={12}>
                      <Field
                        component={CustomTextField}
                        label="Flat, House no., Building, Company, Apartment"
                        fieldName="shippingAddress.addressLine1"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.shippingAddress.addressLine1}
                        error={Boolean(
                          touched?.shippingAddress?.addressLine1 &&
                            errors?.shippingAddress?.addressLine1
                        )}
                        helperText={
                          touched?.shippingAddress?.addressLine1 &&
                          errors?.shippingAddress?.addressLine1
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Field
                        component={CustomTextField}
                        label="Area, Street, Sector, Village"
                        fieldName="shippingAddress.addressLine2"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.shippingAddress.addressLine2}
                        error={Boolean(
                          touched?.shippingAddress?.addressLine2 &&
                            errors?.shippingAddress?.addressLine2
                        )}
                        helperText={
                          touched?.shippingAddress?.addressLine2 &&
                          errors?.shippingAddress?.addressLine2
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field name="shippingAddress.country">
                        {({ field, meta }) => (
                          <CustomSelect
                            size={"medium"}
                            label="Select Country"
                            fieldName="shippingAddress.country"
                            value={field.value}
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                            error={Boolean(meta?.touched && meta?.error)}
                            helperText={meta?.touched && meta?.error}
                            options={[
                              {
                                value: "US",
                                label: "United States",
                              },
                              { value: "SA", label: "Saudi Arabia" },
                            ]}
                          />
                        )}
                      </Field>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Field name="shippingAddress.state">
                        {({ field, meta }) => (
                          <CustomSelect
                            label="Select State"
                            fieldName="shippingAddress.state"
                            value={field.value}
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                            error={Boolean(meta?.touched && meta?.error)}
                            helperText={meta?.touched && meta?.error}
                            options={getStateList()}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={CustomTextField}
                        label="Town/City"
                        fieldName="shippingAddress.city"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.shippingAddress.city}
                        error={Boolean(
                          touched?.shippingAddress?.city &&
                            errors?.shippingAddress?.city
                        )}
                        helperText={
                          touched?.shippingAddress?.city &&
                          errors?.shippingAddress?.city
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={CustomTextField}
                        label="ZIP Code"
                        fieldName="shippingAddress.zip"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.shippingAddress.zip}
                        error={Boolean(
                          touched?.shippingAddress?.zip &&
                            errors?.shippingAddress?.zip
                        )}
                        helperText={
                          touched?.shippingAddress?.zip &&
                          errors?.shippingAddress?.zip
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.sameAsShipping}
                            onChange={handleChange}
                            name="sameAsShipping"
                          />
                        }
                        label="Billing address is the same as shipping address"
                      />
                    </Grid>

                    {!values.sameAsShipping && (
                      <>
                        <Grid item xs={12} sm={12}>
                          <Typography variant={"h5"}>
                            Billing Address
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                          <Field
                            component={CustomTextField}
                            label="Name"
                            fieldName="billingAddress.name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.billingAddress.name}
                            error={Boolean(
                              touched?.billingAddress?.name &&
                                errors?.billingAddress?.name
                            )}
                            helperText={
                              touched?.billingAddress?.name &&
                              errors?.billingAddress?.name
                            }
                          />
                        </Grid>

                        {/* <Grid item xs={12} sm={6}>
                          <Field
                            component={CustomTextField}
                            label="Last Name"
                            fieldName="billingAddress.lastName"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.billingAddress.lastName}
                            error={Boolean(
                              touched?.billingAddress?.lastName &&
                                errors?.billingAddress?.lastName
                            )}
                            helperText={
                              touched?.billingAddress?.lastName &&
                              errors?.billingAddress?.lastName
                            }
                          />
                        </Grid> */}

                        <Grid item xs={12} sm={12}>
                          <Field
                            component={CustomTextField}
                            label="Flat, House no., Building, Company, Apartment"
                            fieldName="billingAddress.addressLine1"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.billingAddress.addressLine1}
                            error={Boolean(
                              touched?.billingAddress?.addressLine1 &&
                                errors?.billingAddress?.addressLine1
                            )}
                            helperText={
                              touched?.billingAddress?.addressLine1 &&
                              errors?.billingAddress?.addressLine1
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Field
                            component={CustomTextField}
                            label="Area, Street, Sector, Village"
                            fieldName="billingAddress.addressLine2"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.billingAddress.addressLine2}
                            error={Boolean(
                              touched?.billingAddress?.addressLine2 &&
                                errors?.billingAddress?.addressLine2
                            )}
                            helperText={
                              touched?.billingAddress?.addressLine2 &&
                              errors?.billingAddress?.addressLine2
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field name="billingAddress.country">
                            {({ field, meta }) => (
                              <CustomSelect
                                label="Select Country"
                                fieldName="billingAddress.country"
                                value={field.value}
                                onBlur={field.onBlur}
                                onChange={field.onChange}
                                error={Boolean(meta?.touched && meta?.error)}
                                helperText={meta?.touched && meta?.error}
                                options={[
                                  {
                                    value: "United States",
                                    label: "United States",
                                  },
                                  {
                                    value: "Saudi Arabia",
                                    label: "Saudi Arabia",
                                  },
                                ]}
                              />
                            )}
                          </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Field name="billingAddress.state">
                            {({ field, meta }) => (
                              <CustomSelect
                                label="Select State"
                                fieldName="billingAddress.state"
                                value={field.value}
                                onBlur={field.onBlur}
                                onChange={field.onChange}
                                error={Boolean(meta?.touched && meta?.error)}
                                helperText={meta?.touched && meta?.error}
                                options={getStateList()}
                              />
                            )}
                          </Field>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            component={CustomTextField}
                            label="Town/City"
                            fieldName="billingAddress.city"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.billingAddress.city}
                            error={Boolean(
                              touched?.billingAddress?.city &&
                                errors?.billingAddress?.city
                            )}
                            helperText={
                              touched?.billingAddress?.city &&
                              errors?.billingAddress?.city
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Field
                            component={CustomTextField}
                            label="ZIP Code"
                            fieldName="billingAddress.zip"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.billingAddress.zip}
                            error={Boolean(
                              touched?.billingAddress?.zip &&
                                errors?.billingAddress?.zip
                            )}
                            helperText={
                              touched?.billingAddress?.zip &&
                              errors?.billingAddress?.zip
                            }
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Box mt={2} display="flex" justifyContent="flex-end" gap={4}>
              <CustomButton
                variant="outlined"
                color="secondary"
                onClick={() => onClose()}
              >
                Cancel
              </CustomButton>
              <CustomButton variant="contained" color="primary" type="submit">
                Proceed
              </CustomButton>
            </Box>
          </Form>
        )}
      </Formik>
      <Loader isLoading={isLoading} />
    </Box>
  );
};

export default AddressForm;
