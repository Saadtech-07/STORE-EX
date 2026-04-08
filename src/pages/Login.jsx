import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import loginImg from "../assets/iphone.jpg";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation(); 
  const { login } = useAuth();

  const from = location.state?.from || "/home"; 

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 px-4">

      <div className="w-full max-w-5xl bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">

        {/* LEFT */}
        <div className="relative hidden md:flex items-center justify-center">
          <img
            src={loginImg}
            alt="login visual"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="relative z-10 text-white p-8">
            <h2 className="text-3xl font-extrabold leading-snug text-black dark:text-white">
              Power Your iPhone <br /> Upgrade Everything Around It.
            </h2>
            <p className="mt-4 font-semibold text-black dark:text-white">
              Discover premium accessories crafted for performance and style.
            </p>
          </div>
        </div>

        <div className="p-8 text-black dark:text-white">

          <h2 className="text-2xl font-bold mb-2">
            Welcome Back!
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Please login to your account
          </p>

          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-700"
          />

          <input
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-700"
          />

          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 text-black dark:text-white"
            type="password"
          />

          <button
            className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
            onClick={() => {
              if (!name || !email || !password) {
                alert("Please enter all fields");
                return;
              }

              login(name, email);
              window.location.href = "/home";
            }}
          >
            Login
          </button>


          <div className="my-6 flex items-center gap-3 text-gray-400 text-sm">
            <hr className="flex-1 border-gray-300 dark:border-slate-600" />
            Or login with
            <hr className="flex-1 border-gray-300 dark:border-slate-600" />
          </div>


          <div className="flex gap-3">
            <button className="flex-1 border border-gray-300 dark:border-slate-600 py-2 rounded-lg">
              Google
            </button>
            <button className="flex-1 border border-gray-300 dark:border-slate-600 py-2 rounded-lg">
              Facebook
            </button>
          </div>


          <p className="text-sm mt-6 text-center">
            Don't have an account?{" "}
            <span className="text-orange-500 cursor-pointer">
              Signup
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;