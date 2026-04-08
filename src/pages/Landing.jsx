import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.jpg";

function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="w-full grid grid-cols-3 items-center px-6 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div />

        <h1 className="text-center text-2xl font-extrabold">
          STORE-EX
        </h1>
      </div>
      <div
        className="w-full h-[calc(100vh-70px)] bg-cover bg-right flex items-center"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="w-full h-full flex items-center pl-16 bg-black/30">
          
          <div className="max-w-[500px] text-white">
            
            <h1 className="text-[52px] font-extrabold leading-tight">
              <span className="text-black-500">Sale 20% Off</span><br />
              On Everything
            </h1>

            <p className="mt-2">
              Discover amazing products at unbeatable prices.
              Shop now and enjoy exclusive offers.
            </p>

            <button
              className="mt-5 px-7 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
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