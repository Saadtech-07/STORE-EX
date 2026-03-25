import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import Cart from "./Cart";

import iphone from "./assets/iphone-card.jpg";
import pc from "./assets/pc.jpg";
import laptop from "./assets/laptop-card.jpg";
import watch from "./assets/smartwatch-card.jpg";
import headset from "./assets/headset.jpg";
import powerbank from "./assets/powerbank.jpg";
import biometric from "./assets/biometric.jpg";
import drone from "./assets/drone.jpg";
import wifi from "./assets/wifi.jpg";
import speaker from "./assets/speaker.jpg";
import ps5 from "./assets/ps5.jpg";
import dslr from "./assets/DSLR.jpg";

function App() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const [products] = useState([
    { id: 1, name: "IPhone 17 Pro", price: 89999, image: iphone },
    { id: 2, name: "PC", price: 111999, image: pc },
    { id: 3, name: "Dell Laptop", price: 36999, image: laptop },
    { id: 4, name: "Smart Watch", price: 1999, image: watch },
    { id: 5, name: "Boat Headset", price: 2999, image: headset },
    { id: 6, name: "PowerBank", price: 1599, image: powerbank },
    { id: 7, name: "Biometric Device", price: 7999, image: biometric },
    { id: 8, name: "Drone", price: 21099, image: drone },
    { id: 9, name: "Wifi Router", price: 2099, image: wifi },
    { id: 10, name: "Bluetooth Speaker", price: 7099, image: speaker },
    { id: 11, name: "PS5 Console", price: 99999, image: ps5 },
    { id: 12, name: "DSLR Camera", price: 45999, image: dslr },
  ]);

  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleIncrease = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <header style={styles.header}>

        {/* TOP BAR */}
        <div style={styles.topBar}>
          
          {/* LEFT EMPTY (for balance) */}
          <div />

          {/* TITLE */}
          <h1
            style={styles.titleCenter}
            onClick={() => navigate("/")}
          >
            AuraTech
          </h1>

          {/* RIGHT SIDE */}
          <div style={styles.topRight}>
            <span
              style={styles.signIn}
              onClick={() => setShowMenu(true)}
            >
              Hello, Sign in
            </span>

            <span
              style={styles.cart}
              onClick={() => navigate("/cart")}
            >
              🛒 Cart
              {totalItems > 0 && (
                <span style={styles.badge}>{totalItems}</span>
              )}
            </span>
          </div>

        </div>

        <p style={styles.subtitle}>
          Modern Solutions Powered By Innovation, Built For Your Future.
        </p>

      </header>

      {/* LOGIN SIDEBAR */}
      {showMenu && (
        <div style={styles.overlay} onClick={() => setShowMenu(false)}>
          <div style={styles.sidebar} onClick={(e) => e.stopPropagation()}>
            <div style={styles.closeBtn} onClick={() => setShowMenu(false)}>✕</div>

            <h2>Login</h2>

            <input placeholder="Enter Name" style={styles.input} />
            <input placeholder="Enter Email" style={styles.input} />
            <input type="password" placeholder="Enter Password" style={styles.input} />

            <button
              style={styles.loginBtn}
              onClick={() => {
                alert("Login Successful ✅");
                setShowMenu(false);
              }}
            >
              Login
            </button>

            <p style={styles.signupText}>
              New User? <span style={styles.signupLink}>Sign Up</span>
            </p>
          </div>
        </div>
      )}

      {/* ROUTES */}
      <Routes>
        <Route
          path="/"
          element={
            <div style={styles.grid} className="product-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onRemove={handleRemoveFromCart}
            />
          }
        />
      </Routes>

    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    padding: "0 16px 40px",
    background: "#f1f5f9",
  },

  header: {
    background: "linear-gradient(90deg, #0f172a, #1e293b)",
    color: "#fff",
    padding: "20px",
    borderRadius: "0 0 12px 12px",
    marginBottom: "25px",
  },

  topBar: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
  },

  titleCenter: {
    fontSize: "2.2rem",
    fontWeight: "800",
    textAlign: "center",
    cursor: "pointer",
  },

  topRight: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "25px",
    alignItems: "center",
  },

  signIn: {
    cursor: "pointer",
    fontSize: "15px", // ✅ slightly bigger
    fontWeight: "600",
  },

  cart: {
    position: "relative",
    cursor: "pointer",
    fontSize: "15px", // ✅ slightly bigger
    fontWeight: "600",
  },

  badge: {
    position: "absolute",
    top: "-6px",
    right: "-10px",
    background: "red",
    color: "#fff",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "11px",
  },

  subtitle: {
    marginTop: "8px",
    textAlign: "center",
    fontSize: "13px",
    color: "#cbd5e1",
  },

  grid: {
    display: "grid",
    gap: "20px",
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "flex-end",
  },

  sidebar: {
    width: "300px",
    height: "100%",
    background: "#fff",
    padding: "20px",
  },

  closeBtn: {
    textAlign: "right",
    cursor: "pointer",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
  },

  loginBtn: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
  },

  signupText: {
    marginTop: "15px",
    textAlign: "center",
  },

  signupLink: {
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default App;