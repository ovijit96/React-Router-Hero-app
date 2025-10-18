import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function Apps() {
  const [apps, setApps] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetch("/data/trending.json")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load trending.json");
        return r.json();
      })
      .then(setApps)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  // search debounce for tiny spinner
  useEffect(() => {
    if (!q) {
      setSearching(false);
      return;
    }
    setSearching(true);
    const t = setTimeout(() => setSearching(false), 250);
    return () => clearTimeout(t);
  }, [q]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return apps;
    return apps.filter(
      (a) =>
        a.title?.toLowerCase().includes(term) ||
        a.companyName?.toLowerCase().includes(term)
    );
  }, [apps, q]);

  const fmtDownloads = (n) => {
    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return `${n}`;
  };

  if (err) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-red-600">Error: {err}</p>
      </div>
    );
  }

  return (
    <section className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Our All Applications
          </h1>
          <p className="text-slate-500 mt-2">
            Explore all apps developed by us — designed for millions.
          </p>
        </div>

        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <p className="text-sm sm:text-base font-semibold text-slate-700">
            ({loading ? "…" : filtered.length}) Apps Found
          </p>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search apps…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 pr-10 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
            {/* search icon / spinner */}
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {searching ? (
                <Spinner className="h-4 w-4" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
            </span>
          </div>
        </div>

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-slate-600 font-medium mb-6">🚫 No App Found</p>
            <button
              onClick={() => setQ("")}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm"
            >
              Show All Apps
            </button>
          </div>
        )}

        {/* Grid */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {(loading ? Array.from({ length: 12 }) : filtered).map((app, idx) => (
              <article
                key={app?.id ?? `skeleton-${idx}`}
                className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm hover:shadow transition"
              >
                <Link to={`/apps/${app.id}`}>
                  <div className="rounded-xl bg-slate-200 h-40 sm:h-44 md:h-48 w-full mb-3 overflow-hidden">
                    {!loading && app?.image ? (
                      <img
                        src={app.image}
                        alt={app.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                </Link>

                <Link to={`/apps/${app.id}`}>
                  <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 min-h-[2.5rem] hover:text-indigo-600">
                    {loading ? (
                      <span className="inline-block h-4 w-40 bg-slate-200 rounded" />
                    ) : (
                      app.title
                    )}
                  </h3>
                </Link>

                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 text-emerald-600 px-2 py-1 text-xs font-medium">
                    <img src="/assets/icon-downloads.png" alt="" className="h-4 w-4" />
                    {loading ? "…" : fmtDownloads(app.downloads)}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 text-amber-600 px-2 py-1 text-xs font-semibold">
                    <img src="/assets/icon-ratings.png" alt="" className="h-4 w-4" />
                    {loading ? "…" : Math.round(app.ratingAvg || 0)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
