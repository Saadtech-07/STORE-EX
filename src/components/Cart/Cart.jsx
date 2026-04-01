import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CartStyles";

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



export default Cart;