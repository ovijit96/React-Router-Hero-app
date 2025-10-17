import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const linkCls = ({ isActive }) =>
    [
      "px-3 py-2 text-sm font-medium rounded-xl transition",
      isActive
        ? "text-indigo-700 bg-indigo-50"
        : "text-slate-600 hover:text-slate-900",
    ].join(" ");

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md border-b border-slate-200/70 bg-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          HERO.IO
        </Link>

        <div className="flex items-center gap-1">
          <NavLink to="/" end className={linkCls}>Home</NavLink>
          <NavLink to="/apps" className={linkCls}>Apps</NavLink>
          <NavLink to="/installation" className={linkCls}>Installation</NavLink>
        </div>

        <a
          href="#"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
        >
          <img
            src="/assets/git.png"         
            alt="GitHub Icon"
            className="h-6 w-6 bg-white rounded-2xl"
          />
          Contribute
        </a>
      </div>
    </nav>
  );
}
