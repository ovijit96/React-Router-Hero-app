import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "./Spinner";


export default function LoadingOverlay() {
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const t = setTimeout(() => setShow(false), 350);
    return () => clearTimeout(t);
  }, [location.pathname]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/10 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl px-4 py-3 flex items-center gap-3">
        <Spinner />
        <span className="text-sm text-slate-700">Loading…</span>
      </div>
    </div>
  );
}
