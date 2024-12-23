import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const validateRegistration = (payload) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!payload?.email) errors.email = "Email is required";
  else if (!emailRegex.test(payload.email))
    errors.email = "Invalid email format";

  if (!payload?.password) errors.password = "Password is required";
  else if (payload.password.length < 6)
    errors.password = "Password must be at least 6 characters";

  return errors;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null; // Reset error
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Invalid credentials";
      state.isAuthenticated = false;
    },
    registerStart: (state, action) => {
      const errors = validateRegistration(action.payload);
      if (Object.keys(errors).length > 0) {
        state.error = errors;
        return;
      }

      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Registration failed";
    },
    logoutStart: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Logout failed";
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;
export default authSlice.reducer;
