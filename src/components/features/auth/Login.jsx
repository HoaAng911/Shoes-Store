import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../../store/slice/authSlice";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const validateForm = () => {
    const errors = {};
    if (!formData.email.includes("@")) {
      errors.email = "Email không hợp lệ";
    }
    if (formData.password.length < 8) {
      errors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(loginStart());
    try {
      const response = await fakeAuthApi(formData.email, formData.password);
      dispatch(loginSuccess({ email: formData.email, name: response.name }));
      alert("Đăng nhập thành công!");
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: "" });
  };

  const fakeAuthApi = (email, password) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          resolve({ name: user.name });
        } else {
          reject(new Error("Email hoặc mật khẩu không đúng."));
        }
      }, 1000);
    });

  return (
    <div className="auth-container">
      <h1>Đăng nhập</h1>
      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {validationErrors.email && (
            <span className="error-message">{validationErrors.email}</span>
          )}
        </div>
        <div className="form-group">
          <label>Mật khẩu:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {validationErrors.password && (
            <span className="error-message">{validationErrors.password}</span>
          )}
        </div>
        <button type="submit" className="auth-submit-btn">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default Login;
