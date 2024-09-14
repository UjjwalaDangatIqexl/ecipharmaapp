import { matchIsValidTel } from "mui-tel-input";
import * as Yup from "yup";
// import dayjs from "dayjs";

export const signupFormValidation = [
  Yup.object().shape({
    customer_name: Yup.string()
      .trim()
      .required("Customer name is a required field"),
    first_name: Yup.string().trim().required("First name is a required field"),
    last_name: Yup.string().trim().required("Last name is a required field"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is a required field"),
    mobile_number: Yup.string()
      .test("valid-mobile", "Invalid mobile number", (value) =>
        matchIsValidTel(value)
      )
      .required("Mobile number is a required field"),
    agreement: Yup.boolean()
      .oneOf(
        [true],
        "You must accept the terms and conditions to register an account"
      )
      .required(),
  }),

  Yup.object().shape({
    otp: Yup.string().required("OTP is required").min(6, "OTP is required"),
  }),

  Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: Yup.string()
      .required("Please Confirm your Password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  }),
];

export const profileFormValidation = Yup.object().shape({
  customerName: Yup.string()
    .trim()
    .required("Customer name is a required field"),
  firstName: Yup.string().trim().required("First name is a required field"),
  lastName: Yup.string().trim().required("Last name is a required field"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is a required field"),
  mobileNumber: Yup.string()
    .test("valid-mobile", "Invalid mobile number", (value) =>
      matchIsValidTel(value)
    )
    .required("Mobile number is a required field"),
});
