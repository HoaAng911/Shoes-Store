import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/slice/authSlice";
import "../auth/Style/UserPage.css";

function UserPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Kiểm tra đăng nhập
  if (!isAuthenticated) {
    alert("Vui lòng đăng nhập để xem trang cá nhân!");
    return navigate("/auth");
  }

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <div className="user-page">
      <div className="user-container">
        <h1 className="user-title">Trang Cá Nhân</h1>

        <div className="user-info">
          <div className="info-group">
            <label>Email:</label>
            <p>{user?.email}</p>
          </div>

          <div className="info-group">
            <label>Tên:</label>
            <p>{user?.name}</p>
          </div>
        </div>

        <div className="user-actions">
          <button
            className="action-button orders-button"
            onClick={() => navigate("/orders")}
          >
            Đơn hàng của tôi
          </button>

          <button
            className="action-button profile-button"
            onClick={() => navigate("/profile/edit")}
          >
            Chỉnh sửa thông tin
          </button>

          <button
            className="action-button logout-button"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
