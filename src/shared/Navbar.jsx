import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, User, Menu, X } from "lucide-react";

const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 130, damping: 20, delay: 0.05 },
  },
};

const hoverItem = {
  scale: 1.08,
  transition: { type: "spring", stiffness: 350 },
};

const underline = {
  rest: { scaleX: 0, opacity: 0 },
  hover: { scaleX: 1, opacity: 1, transition: { duration: 0.3 } },
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Find Vaccine", path: "/find-vaccine" },
    { name: "VaccineCard", path: "/vaccine-card" },

    { name: "FAQ", path: "/faq" },
  ];

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/50 dark:border-slate-700/50"
      >
        <div className="container mx-auto flex items-center justify-between px-5 py-3.5">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.12, rotate: 4 }}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <ShieldCheck className="w-9 h-9 text-emerald-600 dark:text-emerald-400 drop-shadow-md" />
            <motion.span
              initial={{ color: "#6ee7b7" }}
              animate={{
                color: ["#6ee7b7", "#34d399", "#10b981", "#34d399", "#6ee7b7"],
              }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="font-black text-2xl tracking-tighter"
            >
              Vax
              <span className="text-amber-500 dark:text-amber-400">Track</span>
            </motion.span>
          </motion.div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-9 font-semibold text-slate-800 dark:text-slate-200">
            {menuItems.map((item) => (
              <motion.li
                key={item.name}
                variants={hoverItem}
                whileHover="hover"
                className="relative cursor-pointer group"
              >
                <Link
                  to={item.path}
                  className="relative block px-2 py-1 transition-colors"
                >
                  {item.name}
                </Link>

                <motion.span
                  layoutId="navbar-underline"
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full"
                  initial="rest"
                  variants={underline}
                />
              </motion.li>
            ))}
          </ul>

          {/* Login + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 px-5 py-2.5 rounded-full shadow-lg text-white font-semibold tracking-wide hover:from-emerald-600 hover:to-emerald-700 transition-all"
              >
                <User className="w-5 h-5" />
                Login / Register
              </Link>
            </motion.div>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2 text-slate-800 dark:text-slate-200"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex flex-col bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                <span className="font-black text-xl">
                  Vax<span className="text-amber-500">Track</span>
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="p-2"
              >
                <X className="w-6 h-6 text-slate-700 dark:text-slate-300" />
              </button>
            </div>

            <nav className="flex flex-col p-6 space-y-5 text-lg font-medium text-slate-800 dark:text-slate-200">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {item.name}
                  <motion.span
                    whileHover={{ x: 6 }}
                    className="text-emerald-600 dark:text-emerald-400"
                  >
                    →
                  </motion.span>
                </Link>
              ))}

              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="mt-6 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 rounded-full text-white font-semibold shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all"
              >
                <User className="w-5 h-5" />
                Login / Register
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
