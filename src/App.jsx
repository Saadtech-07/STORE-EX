import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";

function App() {
  const [reviews, setReviews] = useState({
    // example default review for demonstration (optional)
    // 1: [
    //   { rating: 5, text: "Excellent product!" },
    //   { rating: 4, text: "Great value." }
    // ]
  });

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ NEW STATE
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // ✅ API FETCH
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        const updatedProducts = data.map(item => ({
          ...item,
          stock: Math.floor(Math.random() * 10) + 1
        }));

        setProducts(updatedProducts);
      } catch (err) {
        setError("Failed to load products ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ NEW useEffect (RESIZE + CLEANUP)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      const currentQty = exists ? exists.qty : 0;

      if (currentQty >= product.stock) {
        alert("Out of stock ❌");
        return prev;
      }

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
      prev.map((item) => {
        if (item.id === id) {
          if (item.qty >= item.stock) {
            alert("Max stock reached");
            return item;
          }
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      })
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

      {/* OPTIONAL: SHOW WIDTH */}
      <p style={{ textAlign: "center" }}>
        Screen Width: {windowWidth}px
      </p>

      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.topBar}>
          <div />

          <h1
            style={styles.titleCenter}
            onClick={() => navigate("/")}
          >
            STORE-EX
          </h1>

          <div style={styles.topRight}>
            <span
              style={styles.signIn}
              onClick={() => setShowLogin(true)}
            >
              Hello, Sign in
            </span>

            <div
  style={styles.cartWrapper}
  onClick={() => navigate("/cart")}
>
  🛒 Cart

  {totalItems > 0 && (
    <span style={styles.badge}>{totalItems}</span>
  )}
</div>
          </div>
        </div>
      </header>

      {/* LOGIN */}
      {showLogin && (
        <div style={styles.overlay}>
          <div style={styles.sidePanel}>
            <span style={styles.close} onClick={() => setShowLogin(false)}>
              ✕
            </span>

            <h2 style={styles.heading}>Login</h2>

            <input placeholder="Name" style={styles.input} />
            <input placeholder="Email" style={styles.input} />
            <input type="password" placeholder="Password" style={styles.input} />

            <button style={styles.loginBtn}>Login</button>

            <p style={styles.signup}>
              New User? <span style={styles.link}>Sign Up</span>
            </p>
          </div>
        </div>
      )}

      {/* ROUTES */}
      <Routes>
        <Route
  path="/product/:id"
  element={
    <ProductDetails
      products={products}
      reviews={reviews}
      setReviews={setReviews}
    />
  }
/>
        <Route
          path="/"
          element={
            <>
              {loading && <h2 style={{ textAlign: "center" }}>Loading...</h2>}
              {error && <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>}

              {!loading && !error && (
                <div style={styles.grid}>
                  {products.map(product => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.title}
                      price={product.price}
                      image={product.image}
                      stock={product.stock}
                      cart={cart}
                      onAddToCart={handleAddToCart}
                      onOpen={() => openProductModal(product)}
                    />
                  ))}
                </div>
              )}
            </>
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

      {selectedProduct && (
        <div style={styles.modalOverlay} onClick={closeProductModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={closeProductModal}>✕</button>

            <div style={styles.modalProductTop}>
              <img src={selectedProduct.image} alt={selectedProduct.title} style={styles.modalImage} />
              <div>
                <h2>{selectedProduct.title}</h2>
                <p style={styles.modalPrice}>₹{selectedProduct.price}</p>
                <p>Stock: {selectedProduct.stock}</p>

                <div style={styles.modalButtons}>
                  <button
                    style={styles.modalAdd}
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    style={styles.modalBuy}
                    onClick={() => alert(`Price: ₹${selectedProduct.price}`)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            <ProductDetails
              product={selectedProduct}
              reviews={reviews}
              setReviews={setReviews}
            />
          </div>
        </div>
      )}
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
    fontWeight: "750",
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
    fontSize: "15px",
    fontWeight: "600",
  },

  card: {
  position: "relative",
  background: "#fff",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  
  display: "flex",              // 🔥 ADD
  flexDirection: "column",      // 🔥 ADD
  justifyContent: "space-between", // 🔥 ADD
  height: "100%"                // 🔥 ADD
  },

  badge: {
  position: "absolute",
  top: "-6px",
  right: "-12px",
  background: "red",
  color: "#fff",
  borderRadius: "50%",
  minWidth: "18px",
  height: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "11px",
  fontWeight: "bold",
  zIndex: 10,
  },

  grid: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(5, 1fr)"
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(4px)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  modalContent: {
    width: "88%",
    maxWidth: "960px",
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    position: "relative",
    boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
    maxHeight: "90vh",
    overflowY: "auto"
  },

  modalClose: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "#e11d48",
    color: "#fff",
    border: "none",
    padding: "8px 10px",
    borderRadius: "50%",
    cursor: "pointer"
  },

  modalProductTop: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    alignItems: "flex-start"
  },

  modalImage: {
    width: "180px",
    height: "180px",
    objectFit: "contain",
    borderRadius: "10px",
    border: "1px solid #e5e7eb"
  },

  modalPrice: {
    fontSize: "1.6rem",
    fontWeight: "700",
    color: "orangered"
  },

  modalButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "12px"
  },

  modalAdd: {
    background: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 14px",
    cursor: "pointer"
  },

  modalBuy: {
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 14px",
    cursor: "pointer"
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "flex-end",
    zIndex: 999
  },

  sidePanel: {
    width: "350px",
    height: "100%",
    background: "#fff",
    padding: "25px",
    position: "relative",
    boxShadow: "-2px 0 10px rgba(0,0,0,0.2)",
  },

  close: {
    position: "absolute",
    top: "15px",
    right: "15px",
    fontSize: "20px",
    cursor: "pointer"
  },

  heading: {
    marginBottom: "20px"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  loginBtn: {
    width: "100%",
    padding: "12px",
    background: "#2f6fed",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600"
  },

  signup: {
    marginTop: "15px",
    textAlign: "center"
  },

  link: {
    color: "#2f6fed",
    cursor: "pointer",
    fontWeight: "500"
  },
  cartWrapper: {
  position: "relative",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "6px",
 },
};

export default App;