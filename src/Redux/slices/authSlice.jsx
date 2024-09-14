import { createSlice } from "@reduxjs/toolkit";
import {
  createPassword,
  otpVerification,
  userLogin,
  userSignUp,
} from "../actions/auth";

const initialState = {
  isLoading: false,
  userInfo: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action?.payload) {
          state.userInfo = action?.payload;
        }
      })
      .addCase(userLogin.rejected, (state) => {
        state.isLoading = false;
        state.userInfo = null;
      });

    builder
      .addCase(userSignUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(userSignUp.rejected, (state) => {
        state.isLoading = false;
        state.userInfo = null;
      });

    builder
      .addCase(otpVerification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(otpVerification.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(otpVerification.rejected, (state) => {
        state.isLoading = false;
        state.userInfo = null;
      });

    builder
      .addCase(createPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action?.payload) {
          state.userInfo = action?.payload;
        }
      })
      .addCase(createPassword.rejected, (state) => {
        state.isLoading = false;
        state.userInfo = null;
      });
  },
});

export default authSlice.reducer;
