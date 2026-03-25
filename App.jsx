import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Cart from './Cart';
import ProductCard from './ProductCard';

import iphone from './assets/iphone-card.jpg';
import pc from './assets/pc.jpg';
import laptop from './assets/laptop-card.jpg';
import watch from './assets/smartwatch-card.jpg';
import headset from './assets/headset.jpg';
import powerbank from './assets/powerbank.jpg';
import biometric from './assets/biometric.jpg';
import drone from './assets/drone.jpg';
import wifi from './assets/wifi.jpg';
import speaker from './assets/speaker.jpg';
import ps5 from './assets/ps5.jpg';
import dslr from './assets/DSLR.jpg';

function App() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const [products] = useState([
    { id: 1, name: 'iPhone 17 Pro', price: 89999, image: iphone },
    { id: 2, name: 'PC', price: 111999, image: pc },
    { id: 3, name: 'Dell Laptop', price: 36999, image: laptop },
    { id: 4, name: 'Smart Watch', price: 1999, image: watch },
    { id: 5, name: 'Boat Headset', price: 2999, image: headset },
    { id: 6, name: 'PowerBank', price: 1599, image: powerbank },
    { id: 7, name: 'Biometric Device', price: 7999, image: biometric },
    { id: 8, name: 'Drone', price: 21099, image: drone },
    { id: 9, name: 'Wifi Router', price: 2099, image: wifi },
    { id: 10, name: 'Bluetooth Speaker', price: 7099, image: speaker },
    { id: 11, name: 'PS5 Console', price: 99999, image: ps5 },
    { id: 12, name: 'DSLR Camera', price: 45999, image: dslr },
  ]);

  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
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

  const homeContent = (
    <main style={styles.main}>
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <p style={styles.heroBadge}>New</p>
          <h1 style={styles.heroTitle}>MS Tech Store</h1>
          <p style={styles.heroDesc}>
            Elegance in performance. Seamlessly curated technology for work and
            lifestyle.
          </p>
          <div style={styles.heroCtas}>
            <button
              style={styles.primaryBtn}
              onClick={() => document.getElementById('product-grid')?.scrollIntoView({behavior: 'smooth'})}
            >
              Shop Collection
            </button>
            <button
              style={styles.secondaryBtn}
              onClick={() => setShowMenu(true)}
            >
              Sign In
            </button>
          </div>
        </div>
        <div style={styles.heroVisual}>
          <img
            src={iphone}
            alt= Featured product
            style={styles.heroImage}
          />
        </div>
      </section>

      <section style={styles.productsSection} id=product-grid>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Featured Picks</h2>
          <p style={styles.sectionSub}>Premium tech, styled for modern living.</p>
        </div>

        <div style={styles.productGrid} className=product-grid>
          {products.map((item) => (
            <ProductCard
              key={item.id}
              {...item}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>
    </main>
  );

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.navRow}>
          <span style={styles.logo} onClick={() => navigate('/')}>MS TECH</span>
          <nav style={styles.navLinks}>
            <button style={styles.navButton} onClick={() => navigate('/')}>Store</button>
            <button style={styles.navButton} onClick={() => document.getElementById('product-grid')?.scrollIntoView({behavior:'smooth'})}>Products</button>
            <button style={styles.navButton}>Collections</button>
            <button style={styles.navButton}>Offers</button>
          </nav>
          <div style={styles.topActions}>
            <button style={styles.iconButton} onClick={() => setShowMenu(true)}>Sign In</button>
            <button style={styles.iconButton} onClick={() => navigate('/cart')}>
               Cart{totalItems > 0 ?  () : ''}
            </button>
          </div>
        </div>
      </header>

      {showMenu ; (
        <div style={styles.overlay} onClick={() => setShowMenu(false)}>
          <div style={styles.sidebar} onClick={(e) => e.stopPropagation()}>
            <div style={styles.closeBtn} onClick={() => setShowMenu(false)}></div>
            <h2>Login</h2>
            <input placeholder=Enter Name style={styles.input} required />
            <input placeholder=Enter Email style={styles.input} required />
            <input type=password placeholder=Enter Password style={styles.input} required />
            <button
              style={styles.loginBtn}
              onClick={() => {
                alert('Login Successful ');
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

      <Routes>
        <Route path=/ element={homeContent} />
        <Route
          path=/cart
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
  page: {
    minHeight: '100vh',
    background: '#f6f7fb',
    color: '#0f172a',
    fontFamily: Segoe UI Tahoma Geneva Verdana sans-serif,
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 200,
    background: '#ffffffcc',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid #e5e7eb',
  },
  navRow: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '14px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
  },
  logo: {
    fontWeight: 800,
    fontSize: '1.2rem',
    letterSpacing: '1px',
    color: '#111827',
    cursor: 'pointer',
  },
  navLinks: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  navButton: {
    border: 'none',
    background: 'transparent',
    color: '#111827cc',
    fontWeight: 600,
    padding: '8px 10px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  topActions: {
    display: 'flex',
    gap: '10px',
  },
  iconButton: {
    border: '1px solid #d1d5db',
    background: '#fff',
    borderRadius: '8px',
    color: '#111827',
    padding: '8px 12px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heroSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    alignItems: 'center',
    minHeight: '72vh',
    padding: '70px 20px 40px',
    marginTop: '8px',
  },
  heroContent: {
    maxWidth: '540px',
  },
  heroBadge: {
    color: '#1d4ed8',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    marginBottom: '12px',
  },
  heroTitle: {
    fontSize: '3rem',
    lineHeight: 1.1,
    margin: '0 0 16px',
    fontWeight: 800,
    color: '#0f172a',
  },
  heroDesc: {
    color: '#475569',
    fontSize: '1.1rem',
    lineHeight: 1.6,
    marginBottom: '24px',
  },
  heroCtas: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  primaryBtn: {
    padding: '14px 22px',
    borderRadius: '999px',
    border: 'none',
    background: '#111827',
    color: '#fff',
    fontWeight: 700,
    cursor: 'pointer',
  },
  secondaryBtn: {
    padding: '14px 22px',
    borderRadius: '999px',
    border: '1px solid #d1d5db',
    background: '#fff',
    color: '#111827',
    fontWeight: 700,
    cursor: 'pointer',
  },
  heroVisual: {
    textAlign: 'center',
  },
  heroImage: {
    width: '100%',
    maxWidth: '500px',
    borderRadius: '26px',
    boxShadow: '0 24px 40px rgba(14, 23, 40, 0.2)',
  },
  productsSection: {
    padding: '30px 20px 50px',
  },
  sectionHeader: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '2rem',
    margin: '0 0 8px',
    fontWeight: 800,
  },
  sectionSub: {
    color: '#64748b',
    margin: 0,
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '20px',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.42)',
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 500,
  },
  sidebar: {
    width: '330px',
    height: '100%',
    background: '#ffffff',
    padding: '24px',
    boxShadow: '-8px 0 28px rgba(15,23,42,0.2)',
  },
  closeBtn: {
    textAlign: 'right',
    cursor: 'pointer',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
  },
  loginBtn: {
    width: '100%',
    padding: '12px',
    background: '#111827',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  signupText: {
    marginTop: '15px',
    textAlign: 'center',
    color: '#64748b',
  },
  signupLink: {
    color: '#1d4ed8',
    cursor: 'pointer',
    fontWeight: 600,
  },
  '@media (max-width: 1024px)': {
    heroSection: {
      gridTemplateColumns: '1fr',
      textAlign: 'center',
    },
    navLinks: {
      display: 'none',
    },
  },
  '@media (max-width: 768px)': {
    heroTitle: {
      fontSize: '2.2rem',
    },
    productGrid: {
      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    },
  },
};

export default App;
