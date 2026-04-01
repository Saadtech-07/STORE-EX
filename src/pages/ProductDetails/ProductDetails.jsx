import { useParams } from "react-router-dom";
import { useState } from "react";
import styles from "./ProductDetailsStyles";

function ProductDetails({ product: propProduct, products, reviews, setReviews }) {
  const { id } = useParams();
  const productId = propProduct ? propProduct.id : Number(id);
  const product = propProduct || products.find(p => p.id === productId);

  const [rating, setRating] = useState(0);
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const productReviews = reviews[productId] || [];
  const [mode, setMode] = useState("read"); // 'read' or 'write'

  const handleSubmit = () => {
    if (!rating || !username.trim() || text.trim() === "") {
      setError("All fields required ❌");
      return;
    }

    const newReview = { rating, username, text };

    setReviews(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), newReview]
    }));

    setRating(0);
    setText("");
    setError("");
  };

  const avgRating =
    productReviews.length > 0
      ? (
          productReviews.reduce((acc, r) => acc + r.rating, 0) /
          productReviews.length
        ).toFixed(1)
      : 0;

  if (!product) {
    return (
      <div style={styles.container}>
        <h2>Loading product...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>{product?.title || "Product not found"}</h2>

      {/* ⭐ Average Rating */}
      <div style={styles.ratingRow}>
        <span style={styles.avgRating}>{avgRating} ⭐</span>
        <span style={styles.reviewCount}>{productReviews.length} review(s)</span>
      </div>

      {/* Mode tabs */}
      <div style={styles.tabBar}>
        <button
          style={mode === "read" ? styles.activeTab : styles.tab}
          onClick={() => setMode("read")}
        >
          Read Reviews
        </button>
        <button
          style={mode === "write" ? styles.activeTab : styles.tab}
          onClick={() => setMode("write")}
        >
          Write Review
        </button>
      </div>

      {mode === "write" ? (
        <>
          <div style={styles.starInput}>
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                onClick={() => setRating(num)}
                style={{
                  fontSize: "25px",
                  cursor: "pointer",
                  color: num <= rating ? "gold" : "#ccc"
                }}
              >
                ★
              </span>
            ))}
          </div>

          <input
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.usernameInput}
          />

          <textarea
            placeholder="Write review..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={styles.textarea}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button style={styles.btn} onClick={handleSubmit}>
            Submit Review
          </button>
        </>
      ) : (
        <div>
          {productReviews.length === 0 ? (
            <p style={styles.noReview}>No reviews yet. Be the first!</p>
          ) : (
            productReviews.map((r, i) => (
              <div key={i} style={styles.reviewCard}>
                <div style={styles.reviewHeader}>
                  <span style={styles.reviewAuthor}> {r.username || "Anonymous"}</span>
                  <span style={styles.reviewScore}>{r.rating} ⭐</span>
                </div>
                <p style={styles.reviewText}>{r.text}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}



export default ProductDetails;