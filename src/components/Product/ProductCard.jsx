import { useState } from "react";
import styles from "./ProductCardStyles";

function ProductCard({ id, name, price, image, stock, cart, onAddToCart, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const safeCart = cart || [];

  const cartItem = safeCart.find(item => item.id === id);
  const qtyInCart = cartItem ? cartItem.qty : 0;

  const handleBuyNow = () => {
    alert(`Price: ₹${price}`);
  };

  const availableStock = Math.max((stock || 0) - qtyInCart, 0);

  return (
    <div
      style={{
        ...styles.card,
        cursor: "pointer",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0)",
        boxShadow: hovered
          ? "0 10px 20px rgba(0,0,0,0.18)"
          : "0 2px 10px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease"
      }}
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      
      {availableStock === 0 && (
        <div style={styles.badge}>OUT OF STOCK</div>
      )}

      <div style={styles.topContent}>
        <img src={image} alt={name} style={styles.image} />

        <h3 style={styles.title}>{name}</h3>

        <p style={styles.price}>₹{price}</p>

        <p style={styles.stock}>
          Stock Available: {availableStock}
        </p>
      </div>

      <div style={styles.buttonContainer}>
        <button
          style={{
            ...styles.button,
            background: availableStock === 0 ? "#ccc" : "green",
            cursor: availableStock === 0 ? "not-allowed" : "pointer",
            opacity: availableStock === 0 ? 0.6 : 1
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (availableStock > 0) onAddToCart({ id, name, price, image, stock });
          }}
          disabled={availableStock === 0}
        >
          Add to Cart
        </button>

        <button
          style={{
            ...styles.buyNow,
            background: availableStock === 0 ? "#ccc" : "#ff9900",
            cursor: "pointer",
            opacity: availableStock === 0 ? 0.6 : 1
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (availableStock === 0) {
              alert("❌ Out of Stock");
            } else {
              alert(`Price: ₹${price}`);
            }
          }}
          disabled={availableStock === 0}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}



export default ProductCard;