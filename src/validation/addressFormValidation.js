import * as Yup from "yup";

const addressFormValidation = Yup.object().shape({
  shippingAddress: Yup.object().shape({
    name: Yup.string().required("First name is required"),
    addressLine1: Yup.string().required("Address line 1 is required"),
    addressLine2: Yup.string(),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip: Yup.string().required("ZIP code is required"),
  }),
  billingAddress: Yup.object().when("sameAsShipping", {
    is: false,
    then: () =>
      Yup.object().shape({
        name: Yup.string().required("First name is required"),
        addressLine1: Yup.string().required("Address line 1 is required"),
        addressLine2: Yup.string(),
        country: Yup.string().required("Country is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        zip: Yup.string().required("ZIP code is required"),
      }),
    otherwise: () => Yup.object().strip(),
  }),
});

export default addressFormValidation;
