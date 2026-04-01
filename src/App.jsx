import { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProductCard from "./components/Product/ProductCard";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./components/Cart/Cart";
import useLocalStorage from "./hooks/useLocalStorage";
import styles from "./styles/appStyles";
import Landing from "./pages/Landing/Landing";
import { useLocation } from "react-router-dom";

function App() {
  const [reviews, setReviews] = useState({
  });

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

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
      {!isLandingPage && (
      <header style={styles.header}>
        <div style={styles.topBar}>
          <div />

          <h1
            style={styles.titleCenter}
            onClick={() => {
              setSearchQuery("");
              navigate("/home");
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
    )}

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

  {/* PRODUCT DETAILS */}
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

  {/* ✅ LANDING PAGE */}
  <Route path="/" element={<Landing />} />

  {/* ✅ HOME (YOUR EXISTING CODE) */}
  <Route
    path="/home"
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

  {/* CART */}
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

export default App;