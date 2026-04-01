
import { useNavigate } from "react-router-dom";
import styles from "./LandingStyles";
import hero from "../../assets/hero.jpg";

function Landing() {
const navigate = useNavigate();

return ( <div>
  {/* HEADER */}
  <div style={styles.header}>
    <div></div>

    <h1 style={styles.logoCenter}>STORE-EX</h1>

    <div style={styles.right}>
      <span style={styles.signIn}>Hello, Sign in</span>
    </div>
  </div>

  {/* HERO SECTION */}
  <div
    style={{
      ...styles.hero,
      backgroundImage: `url(${hero})`
    }}
  >
    <div style={styles.overlay}>
      <div style={styles.content}>
        
        <h1 style={styles.title}>
          <span style={styles.highlight}>Sale 20% Off</span><br />
          On Everything
        </h1>

        <p style={styles.desc}>
          Discover amazing products at unbeatable prices.
          Shop now and enjoy exclusive offers.
        </p>

        <button
          style={styles.button}
          onClick={() => navigate("/home")}
        >
          Shop Now
        </button>

      </div>
    </div>
  </div>

</div>

);
}

export default Landing;
