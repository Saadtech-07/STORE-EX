const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    padding: "0 16px 40px",
    background: "#f1f5f9",
  },

  header: {
    background: "linear-gradient(90deg, #0f172a, #1e293b)",
    color: "#fff",
    padding: "20px",
    borderRadius: "0 0 12px 12px",
    marginBottom: "25px",
  },

  topBar: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
  },

  titleCenter: {
    fontSize: "2.2rem",
    fontWeight: "750",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    borderRadius: "8px",
    padding: "8px 12px",
    userSelect: "none"
  },

  topRight: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "25px",
    alignItems: "center",
  },

  signIn: {
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
  },

  card: {
  position: "relative",
  background: "#fff",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  
  display: "flex",              // 🔥 ADD
  flexDirection: "column",      // 🔥 ADD
  justifyContent: "space-between", // 🔥 ADD
  height: "100%"                // 🔥 ADD
  },

  badge: {
  position: "absolute",
  top: "-6px",
  right: "-12px",
  background: "red",
  color: "#fff",
  borderRadius: "50%",
  minWidth: "18px",
  height: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "11px",
  fontWeight: "bold",
  zIndex: 10,
  },

  grid: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(5, 1fr)"
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(4px)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  modalContent: {
    width: "88%",
    maxWidth: "960px",
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    position: "relative",
    boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
    maxHeight: "90vh",
    overflowY: "auto"
  },

  modalClose: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "#e11d48",
    color: "#fff",
    border: "none",
    padding: "8px 10px",
    borderRadius: "50%",
    cursor: "pointer"
  },

  modalProductTop: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    alignItems: "flex-start"
  },

  modalImage: {
    width: "180px",
    height: "180px",
    objectFit: "contain",
    borderRadius: "10px",
    border: "1px solid #e5e7eb"
  },

  modalPrice: {
    fontSize: "1.6rem",
    fontWeight: "700",
    color: "orangered"
  },

  modalButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "12px"
  },

  modalAdd: {
    background: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 14px",
    cursor: "pointer"
  },

  modalBuy: {
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 14px",
    cursor: "pointer"
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "flex-end",
    zIndex: 999
  },

  sidePanel: {
    width: "350px",
    height: "100%",
    background: "#fff",
    padding: "25px",
    position: "relative",
    boxShadow: "-2px 0 10px rgba(0,0,0,0.2)",
  },

  close: {
    position: "absolute",
    top: "15px",
    right: "15px",
    fontSize: "20px",
    cursor: "pointer"
  },

  heading: {
    marginBottom: "20px"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  loginBtn: {
    width: "100%",
    padding: "12px",
    background: "#2f6fed",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600"
  },

  signup: {
    marginTop: "15px",
    textAlign: "center"
  },

  link: {
    color: "#2f6fed",
    cursor: "pointer",
    fontWeight: "500"
  },
  cartWrapper: {
  position: "relative",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "6px",
 },

  searchBar: {
    marginTop: "16px",
    display: "flex",
    gap: "8px",
    maxWidth: "700px",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto"
  },

  searchInput: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    color: "#0f172a",
    background: "#ffffff",
    outline: "none",
    lineHeight: "1.4",
    boxShadow: "inset 0 0 0 1px #cbd5e1"
  },

  searchButton: {
    background: "#ff9900",
    border: "none",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
    transition: "background 0.2s ease"
  },

  noProductsContainer: {
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: "40px 20px",
    background: "#fff",
    borderRadius: "10px",
    border: "2px dashed #cbd5e1"
  },

  noProductsTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#e11d48",
    marginBottom: "10px",
    margin: "0 0 10px 0"
  },

  noProductsMessage: {
    fontSize: "16px",
    color: "#64748b",
    margin: "0"
  },
};
export default styles;