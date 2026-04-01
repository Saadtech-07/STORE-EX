const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto"
  },
  textarea: {
    width: "100%",
    height: "80px",
    marginTop: "10px"
  },
  btn: {
    marginTop: "10px",
    padding: "10px",
    background: "green",
    color: "#fff",
    border: "none"
  },
  ratingRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px"
  },
  avgRating: {
    fontSize: "1.9rem",
    fontWeight: "700"
  },
  reviewCount: {
    fontSize: "0.9rem",
    color: "#555"
  },
  tabBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "12px"
  },
  tab: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    background: "#fff",
    cursor: "pointer"
  },
  activeTab: {
    flex: 1,
    padding: "8px",
    border: "1px solid #0f6",
    borderRadius: "6px",
    background: "#e0ffe3",
    fontWeight: "700",
    cursor: "pointer"
  },
  starInput: {
    display: "flex",
    gap: "5px",
    marginBottom: "10px"
  },
  noReview: {
    color: "#555",
    marginTop: "10px"
  },
  usernameInput: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  reviewCard: {
    background: "#f3f4f6",
    padding: "10px",
    borderRadius: "6px",
    marginTop: "10px"
  },
  reviewHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "6px"
  },
  reviewAuthor: {
    fontWeight: "600",
    color: "#1f2937"
  },
  reviewScore: {
    fontWeight: "700",
    color: "#f59e0b"
  },
  reviewText: {
    margin: 0,
    color: "#334155"
  }
};
export default styles;