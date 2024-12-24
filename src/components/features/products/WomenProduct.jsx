import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedProduct } from "../../../store/slice/productSlice";
import "../../../Style/ProductPage.css";

const WomenProducts = () => {
  const { shoesWoman } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProductClick = (product) => {
    dispatch(setSelectedProduct(product));
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="pp-container">
      <h1 className="pp-title">Women's Shoes</h1>
      <div className="pp-grid">
        {shoesWoman.map((product) => (
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
              <p className="pp-price">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WomenProducts;
