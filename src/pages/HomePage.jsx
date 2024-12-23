import { useState, useEffect } from "react";
import ProductList from "../components/features/products/ProductList";
import ProductCategory from "../components/features/products/ProducCategory";
import "../Style/HomePage.css";

function HomePage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newSeconds = prevTime.seconds - 1;
        const newMinutes =
          newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes;
        const newHours = newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours;

        if (newHours < 0) {
          // Reset timer when it reaches 0
          return { hours: 24, minutes: 0, seconds: 0 };
        }

        return {
          hours: newHours,
          minutes: newMinutes < 0 ? 59 : newMinutes,
          seconds: newSeconds < 0 ? 59 : newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Helper function to add leading zero
  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <div className="home-container">
      {/* Banner Section */}
      <div className="banner">
        <img
          src="https://img.mwc.com.vn/giay-thoi-trang?w=1920&h=0&FileInput=/Resources/Silde/2024/10/25/banner-2.jpg"
          alt="Special Offer Banner"
          className="banner-image"
        />
      </div>

      {/* Flash Sale Section */}
      <section className="flash-sale">
        <div className="flash-sale-header">
          <h2>Flash Sale</h2>
          <div className="timer">
            <span>Ends in: </span>
            <span className="time-block">{formatNumber(timeLeft.hours)}</span>:
            <span className="time-block">{formatNumber(timeLeft.minutes)}</span>
            :
            <span className="time-block">{formatNumber(timeLeft.seconds)}</span>
          </div>
        </div>
        <ProductList />
      </section>

      {/* Replace the existing Featured Categories section with ProductCategory */}
      <ProductCategory />

      {/* Newsletter Section */}
      <section className="newsletter">
        <h2>Subscribe to Our Newsletter</h2>
        <p>Stay updated with our latest products and offers</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
}

export default HomePage;
