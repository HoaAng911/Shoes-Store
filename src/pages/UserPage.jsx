import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutStart, logoutSuccess } from "../store/slice/authSlice";
import "../Style/UserPage.css";

function UserPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: user?.email || "",
    name: user?.name || "",
    phone: user?.phone || "",
    gender: user?.gender || "Nam",
    birthDate: user?.birthDate || "2000-01-01",
    province: user?.province || "",
    district: user?.district || "",
    ward: user?.ward || "",
    address: user?.address || "",
    avatar: user?.avatar || "/default-avatar.png",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated === false) {
      alert("Vui lòng đăng nhập để xem trang cá nhân!");
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        name: user.name || "",
        phone: user.phone || "",
        gender: user.gender || "Nam",
        birthDate: user.birthDate || "2000-01-01",
        province: user.province || "",
        district: user.district || "",
        ward: user.ward || "",
        address: user.address || "",
        avatar: user.avatar || "/default-avatar.png",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size / 1024 / 1024; // Convert to MB
      if (fileSize > 1) {
        setError("Dung lượng file quá lớn. Vui lòng chọn file dưới 1MB.");
        return;
      }

      const fileReader = new FileReader();
      fileReader.onload = () => {
        setFormData((prevData) => ({ ...prevData, avatar: fileReader.result }));
        setError(""); // Clear error if valid file
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Kiểm tra số điện thoại
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(formData.phone)) {
      setError("Số điện thoại không hợp lệ!");
      return;
    }

    console.log("Đang lưu thông tin người dùng:", formData);
    alert("Thông tin cá nhân đã được lưu!");
  };

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      dispatch(logoutStart());
      dispatch(logoutSuccess());
      navigate("/");
    }
  };

  return (
    <div className="user-page-container">
      <div className="user-profile-container">
        <h1 className="user-profile-title">Hồ sơ của tôi</h1>

        <div className="user-avatar-container">
          <img src={formData.avatar} alt="User Avatar" />
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {error && (
            <small className="user-avatar-error-message">{error}</small>
          )}
          <small>Dung lượng file tối đa 1 MB, định dạng JPEG, PNG</small>
        </div>

        <div className="user-details-form">
          <div className="form-groupus">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              readOnly
            />
          </div>

          <div className="form-groupus">
            <label>Tên:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-groupus">
            <label>Số Điện Thoại:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-groupus">
            <label>Giới Tính:</label>
            <div className="gender-radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Nam"
                  checked={formData.gender === "Nam"}
                  onChange={handleInputChange}
                />
                Nam
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Nữ"
                  checked={formData.gender === "Nữ"}
                  onChange={handleInputChange}
                />
                Nữ
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Khác"
                  checked={formData.gender === "Khác"}
                  onChange={handleInputChange}
                />
                Khác
              </label>
            </div>
          </div>

          <div className="form-groupus">
            <label>Ngày Sinh:</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="shipping-info-container">
            <h2>Thông tin nhận hàng</h2>
            <div className="form-groupus">
              <label>Tỉnh/Thành Phố:</label>
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-groupus">
              <label>Quận/Huyện:</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-groupus">
              <label>Phường/Xã:</label>
              <input
                type="text"
                name="ward"
                value={formData.ward}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-groupus">
              <label>Địa Chỉ:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="user-action-buttons">
          <button
            className="action-button save-info-button"
            onClick={handleSave}
          >
            Lưu Thông Tin
          </button>

          <button
            className="action-button view-orders-button"
            onClick={() => navigate("/cart")}
          >
            Đơn Hàng Của Tôi
          </button>

          <button
            className="action-button logout-button"
            onClick={handleLogout}
          >
            Đăng Xuất
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
