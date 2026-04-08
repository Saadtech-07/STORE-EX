import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

function ProductDetails({ product: propProduct, products, cart, reviews, setReviews, onAddToCart }) {
  const location = useLocation();
  const { id } = useParams();
  const productId = propProduct ? propProduct.id : Number(id);
  const product = propProduct || products.find(p => p.id === productId);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [rating, setRating] = useState(0);
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const productReviews = reviews[productId] || [];
  const [mode, setMode] = useState("read");
  const [qty, setQty] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const cartItem = (cart || []).find(
    (item) => item.id === product?.id
  );

  const qtyInCart = cartItem ? cartItem.qty : 0;
  const availableStock = product?.stock ?? 0;

  useEffect(() => {
    if (qty > availableStock) {
      setQty(availableStock || 1);
    }
  }, [availableStock]);

  const handleSubmit = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!rating || !username.trim() || text.trim() === "") {
      setError("All fields required ❌");
      return;
    }

    const newReview = { rating, username, text };

    setReviews(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), newReview]
    }));

    setRating(0);
    setText("");
    setError("");
  };

  const avgRating =
    productReviews.length > 0
      ? (
          productReviews.reduce((acc, r) => acc + r.rating, 0) /
          productReviews.length
        ).toFixed(1)
      : 0;

  if (!product) {
    return (
      <div className="p-5 max-w-[700px] mx-auto text-center text-gray-700 dark:text-gray-200">
        {products.length === 0 ? (
          <>
            <p className="text-xl font-semibold mb-3">Loading product details...</p>
            <p className="text-sm">Please wait while we fetch the product information.</p>
          </>
        ) : (
          <>
            <p className="text-xl font-semibold mb-3">Product not found</p>
            <p className="text-sm">The item you are looking for does not exist or may have been removed.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="w-full px-8 py-8 bg-white dark:bg-slate-900">

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_auto] gap-10">


        <div className="flex justify-center items-start">
          <div className="overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-700 h-[420px] w-full max-w-[560px] flex items-center justify-center p-6">
            <img
              src={product.image || product.thumbnail}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        <div>

          <h1 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
            {product.title}
          </h1>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold dark:text-white">{avgRating}</span>
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-500">
              ({productReviews.length} reviews)
            </span>
          </div>

          <hr className="my-3 border-gray-300 dark:border-slate-700" />

          <p className="text-3xl text-orange-600 font-bold mb-2">
            ₹{product.price}
          </p>

          <p className="text-green-600 text-sm mb-4">
            In Stock ({availableStock})
          </p>

          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            <p>✔ Free Delivery Available</p>
            <p>✔ 7 Days Replacement Policy</p>
          </div>

          <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>High-quality build with durable materials</li>
            <li>Advanced performance for smooth usage</li>
            <li>Energy-efficient design</li>
            <li>Compact and lightweight</li>
            <li>Compatible with multiple devices</li>
            <li>Protection against overheating</li>
            <li>Reliable everyday performance</li>
          </ul>

        </div>

        <div className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md h-fit max-w-[280px] w-full ml-auto">

          <p className="text-2xl font-bold mb-2 dark:text-white">
            ₹{product.price}
          </p>

          <p className="text-green-600 text-sm mb-3">
            Delivery by Monday - Tuesday
          </p>

          <div className="mb-4">
            <label className="text-sm mr-2 dark:text-white">Qty:</label>

            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="p-1 border rounded"
            >
              {[...Array(availableStock)].map((_, i) => {
                const q = i + 1;
                return (
                  <option key={q} value={q}>
                    {q}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            disabled={availableStock === 0}
            className={`w-full py-2 rounded mb-2 font-medium shadow
              ${availableStock === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-400 hover:bg-green-500 text-black"
              }`}
            onClick={() => {
              if (!isAuthenticated) {
                navigate("/login", { state: { from: location.pathname } });
                return;
              }

              onAddToCart({
                id: product.id,
                name: product.title,
                price: product.price,
                image: product.thumbnail,
                qty: Number(qty)
              });

              navigate("/cart");
            }}
          >
            Add to Cart
          </button>

          <button
            disabled={availableStock === 0}
            className={`w-full py-2 rounded font-medium shadow
              ${availableStock === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            onClick={() => {
              if (!isAuthenticated) {
                navigate("/login", { state: { from: location.pathname } });
                return;
              }

              onAddToCart({
                id: product.id,
                name: product.title,
                price: product.price,
                image: product.thumbnail,
              });

              navigate("/cart");
            }}
          >
            Buy Now
          </button>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            <p>🔒 <span className="text-blue-600">Secure transaction</span></p>
            <p><b>Ships from:</b> STORE-EX</p>
            <p><b>Sold by:</b> STORE-EX</p>
            <p className="text-blue-600">
              Eligible for Return, Refund or Replacement <br />
              within 7 days
            </p>
          </div>

        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 dark:border-slate-700 pt-4">

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl font-bold dark:text-white">{avgRating}</span>
          <span className="text-yellow-500">★</span>
          <span className="text-sm text-gray-500">
            ({productReviews.length} reviews)
          </span>
        </div>

        <div className="flex gap-3 mb-3">
          <button
            className={`px-4 py-1.5 rounded border text-sm
              ${mode === "read"
                ? "bg-green-500 text-white border-green-500"
                : "bg-gray-200 dark:bg-slate-700"
              }`}
            onClick={() => setMode("read")}
          >
            Read Reviews
          </button>

          <button
            className={`px-4 py-1.5 rounded text-sm
              ${mode === "write"
                ? "bg-green-500 text-white"
                : "bg-gray-200 dark:bg-slate-700"
              }`}
            onClick={() => {
              if (!isAuthenticated) {
                navigate("/login");
                return;
              }
              setMode("write");
            }}
          >
            Write Review
          </button>
        </div>

        {mode === "write" ? (
          <div className="space-y-3">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(n => (
                <span key={n} onClick={() => setRating(n)} className={`cursor-pointer ${n <= rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
              ))}
            </div>

            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Your name" className="w-full p-2 border rounded" />
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Write review..." className="w-full p-2 border rounded" />

            <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-1 rounded">
              Submit
            </button>
          </div>
        ) : (
          <div>
            {productReviews.length === 0
              ? <p className="text-gray-500 dark:text-gray-400">No reviews yet! Be the first to review this product!</p>
              : productReviews.map((r,i)=>(
                <div key={i} className="p-2 bg-gray-100 dark:bg-slate-700 rounded mt-2 flex justify-between">
                  <div>
                    <p>{r.username}</p>
                    <p>{r.text}</p>
                  </div>
                  <span>★ {r.rating}</span>
                </div>
              ))
            }
          </div> 
        )}
      </div>

    </div>
  );
}

export default ProductDetails;