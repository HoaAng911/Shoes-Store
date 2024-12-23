import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from "../../../store/slice/authSlice";
import "./Style/Auth.css";
function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
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
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(registerStart(formData));
    try {
      const response = await fakeRegisterApi(formData);
      dispatch(registerSuccess({ email: response.email, name: response.name }));
      alert("Đăng ký thành công! Hãy đăng nhập để tiếp tục.");
    } catch (err) {
      dispatch(registerFailure(err.message));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fakeRegisterApi = (data) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find((user) => user.email === data.email);

        if (existingUser) {
          reject(new Error("Email đã được sử dụng."));
        } else {
          const newUser = {
            email: data.email,
            password: data.password,
            name: data.name,
          };
          users.push(newUser);
          localStorage.setItem("users", JSON.stringify(users));
          resolve(newUser);
        }
      }, 1000);
    });

  return (
    <div className="auth-container">
      <h1>Đăng ký</h1>
      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Họ tên:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={validationErrors.email ? "input-error" : ""}
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
            className={validationErrors.password ? "input-error" : ""}
          />
          {validationErrors.password && (
            <span className="error-message">{validationErrors.password}</span>
          )}
        </div>
        <div className="form-group">
          <label>Xác nhận mật khẩu:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={validationErrors.confirmPassword ? "input-error" : ""}
          />
          {validationErrors.confirmPassword && (
            <span className="error-message">
              {validationErrors.confirmPassword}
            </span>
          )}
        </div>
        <button type="submit" className="auth-submit-btn">
          Đăng ký
        </button>
      </form>
    </div>
  );
}

export default Signup;
