"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ShieldCheck, User, Menu, X, Sun, Moon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 130, damping: 20 },
  },
};

const logoVariants = {
  hover: { scale: 1.1, rotate: 5 },
  tap: { scale: 0.95 },
};

const underlineVariants = {
  rest: { scaleX: 0, opacity: 0, originX: 0.5 },
  hover: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const isDark = document.documentElement.classList.contains("dark");

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Find Vaccine", path: "/find-vaccine" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop & Mobile Navbar */}
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg"
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-3.5">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            whileHover="hover"
            whileTap="tap"
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <ShieldCheck className="w-9 h-9 text-emerald-600 dark:text-emerald-400 drop-shadow-md" />
            <motion.span
              className="font-black text-2xl tracking-tighter bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0%", "100%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Vax
              <span className="text-amber-500 dark:text-amber-400">Track</span>
            </motion.span>
          </motion.div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-8 font-semibold text-slate-700 dark:text-slate-200">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <motion.li
                  key={item.name}
                  className="relative"
                  whileHover="hover"
                  initial="rest"
                  animate={active ? "hover" : "rest"}
                >
                  <Link
                    to={item.path}
                    className={`relative block px-3 py-2 transition-colors ${
                      active
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "hover:text-emerald-600 dark:hover:text-emerald-400"
                    }`}
                  >
                    {item.name}
                  </Link>
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                    variants={underlineVariants}
                  />
                </motion.li>
              );
            })}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Auth Button */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              {user ? (
                <Link
                  to="/profile"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 rounded-full shadow-md text-white font-medium text-sm hover:shadow-lg transition-all"
                >
                  <User className="w-4 h-4" />
                  {user.name?.split(" ")[0] || "Profile"}
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 rounded-full shadow-md text-white font-medium text-sm hover:shadow-lg transition-all"
                >
                  <User className="w-4 h-4" />
                  Login
                </Link>
              )}
            </motion.div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
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
                <span className="font-black text-xl bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                  VaxTrack
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-slate-700 dark:text-slate-300" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-between p-6">
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between py-3 px-2 rounded-lg text-lg font-medium transition-all ${
                        active
                          ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                          : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span>{item.name}</span>
                      {active && (
                        <motion.div
                          layoutId="mobile-active-indicator"
                          className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-8">
                {user ? (
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3.5 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <User className="w-5 h-5" />
                    {user.name }
                  </Link>
                ) : (
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3.5 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <User className="w-5 h-5" />
                    Login / Register
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
