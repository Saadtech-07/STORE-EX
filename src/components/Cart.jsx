import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, onIncrease, onDecrease, onRemove }) {
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const delivery = subtotal > 0 ? 50 : 0;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + gst;

  return (
    <div className="max-w-[1100px] mx-auto p-5 text-black dark:text-white">
      <div className="flex items-center justify-between mb-5">
        <span
          className="text-blue-600 dark:text-blue-400 cursor-pointer w-[120px]"
          onClick={() => navigate("/home")}
        >
          ← Back to Home
        </span>

        <div className="flex-1 text-center">
          <h2 className="font-semibold text-xl m-0">Your Cart</h2>
        </div>

        <div className="w-[120px]" />
      </div>
      <div className="flex gap-8 justify-center items-start flex-col lg:flex-row">
        <div className="flex-1">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white dark:bg-slate-800 p-4 rounded-xl mb-4 shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-[110px] h-[100px] object-contain mr-5"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>

                <p className="my-2 flex items-center">
                  <button
                    className="font-bold px-2"
                    onClick={() => onDecrease(item.id)}
                  >
                    -
                  </button>

                  <span className="mx-3 font-semibold">{item.qty}</span>

                  <button
                    className="font-bold px-2"
                    onClick={() => onIncrease(item.id)}
                  >
                    +
                  </button>
                </p>

                <p
                  className="text-red-500 font-medium cursor-pointer"
                  onClick={() => onRemove(item.id)}
                >
                  Remove
                </p>
              </div>

              <div className="font-semibold">
                ₹{item.price * item.qty}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-[300px]">

          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-lg">
            <h3 className="mb-4 font-semibold">ORDER SUMMARY</h3>

            <div className="flex justify-between mb-2">
              <span>Products</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Delivery</span>
              <span>₹{delivery}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>GST (5%)</span>
              <span>₹{gst}</span>
            </div>

            <hr className="my-2 dark:border-gray-600" />

            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              className="mt-4 w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              onClick={() => alert("✅ Order Confirmed!")}
            >
              Proceed to Buy
            </button>
          </div>

          <div className="mt-5 p-4 bg-white dark:bg-slate-800 rounded-xl">
            <h4 className="font-semibold">Need Help?</h4>

            <a href="#" className="block text-blue-600 dark:text-blue-400 mt-2 text-sm">
              Shipping
            </a>
            <a href="#" className="block text-blue-600 dark:text-blue-400 mt-2 text-sm">
              Returns & Exchanges
            </a>
            <a href="#" className="block text-blue-600 dark:text-blue-400 mt-2 text-sm">
              Contact Us
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Cart;