import * as Yup from "yup";

export const confirmPasswordValidation = Yup.object({
  oldPassword: Yup.string().required("Old Password is required."),
  newPassword: Yup.string()
    .required("Password is required.")
    .min(8, "Password should be more than 8 characters.")
    .matches(/[A-Z]/, "Password should contain at least one uppercase letter.")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password should contain at least one special character.",
    ),
  confirmNewPassword: Yup.string()
    .required("Confirm Password is required.")
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match."),
});
