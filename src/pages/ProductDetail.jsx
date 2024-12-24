import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "../Style/ProductDetail.css";
import { addToCart } from "../store/slice/cartSlice";

function ProductDetail() {
  const dispatch = useDispatch();
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  if (!selectedProduct) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Vui lòng chọn kích thước và màu sắc");
      return;
    }

    const cartItem = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    };

    dispatch(addToCart(cartItem));
    alert(`Đã thêm ${quantity} ${selectedProduct.name} vào giỏ hàng!`);
  };

  return (
    <div className="pd-wrapper">
      <div className="pd-container">
        {/* Left side - Product Image */}
        <div className="pd-image-section">
          <div className="pd-main-image">
            <img src={selectedProduct.image} alt={selectedProduct.name} />
          </div>
        </div>

        {/* Right side - Product Info */}
        <div className="pd-info-section">
          <div className="pd-header">
            <h1 className="pd-title">{selectedProduct.name}</h1>
            <p className="pd-brand">{selectedProduct.brand}</p>
            <div className="pd-rating">
              <span className="pd-rating-score">
                ★ {selectedProduct.rating.score}
              </span>
              <span className="pd-review-count">
                ({selectedProduct.rating.reviews.length} đánh giá)
              </span>
            </div>
            <div className="pd-price">${selectedProduct.price}</div>
          </div>

          <div className="pd-options">
            {/* Size Selection */}
            <div className="pd-size">
              <h3 className="pd-section-title">Chọn Kích Thước</h3>
              <div className="pd-size-grid">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    className={`pd-size-btn ${
                      selectedSize === size ? "pd-selected" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="pd-color">
              <h3 className="pd-section-title">Chọn Màu Sắc</h3>
              <div className="pd-color-grid">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    className={`pd-color-btn ${
                      selectedColor === color ? "pd-selected" : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="pd-quantity">
              <h3 className="pd-section-title">Số Lượng</h3>
              <div className="pd-quantity-control">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="pd-qty-btn"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  min="1"
                  max={selectedProduct.stock}
                  className="pd-qty-input"
                />
                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.min(selectedProduct.stock, prev + 1)
                    )
                  }
                  className="pd-qty-btn"
                >
                  +
                </button>
              </div>
              <p className="pd-stock">Còn {selectedProduct.stock} sản phẩm</p>
            </div>

            <button className="pd-add-cart" onClick={handleAddToCart}>
              Thêm Vào Giỏ Hàng
            </button>
          </div>

          <div className="pd-description">
            <h3 className="pd-section-title">Chi Tiết Sản Phẩm</h3>
            <p>{selectedProduct.description}</p>
            <p className="pd-category">Danh mục: {selectedProduct.category}</p>
          </div>

          {/* Reviews Section */}
          <div className="pd-reviews">
            <h3 className="pd-section-title">Đánh Giá Từ Khách Hàng</h3>
            <div className="pd-reviews-list">
              {selectedProduct.rating.reviews.map((review, index) => (
                <div key={index} className="pd-review-item">
                  <div className="pd-review-header">
                    <span className="pd-review-user">{review.username}</span>
                    <span className="pd-review-date">{review.date}</span>
                  </div>
                  <p className="pd-review-text">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
