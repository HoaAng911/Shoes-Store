import React from "react";
import "../Style/RaitingStar.css";

const RatingStars = ({ rating }) => {
  // Lấy phần nguyên và phần thập phân của rating
  const fullStars = Math.floor(rating.score);
  const hasHalfStar = rating.score % 1 >= 0.5;

  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => {
        // Thêm các lớp filled, half-filled hoặc empty dựa trên rating
        if (index < fullStars) {
          return (
            <span key={index} className="star filled">
              ★
            </span>
          );
        } else if (index === fullStars && hasHalfStar) {
          return (
            <span key={index} className="star half-filled">
              ★
            </span>
          );
        } else {
          return (
            <span key={index} className="star">
              ★
            </span>
          );
        }
      })}
      <span className="rating-number">({rating.score})</span>
    </div>
  );
};

export default RatingStars;
