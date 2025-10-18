import React from "react";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <main className="min-h-[70vh] bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
        {/* Illustration */}
        <div className="mx-auto w-full max-w-[520px]">
          <img
            src="/assets/error-404.png"  
            alt="404 not found"
            className="w-full h-auto object-contain"
          />
        </div>

        <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-slate-900">
          Oops, page not found!
        </h1>
        <p className="mt-2 text-slate-500">
          The page you are looking for is not available.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
          >
            Go Back!
          </Link>
        </div>
      </div>
    </main>
  );
}
