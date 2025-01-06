import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedProduct } from "../../../store/slice/productSlice";
import { addToCart } from "../../../store/slice/cartSlice";
import "../../../Style/ProductPage.css";
import RatingStars from "../../common/RatingStars";

const BagProducts = () => {
  const { bags } = useSelector((state) => state.products);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProductClick = (product) => {
    dispatch(setSelectedProduct(product));
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // Prevent triggering the product click event.

    if (!isAuthenticated) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      navigate("/auth");
      return;
    }

    dispatch(addToCart(product));
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  return (
    <div className="pp-container">
      <h1 className="pp-title">Bags Collection</h1>
      <div className="pp-grid">
        {bags.map((product) => (
          <div
            key={product.id}
            className="pp-card"
            onClick={() => handleProductClick(product)}
            style={{ cursor: "pointer" }}
          >
            <img src={product.image} alt={product.name} className="pp-image" />
            <div className="pp-info">
              <p className="pp-brand">{product.brand}</p>
              <h3 className="pp-name">{product.name}</h3>
              <RatingStars rating={product.rating} />
              <p className="pp-price">${product.price.toFixed(2)}</p>

              <button
                className="pp-add-to-cart"
                onClick={(e) => handleAddToCart(product, e)}
              >
                Thêm vào giỏ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BagProducts;
