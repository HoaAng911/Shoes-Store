import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProduct } from "../../../store/slice/productSlice";
import { addToCart } from "../../../store/slice/cartSlice";
import "../../Style/ProductCard.css";
import RatingStars from "../../common/RatingStars";

const ProductCard = ({ product }) => {
  const { id, name, price, image, category, rating } = product;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleCardClick = () => {
    dispatch(setSelectedProduct(product));
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      navigate("/auth");
      return;
    }

    dispatch(addToCart(product));
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  return (
    <div
      className="product-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="product-image">
        <img src={image} alt={name} loading="lazy" />
      </div>
      <div className="product-info">
        <p className="category">{category}</p>
        <h3 className="product-name">{name}</h3>
        <RatingStars rating={rating} />
        <div className="price">${price.toFixed(2)}</div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
