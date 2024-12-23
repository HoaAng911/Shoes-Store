import React from "react";
import "../../Style/ProductCard.css";
import RatingStars from "../../common/RatingStars";

const ProductCard = ({ product }) => {
  const { name, price, image, category, rating } = product;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={name} loading="lazy" />
      </div>
      <div className="product-info">
        <p className="category">{category}</p>
        <h3 className="product-name">{name}</h3>
        <RatingStars rating={rating} />
        <div className="price">${price.toFixed(2)}</div>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
