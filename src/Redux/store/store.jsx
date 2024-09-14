import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";

export const store = configureStore({
  reducer: {
    authSlice: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
