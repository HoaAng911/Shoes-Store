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

  if (!payload?.email) errors.email = "Email là bắt buộc";
  else if (!emailRegex.test(payload.email))
    errors.email = "Định dạng email không hợp lệ";

  if (!payload?.password) errors.password = "Mật khẩu là bắt buộc";
  else if (payload.password.length < 6)
    errors.password = "Mật khẩu phải có ít nhất 6 ký tự";

  return errors;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null; // Đặt lại lỗi
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Thông tin đăng nhập không hợp lệ";
      state.isAuthenticated = false;
    },
    registerStart: (state, action) => {
      const errors = validateRegistration(action.payload);
      if (Object.keys(errors).length > 0) {
        state.error = errors; // Lưu lỗi cụ thể
        state.loading = false;
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
      state.error = action.payload || "Đăng ký không thành công";
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
      state.error = action.payload || "Đăng xuất không thành công";
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
