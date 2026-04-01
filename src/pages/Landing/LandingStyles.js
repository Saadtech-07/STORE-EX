const styles = {
header: {
width: "100%",
display: "grid",
gridTemplateColumns: "1fr auto 1fr",
alignItems: "center",
padding: "18px 30px",
background: "linear-gradient(90deg, #0f172a, #1e293b)",
color: "#fff"
},

logoCenter: {
textAlign: "center",
fontSize: "26px",
fontWeight: "800"
},

right: {
display: "flex",
justifyContent: "flex-end"
},

signIn: {
cursor: "pointer"
},

/* HERO SECTION */
hero: {
marginTop: 0,
height: "calc(100vh - 70px)",
width: "100%",
backgroundSize: "cover",             // ✅ full width
backgroundPosition: "right center",  // ✅ keeps image natural
backgroundRepeat: "no-repeat",
display: "flex",
alignItems: "center"
},

overlay: {
width: "100%",
height: "100%",
display: "flex",
alignItems: "center",
paddingLeft: "60px"
},

content: {
maxWidth: "500px",
color: "#fff"
},

title: {
fontSize: "52px",
fontWeight: "800",
lineHeight: "1.2"
},

highlight: {
color: "#ff4d4f"
},

desc: {
marginTop: "10px"
},

button: {
marginTop: "20px",
padding: "14px 28px",
background: "#ff4d4f",
color: "#fff",
border: "none",
borderRadius: "6px",
cursor: "pointer"
}
};

export default styles;
