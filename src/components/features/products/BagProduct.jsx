import React from "react";
import { useSelector } from "react-redux";
import "../../../Style/ProductPage.css";

const BagProducts = () => {
  const { bags } = useSelector((state) => state.products);

  return (
    <div className="pp-container">
      <h1 className="pp-title">Bags Collection</h1>
      <div className="pp-grid">
        {bags.map((product) => (
          <div key={product.id} className="pp-card">
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

export default BagProducts;
