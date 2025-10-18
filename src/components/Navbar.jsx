import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const linkCls = ({ isActive }) =>
    [
      "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl transition",
      isActive
        ? "text-indigo-700 bg-indigo-50"
        : "text-slate-600 hover:text-slate-900",
    ].join(" ");

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md border-b border-slate-200/70 bg-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="Hero Logo" className="h-8 w-auto" />
          <span className="text-2xl font-bold text-indigo-600">HERO.IO</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          <NavLink to="/" end className={linkCls}>
            <img src="/assets/home.png" alt="Home" className="h-4 w-4" />
            Home
          </NavLink>
          <NavLink to="/apps" className={linkCls}>
            <img src="/assets/apps.png" alt="Apps" className="h-4 w-4" />
            Apps
          </NavLink>
          <NavLink to="/installation" className={linkCls}>
            <img
              src="/assets/installation.png"
              alt="Installation"
              className="h-4 w-4"
            />
            Installation
          </NavLink>
        </div>

        {/* GitHub Button */}
        <a
          href="https://github.com/ovijit96"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
        >
          <img
            src="/assets/git.png"
            alt="GitHub Icon"
            className="h-5 w-5 invert"
          />
          Contribute
        </a>
      </div>
    </nav>
  );
}
