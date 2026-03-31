import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, onIncrease, onDecrease, onRemove }) {
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const delivery = subtotal > 0 ? 50 : 0;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + gst;

  return (
    <div style={styles.container}>
      
      {/* 🔥 TOP BAR (same position as before) */}
      <div style={styles.topBar}>
  <span style={styles.back} onClick={() => navigate("/")}>
    ← Back to Home
  </span>

  <h2 style={styles.title}>Your Cart</h2>

  {/* empty space for balance */}
  <div style={{ width: "120px" }}></div>
</div>

      {/* 🔥 MAIN LAYOUT */}
      <div style={styles.cartContainer}>
        
        {/* LEFT SIDE (PRODUCTS) */}
        <div style={styles.left}>
          {cart.map((item) => (
            <div key={item.id} style={styles.card}>
              
              <img src={item.image} alt={item.name} style={styles.image} />

              <div style={styles.details}>
                <h3 style={styles.name}>{item.name}</h3>

                <p style={styles.qty}>
                  <button style={styles.qtyButton} onClick={() => onDecrease(item.id)}>-</button>
                  <span style={styles.qtyText}>{item.qty}</span>
                  <button style={styles.qtyButton} onClick={() => onIncrease(item.id)}>+</button>
                </p>

                <p style={styles.remove} onClick={() => onRemove(item.id)}>
                  Remove
                </p>
              </div>

              <div style={styles.price}>
                ₹{item.price * item.qty}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE (SUMMARY + HELP) */}
        <div style={styles.right}>

          {/* 🔥 SUMMARY */}
          <div style={styles.summary}>
            <h3 style={{ marginBottom: "15px" }}>ORDER SUMMARY</h3>

            <div style={styles.row}>
              <span>Products</span>
              <span>₹{subtotal}</span>
            </div>

            <div style={styles.row}>
              <span>Delivery</span>
              <span>₹{delivery}</span>
            </div>

            <div style={styles.row}>
              <span>GST (5%)</span>
              <span>₹{gst}</span>
            </div>

            <hr style={{ margin: "10px 0" }} />

            <div style={styles.totalRow}>
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              style={styles.buyBtn}
              onClick={() => alert("✅ Order Confirmed!")}
            >
              Proceed to Buy
            </button>
          </div>

          {/* 🔥 NEED HELP */}
          <div style={styles.helpBox}>
  <h4>Need Help?</h4>

  <a href="#" style={styles.link}>Shipping</a>
  <a href="#" style={styles.link}>Returns & Exchanges</a>
  <a href="#" style={styles.link}>Contact Us</a>
</div>

        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
  maxWidth: "1100px",
  margin: "0 auto",   // 🔥 THIS centers everything
  padding: "20px"
},

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  back: {
    color: "#007185",
    cursor: "pointer",
    fontSize: "14px"
  },

  cartContainer: {
  display: "flex",
  gap: "30px",
  justifyContent: "center", // 🔥 centers left + right block
  alignItems: "flex-start"
},

  left: {
    flex: 2
  },

  right: {
    flex: 1
  },

  card: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "15px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },

  image: {
    width: "110px",
    height: "100px",
    objectFit: "contain",
    marginRight: "20px"
  },

  details: {
    flex: 1
  },

  name: {
    fontWeight: "600"
  },

  qty: {
    margin: "8px 0"
  },

  qtyButton: {
    fontWeight: "700"
  },

  qtyText: {
    margin: "0 10px",
    fontWeight: "600"
  },

  remove: {
    color: "red",
    fontWeight: "500",
    cursor: "pointer"
  },

  price: {
    fontWeight: "600"
  },

  summary: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px"
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "700",
    fontSize: "18px",
    marginTop: "10px"
  },

  buyBtn: {
    marginTop: "15px",
    width: "100%",
    padding: "12px",
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },

  helpBox: {
    marginTop: "20px",
    padding: "15px",
    background: "#fff",
    borderRadius: "10px"
  },
  link: {
  display: "block",
  color: "#007185",
  textDecoration: "none",
  marginTop: "8px",
  fontSize: "14px",
  cursor: "pointer"
},
title: {
  textAlign: "center",
  marginBottom: "20px",
  fontWeight: "600"
},
topBar: {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "20px"
},

title: {
  flex: 1,
  textAlign: "center",
  margin: 0,
  fontWeight: "600",
  fontSize: "20px"
},

back: {
  color: "blue",
  cursor: "pointer",
  width: "120px"
},
};

export default Cart;