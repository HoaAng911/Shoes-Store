import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/slice/cartSlice";
import "../Style/CartPage.css";
import { Navigate, useNavigate } from "react-router-dom";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { items, total } = useSelector((state) => state.cart);

  if (!isAuthenticated) {
    alert("Vui lòng đăng nhập để xem giỏ hàng của bạn!");
    return <Navigate to="/auth" replace />;
  }

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Giỏ hàng</h1>

      {items.length === 0 ? (
        <p className="cart-empty">Giỏ hàng của bạn đang trống</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="item-image"
                  />
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price">
                      {item.price.toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="remove-button"
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <button onClick={handleClearCart} className="clear-button">
              Xóa tất cả
            </button>

            <div className="cart-total">
              <p className="total-text">
                Tổng cộng: {total.toLocaleString("vi-VN")}đ
              </p>
              <button className="checkout-button">Thanh toán</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
