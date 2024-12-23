import React, { useState } from "react";
import ProductCard from "../products/ProductCard";
import "../../Style/ProductList.css";

function ProductList() {
  const [activeCategory, setActiveCategory] = useState("men");

  const products = {
    men: [
      {
        id: 1,
        name: "Nike Air Max 270",
        price: 129.99,
        image:
          "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-shoes-2V5C4p.png",
        category: "Running",
        rating: 4.5,
      },
      {
        id: 2,
        name: "Adidas Ultraboost 21",
        price: 159.99,
        image:
          "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/69cbc73d0cb846889f89acbb011e68cb_9366/Ultraboost_21_Shoes_Black_FY0306_01_standard.jpg",
        category: "Running",
        rating: 4.8,
      },
      {
        id: 3,
        name: "Puma RS-X³",
        price: 110.99,
        image:
          "https://th.bing.com/th/id/R.55dfbe81eb8feb6f20328993754ff6e3?rik=eAwOp3ttj%2bY4og&pid=ImgRaw&r=0",
        category: "Lifestyle",
        rating: 4.3,
      },
    ],
    women: [
      {
        id: 4,
        name: "Nike Air Zoom Pegasus",
        price: 119.99,
        image:
          "https://th.bing.com/th/id/OIP.jlCDWTEraX7ZrFv1Q3o6QAHaHa?rs=1&pid=ImgDetMain",
        category: "Running",
        rating: 4.6,
      },
      {
        id: 5,
        name: "Adidas Cloudfoam Pure",
        price: 89.99,
        image:
          "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/449c838942da409f8ba9a97f00d3cffe_9366/Cloudfoam_Pure_Shoes_White_DB0695_01_standard.jpg",
        category: "Lifestyle",
        rating: 4.4,
      },
      {
        id: 6,
        name: "Puma Carina Sneaker",
        price: 79.99,
        image:
          "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/389390/01/sv01/fnd/PNA/fmt/png/Carina-Street-Women's-Sneakers",
        category: "Casual",
        rating: 4.2,
      },
    ],
    bags: [
      {
        id: 7,
        name: "Nike Brasilia Backpack",
        price: 45.99,
        image:
          "https://th.bing.com/th/id/OIP.yU8vQeLj6CB9xvizzil4JAHaJQ?rs=1&pid=ImgDetMain",
        category: "Backpack",
        rating: 4.4,
      },
      {
        id: 8,
        name: "Adidas Linear Duffel",
        price: 35.99,
        image:
          "https://th.bing.com/th/id/OIP.dLB5v3wTFGoUTaR8-eT27AHaHa?w=1366&h=1366&rs=1&pid=ImgDetMain",
        category: "Sports Bag",
        rating: 4.3,
      },
      {
        id: 9,
        name: "Puma Phase Sport Bag",
        price: 29.99,
        image:
          "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/075722/01/fnd/IND/fmt/png/Phase-Sports-Bag",
        category: "Sports Bag",
        rating: 4.1,
      },
    ],
  };

  return (
    <section className="product-list">
      <div className="category-tabs">
        <button
          className={`category-tab ${activeCategory === "men" ? "active" : ""}`}
          onClick={() => setActiveCategory("men")}
        >
          Men's Shoes
        </button>
        <button
          className={`category-tab ${
            activeCategory === "women" ? "active" : ""
          }`}
          onClick={() => setActiveCategory("women")}
        >
          Women's Shoes
        </button>
        <button
          className={`category-tab ${
            activeCategory === "bags" ? "active" : ""
          }`}
          onClick={() => setActiveCategory("bags")}
        >
          Bags
        </button>
      </div>

      <div className="products-grid">
        {products[activeCategory].map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
