import React, { useState } from "react";
import Login from "../components/features/auth/Login";
import Signup from "../components/features/auth/Singup";
import "../Style/AuthPage.css";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleGoogleLogin = () => {
    // Xử lý đăng nhập Google
    console.log("Google login");
  };

  const handleFacebookLogin = () => {
    // Xử lý đăng nhập Facebook
    console.log("Facebook login");
  };

  return (
    <div className="auth-page">
      {isLogin ? <Login /> : <Signup />}

      <div className="social-auth">
        <p className="divider">Hoặc</p>
        <button className="social-btn google-btn" onClick={handleGoogleLogin}>
          <img
            src="https://th.bing.com/th/id/OIP.Vw1Ehwu9TOhEN6euqYPcxAHaHa?rs=1&pid=ImgDetMain"
            alt="Google"
          />
          <span>Tiếp tục với Google</span>
        </button>
        <button
          className="social-btn facebook-btn"
          onClick={handleFacebookLogin}
        >
          <img
            src="https://th.bing.com/th/id/R.e790c25db5e52838040686612b1a732c?rik=uVuLX4sResGMKA&riu=http%3a%2f%2fpngimg.com%2fuploads%2ffacebook_logos%2ffacebook_logos_PNG19757.png&ehk=JL234rPBfx%2bf3tobhEVbPdNgJiWOhk251WyRwRAg940%3d&risl=&pid=ImgRaw&r=0"
            alt="Facebook"
          />
          <span>Tiếp tục với Facebook</span>
        </button>
      </div>

      <div className="auth-switch">
        <p>
          {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Đăng ký" : "Đăng nhập"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
