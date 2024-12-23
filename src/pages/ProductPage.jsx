import React from "react";
import { useSelector } from "react-redux";
import "../Style/ProductPage.css";

const ProductPage = () => {
  const { shoesMan, shoesWoman, bags } = useSelector((state) => state.products);

  return (
    <div className="pp-container">
      <h1 className="pp-title">Our Products</h1>

      {/* Shoes Man Section */}
      <section className="pp-section">
        <h2 className="pp-section-title">Men's Shoes</h2>
        <div className="pp-grid">
          {shoesMan.map((product) => (
            <div key={product.id} className="pp-card">
              <img
                src={product.image}
                alt={product.name}
                className="pp-image"
              />
              <div className="pp-info">
                <p className="pp-brand">{product.brand}</p>
                <h3 className="pp-name">{product.name}</h3>
                <p className="pp-price">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shoes Woman Section */}
      <section className="pp-section">
        <h2 className="pp-section-title">Women's Shoes</h2>
        <div className="pp-grid">
          {shoesWoman.map((product) => (
            <div key={product.id} className="pp-card">
              <img
                src={product.image}
                alt={product.name}
                className="pp-image"
              />
              <div className="pp-info">
                <p className="pp-brand">{product.brand}</p>
                <h3 className="pp-name">{product.name}</h3>
                <p className="pp-price">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bags Section */}
      <section className="pp-section">
        <h2 className="pp-section-title">Bags</h2>
        <div className="pp-grid">
          {bags.map((product) => (
            <div key={product.id} className="pp-card">
              <img
                src={product.image}
                alt={product.name}
                className="pp-image"
              />
              <div className="pp-info">
                <p className="pp-brand">{product.brand}</p>
                <h3 className="pp-name">{product.name}</h3>
                <p className="pp-price">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
