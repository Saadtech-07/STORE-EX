function Footer() {
  return (
    <footer className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white px-5 py-10 ">

      <div className="max-w-[1200px] mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">

        <div>
          <h2 className="text-2xl font-extrabold mb-3">
            STORE-EX
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Discover premium products with the best deals.
            Shop smarter, faster, and better.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-3">Shop</h3>
          <p className="text-sm text-slate-300 mb-2 cursor-pointer hover:text-white">All Products</p>
          <p className="text-sm text-slate-300 mb-2 cursor-pointer hover:text-white">New Arrivals</p>
          <p className="text-sm text-slate-300 mb-2 cursor-pointer hover:text-white">Best Sellers</p>
          <p className="text-sm text-slate-300 mb-2 cursor-pointer hover:text-white">Offers</p>
        </div>

  
        <div>
          <h3 className="text-base font-semibold mb-3">Support</h3>
          <p className="text-sm text-slate-300 mb-2 cursor-pointer hover:text-white">Help Center</p>
          <p className="text-sm text-slate-300 mb-2 cursor-pointer hover:text-white">Returns</p>
          <p className="text-sm text-slate-300 mb-2 cursor-pointer hover:text-white">Shipping</p>
          <p className="text-sm text-slate-300 mb-2 cursor-pointer hover:text-white">Track Order</p>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-3">Contact</h3>
          <p className="text-sm text-slate-300 mb-2">📍 Chennai, India</p>
          <p className="text-sm text-slate-300 mb-2">📧 support@storeex.com</p>
          <p className="text-sm text-slate-300 mb-2">📞 +91 98765 43210</p>
        </div>

      </div>

      <div className="mt-8 pt-4 border-t border-white/10 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} STORE-EX. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;