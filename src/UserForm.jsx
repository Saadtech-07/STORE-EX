import { useState } from "react";

function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form Submitted!");
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Quick Registration</h2>
        <p style={styles.sub}>Get updates & exclusive offers</p>

        <input
          name="name"
          placeholder="Enter your name"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          style={styles.input}
        />

        <div style={styles.passwordBox}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            style={{ ...styles.input, marginBottom: 0 }}
          />
          <span
            style={styles.show}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button style={styles.button}>Join Now</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "50px",
    display: "flex",
    justifyContent: "center",
  },

  form: {
    width: "100%",
    maxWidth: "400px",
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  heading: {
    textAlign: "center",
    fontWeight: "800",
  },

  sub: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: "15px",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  passwordBox: {
    position: "relative",
    marginBottom: "12px",
  },

  show: {
    position: "absolute",
    right: "10px",
    top: "10px",
    cursor: "pointer",
    color: "#2563eb",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default UserForm;