import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config/axiosInstance";

export const userLogin = createAsyncThunk(
  "login/signin",
  async (body, { rejectWithValue }) => {
    try {
      const data1 = await axiosInstance.post(`signin`, body);
      return data1.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const userSignUp = createAsyncThunk(
  "userSignUp/signup",
  async (body, { rejectWithValue }) => {
    try {
      const data1 = await axiosInstance.post(`signup`, body);
      return data1;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
export const resendOtp = createAsyncThunk(
  "resendOtp/auth/sendOtp",
  async (body, { rejectWithValue }) => {
    try {
      const data1 = await axiosInstance.post(`/auth/sendOtp`, body);
      return data1;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const otpVerification = createAsyncThunk(
  "otpVerification/verify_otp",
  async (body, { rejectWithValue }) => {
    try {
      const data1 = await axiosInstance.post(`verify_otp`, body);
      return data1;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const createPassword = createAsyncThunk(
  "createPassword/set_password",
  async (body, { rejectWithValue }) => {
    try {
      const data1 = await axiosInstance.post(`set_password`, body);
      return data1;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "forgotPassword/auth/forgotPassword",
  async (id, { rejectWithValue }) => {
    try {
      const data1 = await axiosInstance.post(`auth/forgotPassword?email=${id}`);
      return data1;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "/auth/updatePassword",
  async (body, { rejectWithValue }) => {
    try {
      const data1 = await axiosInstance.post("/auth/updatePassword", body);
      return data1?.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "updateUserInfo",
  async (userInfo, { rejectWithValue }) => {
    try {
      return userInfo;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
