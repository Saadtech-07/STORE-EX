function Cart({ cart, onIncrease, onDecrease, onRemove }) {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛒 Your Cart</h2>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item) => (
        <div key={item.id} style={styles.card}>
          
          {/* LEFT */}
          <div style={styles.left}>
            <img src={item.image} alt={item.name} style={styles.image} />

            <div>
              {/* ✅ PRODUCT NAME BOLD */}
              <h3 style={styles.name}>{item.name}</h3>

              {/* ✅ BIGGER QUANTITY */}
              <div style={styles.controls}>
                <button onClick={() => onDecrease(item.id)}>-</button>
                <span style={styles.qty}>{item.qty}</span>
                <button onClick={() => onIncrease(item.id)}>+</button>
              </div>

              <p
                style={styles.remove}
                onClick={() => onRemove(item.id)}
              >
                Remove
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div style={styles.price}>
            ₹{item.price * item.qty}
          </div>
        </div>
      ))}

      {/* TOTAL */}
      {cart.length > 0 && (
        <div style={styles.footer}>
          <h2>Total: ₹{totalPrice}</h2>
          <button style={styles.buyBtn}>Proceed to Buy</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "auto",
  },

  heading: {
    marginBottom: "20px",
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },

  left: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },

  image: {
    width: "80px",
    height: "80px",
    objectFit: "contain",
  },

  /* 🔥 UPDATED */
  name: {
    fontSize: "16px",
    fontWeight: "700", // ✅ bold
    marginBottom: "6px",
  },

  controls: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "6px",
  },

  /* 🔥 UPDATED */
  qty: {
    fontSize: "16px", // ✅ slightly bigger
    fontWeight: "600",
  },

  remove: {
    color: "red",
    cursor: "pointer",
    fontSize: "14px",
  },

  price: {
    fontWeight: "bold",
    fontSize: "16px",
  },

  footer: {
    marginTop: "20px",
    textAlign: "right",
  },

  buyBtn: {
    marginTop: "10px",
    padding: "12px 20px",
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Cart;