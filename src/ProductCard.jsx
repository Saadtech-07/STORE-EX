function ProductCard({ id, name, price, image, onAddToCart }) {
  const cardStyle = {
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "16px",
    textAlign: "center",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
    transition: "0.3s",
  };

  const imageStyle = {
    width: "100%",
    height: "180px",
    objectFit: "contain",
    marginBottom: "10px",
  };

  const titleStyle = {
    fontSize: "1rem",
    fontWeight: "700",
    marginBottom: "6px",
  };

  const priceStyle = {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#ea580c",
    marginBottom: "10px",
  };

  const btnStyle = {
    padding: "8px 12px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  return (
    <div style={cardStyle} className="product-card">
      <img src={image} alt={name} style={imageStyle} />
      <h3 style={titleStyle}>{name}</h3>
      <p style={priceStyle}>₹{price}</p>

      <button
        onClick={() => onAddToCart({ id, name, price, image })}
        style={btnStyle}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;