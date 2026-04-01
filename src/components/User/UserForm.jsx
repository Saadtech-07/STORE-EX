import { useState } from "react";
import styles from "./UserFormStyles";

function UserForm({ onClose }) {
const [formData, setFormData] = useState({
name: "",
email: "",
password: "",
});

const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
e.preventDefault();
console.log(formData);
alert("Login Successful ✅");
onClose(); // 🔥 CLOSE MODAL
};

return ( <div style={styles.overlay}> <div style={styles.sidePanel}>

    <span style={styles.close} onClick={onClose}>
      ✕
    </span>

    <h2 style={styles.heading}>Login</h2>

    <input
      name="name"
      placeholder="Name"
      onChange={handleChange}
      style={styles.input}
    />

    <input
      name="email"
      placeholder="Email"
      onChange={handleChange}
      style={styles.input}
    />

    <input
      type="password"
      name="password"
      placeholder="Password"
      onChange={handleChange}
      style={styles.input}
    />

    <button style={styles.loginBtn} onClick={handleSubmit}>
      Login
    </button>

    <p style={styles.signup}>
      New User? <span style={styles.link}>Sign Up</span>
    </p>

  </div>
</div>


);
}

export default UserForm;
