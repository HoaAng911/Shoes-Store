import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/slice/productSlice"; // Assuming you have this function for fetching products
import "../../Style/ProductCategory.css";
import ProductCard from "./ProductCard"; // Import the ProductCard component

const ProductCategory = () => {
  const dispatch = useDispatch();
  const { shoesMan, shoesWoman, bags, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch products on mount
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Get the first 4 products from each category
  const firstFourShoesMan = shoesMan?.slice(0, 4);
  const firstFourShoesWoman = shoesWoman?.slice(0, 4);
  const firstFourBags = bags?.slice(0, 4);

  // A function to render product categories to avoid repetition
  const renderProductCategory = (categoryTitle, products) => (
    <div className="category-section">
      <h2>{categoryTitle}</h2>
      <div className="product-grid">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="product-list">
      {renderProductCategory("Giày Nam", firstFourShoesMan)}
      {renderProductCategory("Giày Nữ", firstFourShoesWoman)}
      {renderProductCategory("Túi", firstFourBags)}
    </div>
  );
};

export default ProductCategory;
