const styles = {
  card: {
    position: "relative",
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",

    display: "flex",              // ✅ ADDED
    flexDirection: "column",      // ✅ ADDED
    justifyContent: "space-between", // ✅ ADDED
    height: "100%"                // ✅ ADDED
  },

  topContent: {
    flexGrow: 1                  // ✅ ADDED
  },

  badge: {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: "red",
    color: "#fff",
    padding: "5px 10px",
    fontSize: "11px",
    fontWeight: "bold",
    borderRadius: "4px",
    letterSpacing: "0.5px"
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "contain"
  },

  title: {
    fontSize: "14px",
    minHeight: "40px" // ✅ keeps alignment
  },

  price: {
    color: "orangered",
    fontWeight: "600"
  },

  stock: {
    fontSize: "12px",
    color: "#555",
    marginBottom: "10px"
  },

  button: {
    flex: 1,
    background: "green",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer"
  },

  buyNow: {
    flex: 1,
    background: "#eba133",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer"
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "8px"
  }
};
export default styles;