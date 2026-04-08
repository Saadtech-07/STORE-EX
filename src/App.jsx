import { useState, useEffect, useRef, useReducer, useMemo, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";

import useLocalStorage from "./hooks/useLocalStorage";
import ProductCard from "./components/ProductCard";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./components/Cart";
import Login from "./pages/Login";
import Landing from "./pages/Landing";

import { cartReducer } from "./reducers/cartReducer";
import { useTheme } from "./context/ThemeContext";
import { useAuth } from "./context/AuthContext";

import Footer from "./components/Footer";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const [reviews, setReviews] = useState({});

  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const isLandingPage = location.pathname === "/";

  const [storedCart, setStoredCart] = useLocalStorage("cart", []);

  const [state, dispatch] = useReducer(cartReducer, {
    cart: storedCart
  });

  const cart = state.cart;

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const { user, logout } = useAuth();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  useEffect(() => {
    if (location.pathname === "/home" && searchRef.current) {
      searchRef.current.focus();
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    setStoredCart(state.cart);
  }, [state.cart]);

  useEffect(() => {
  setLoading(true);

  fetch("https://dummyjson.com/products/search?q=phone")
    .then(res => {
      if (!res.ok) throw new Error("API failed");
      return res.json();
    })
    .then(data => {
      const updated = data.products.map(p => ({
        ...p,
        stock: Math.floor(Math.random() * 10) + 1,
        image: p.thumbnail
      }));

      setProducts(updated);
      setLoading(false);
    })
    .catch(err => {
      console.error("Fetch error:", err);
      setProducts([]);
      setLoading(false);
    });

}, []);

  const handleIncrease = (id) => {
    dispatch({ type: "INCREASE", payload: { id } });
  };

  const handleDecrease = (id) => {
  const item = cart.find(i => i.id === id);

  dispatch({ type: "DECREASE", payload: { id } });

  if (item) {
    setProducts(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, stock: p.stock + 1 } 
          : p
      )
    );
  }
};

  const handleRemove = (id) => {
  const item = cart.find(i => i.id === id);

  dispatch({ type: "REMOVE_FROM_CART", payload: { id } });

  if (item) {
    setProducts(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, stock: p.stock + item.qty } // ✅ restore stock
          : p
      )
    );
  }
};

  const handleAddToCart = useCallback((product) => {
  if (!product.qty || product.qty <= 0) return;

  dispatch({ type: "ADD_TO_CART", payload: product });

  setProducts(prev =>
  prev.map(p => {
    if (p.id === product.id) {
      if (p.stock <= 0) return p; // prevent over-reduction

      return {
        ...p,
        stock: Math.max(p.stock - product.qty, 0)
      };
    }
    return p;
  })
);

  setSelectedProduct(prev =>
    prev && prev.id === product.id
      ? { ...prev, stock: Math.max(prev.stock - product.qty, 0) }
      : prev
  );

}, [dispatch]);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return products.filter(p =>
      p.title.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  const isCartPage = location.pathname === "/cart";

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-900">

      {isCartPage && (
        <div className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm py-2 text-center border-b border-slate-200 dark:border-slate-700">
          Screen size: {windowSize.width}px × {windowSize.height}px
        </div>
      )}

      {!isLandingPage && (
        <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-6 shadow-md">

          <div className="flex justify-between items-center px-6">

            <div className="w-1/3"></div>

            <h1
              className="text-2xl font-bold text-center cursor-pointer w-1/3"
              onClick={() =>{
                setSearchQuery(""); 
                navigate("/home")}}

            >
              STORE-EX
            </h1>

            <div className="w-1/3 flex justify-end items-center gap-5">


              <button
                onClick={toggleTheme}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                  theme === "dark" ? "bg-gray-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${
                    theme === "dark" ? "translate-x-6" : ""
                  }`}
                />
              </button>

              <div className="relative" ref={menuRef}>
                <span
                  className="cursor-pointer hover:text-orange-400"
                  onClick={() => {
                    if (!user) navigate("/login");
                    else setShowMenu(prev => !prev);
                  }}
                >
                  {user ? `Hello, ${user.name}` : "Hello, Sign in"}
                </span>

                {user && showMenu && (
                  <div className="absolute right-0 mt-3 w-44 bg-slate-800 text-white rounded-xl shadow-lg p-4 z-50">
                    <p className="cursor-pointer mb-3">Manage Account</p>
                    <p
                      className="cursor-pointer text-red-400"
                      onClick={() => {
                        logout();
                        dispatch({ type: "CLEAR_CART" }); 
                        setStoredCart([]); 
                        setShowMenu(false);
                        window.location.href = "/home";
                      }}
                    >
                      Logout
                    </p>
                  </div>
                )}
              </div>

              <div
                onClick={() => navigate("/cart")}
                className="relative cursor-pointer flex items-center gap-1"
              >
                🛒 Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] px-1.5 py-[2px] rounded-full font-bold">
                    {totalItems}
                  </span>
                )}
              </div>

            </div>
          </div>

          <div className="mt-4 flex justify-center px-6">
  <input
    ref={searchRef}
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="
      w-full max-w-xl p-3 rounded-lg outline-none transition
      bg-white text-black placeholder-gray-500 border border-gray-300
      focus:ring-2 focus:ring-orange-400

      dark:bg-slate-700 dark:text-white dark:placeholder-gray-300
      dark:border-slate-600 dark:focus:ring-orange-500
      "
      placeholder="Search for products..."
    />
    </div>
    </header>
    )}

      <div className="flex-grow">
        <Routes>

        <Route path="/" element={<Landing />} />

        <Route
        path="/home"
        element={
        <div className="px-6 py-6">

        {(searchQuery || filteredProducts.length === 0) && (
        <p
        className="text-blue-600 cursor-pointer mb-4"
        onClick={() => setSearchQuery("")}
        >
        ← Back to Home
        </p>
        )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {loading ? (
          <p className="col-span-full text-center text-gray-500">
            Loading products...
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No products found....
          </p>
        ) : (
          filteredProducts.map(p => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.title}
              price={p.price}
              image={p.image}
              stock={p.stock}
              onOpen={() => {
                setSelectedProduct(p);
                navigate(`/product/${p.id}`);
              }}
            />
          ))
        )}

      </div>
    </div>
  }
/>

          <Route
            path="/product/:id"
            element={
              <ProductDetails
                product={selectedProduct}
                products={products}
                reviews={reviews}
                setReviews={setReviews}
                onAddToCart={handleAddToCart}
              />
            }
          />

          <Route
          path="/cart"
          element={
          user ? (
          <Cart
          cart={cart}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
          />
          ) : (
          <Navigate to="/login" />
          )
          }
          />

          <Route path="/login" element={<Login />} />

        </Routes>
      </div>

      {!isLandingPage && <Footer />}
    </div>
  );
}

export default App;