import * as Yup from "yup";

export const forgotPasswordValidation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is a required field"),
});
