import { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [reviews, setReviews] = useState({
  });

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ NEW STATE
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  // ✅ API FETCH
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) {
          throw new Error(`API error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        // dummyjson returns { products: [ ... ], total, skip, limit }
        const apiProducts = data.products || [];

        const updatedProducts = apiProducts.map(item => ({
          ...item,
          stock: Math.floor(Math.random() * 10) + 1,
          image: item.thumbnail || (item.images && item.images[0]) || ""
        }));

        setProducts(updatedProducts);
        setError(null);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Failed to load products ❌ (check console for details)");
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
  const [cart, setCart] = useLocalStorage("cart", []);
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

  const filteredProducts = products.filter((product) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      product.title.toLowerCase().includes(q) ||
      (product.description && product.description.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

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
            onClick={() => {
              setSearchQuery("");
              navigate("/");
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setTimeout(() => {
                searchInputRef.current?.focus();
              }, 100);
            }}
            title="Click to return to homepage"
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

        <div style={styles.searchBar}>
          <input
            ref={searchInputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                // Trigger search on Enter key
                setTimeout(() => {
                  const resultSection = document.querySelector('[data-products-grid]');
                  if (resultSection) {
                    resultSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }
            }}
            placeholder="Search for products, brands and more"
            style={styles.searchInput}
            autoComplete="off"
          />

          <button
            style={styles.searchButton}
            onClick={() => {
              // Trigger search when button is clicked
              if (searchQuery.trim()) {
                setTimeout(() => {
                  const resultSection = document.querySelector('[data-products-grid]');
                  if (resultSection) {
                    resultSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              } else {
                alert("Please enter a search term");
              }
            }}
          >
            Search
          </button>
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
                <div style={styles.grid} data-products-grid>
                  {filteredProducts.length === 0 ? (
                    <div style={styles.noProductsContainer}>
                      <p style={styles.noProductsTitle}>❌ No Products Found</p>
                      <p style={styles.noProductsMessage}>
                        {searchQuery 
                          ? `Sorry, we couldn't find any products matching "${searchQuery}". Try searching with different keywords.`
                          : "Start searching for your favorite products!"}
                      </p>
                    </div>
                  ) : (
                    filteredProducts.map(product => (
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
                    ))
                  )}
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
    transition: "all 0.2s ease",
    borderRadius: "8px",
    padding: "8px 12px",
    userSelect: "none"
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

  searchBar: {
    marginTop: "16px",
    display: "flex",
    gap: "8px",
    maxWidth: "700px",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto"
  },

  searchInput: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    color: "#0f172a",
    background: "#ffffff",
    outline: "none",
    lineHeight: "1.4",
    boxShadow: "inset 0 0 0 1px #cbd5e1"
  },

  searchButton: {
    background: "#ff9900",
    border: "none",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
    transition: "background 0.2s ease"
  },

  noProductsContainer: {
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: "40px 20px",
    background: "#fff",
    borderRadius: "10px",
    border: "2px dashed #cbd5e1"
  },

  noProductsTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#e11d48",
    marginBottom: "10px",
    margin: "0 0 10px 0"
  },

  noProductsMessage: {
    fontSize: "16px",
    color: "#64748b",
    margin: "0"
  },
};

export default App;