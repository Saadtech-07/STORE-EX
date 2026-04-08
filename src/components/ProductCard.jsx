import { useState, memo } from "react";

function ProductCard({ id, name, price, image, stock, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const availableStock = Number(stock) || 0;

  return (
    <div
      className={`relative bg-white dark:bg-slate-800 text-black dark:text-white p-4 rounded-3xl flex flex-col justify-between h-full cursor-pointer transition duration-200 
      ${hovered ? "-translate-y-1 scale-[1.02] shadow-xl" : "shadow-sm"}`}
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {availableStock === 0 && (
        <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 text-[11px] font-semibold rounded-lg tracking-wide z-10">
          OUT OF STOCK
        </div>
      )}

      <div className="overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-700 h-[220px] flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="max-h-full w-full object-contain"
        />
      </div>

      <div className="mt-4 text-left flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white leading-tight min-h-[3rem]">
            {name}
          </h3>

          <p className="mt-4 text-xl font-bold text-orange-600 dark:text-orange-400">
            ₹{price}
          </p>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
            {availableStock > 0 ? `Stock available: ${availableStock}` : "Currently unavailable"}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 text-left">
          <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-700 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-200">
            View details
          </span>
          <span className={`text-xs font-semibold ${availableStock > 0 ? "text-emerald-600" : "text-red-500"}`}>
            {availableStock > 0 ? "Ready to ship" : "Out of stock"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);