import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderPage from "./pages/OrderPage";
import ProductDetail from "./pages/ProductDetail";
import MenProducts from "./components/features/products/MenProduct";
import WomenProducts from "./components/features/products/WomenProduct";
import BagProducts from "./components/features/products/BagProduct";
import UserPage from "./pages/UserPage";
import AuthPage from "./pages/AuthPage";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:category" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/men" element={<MenProducts />} />
            <Route path="/women" element={<WomenProducts />} />
            <Route path="/bags" element={<BagProducts />} />
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
