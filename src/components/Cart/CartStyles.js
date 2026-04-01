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
export default styles;