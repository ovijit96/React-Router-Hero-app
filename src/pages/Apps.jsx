import React, { useEffect, useMemo, useState } from "react";

export default function Apps() {
  const [apps, setApps] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const url = (import.meta?.env?.BASE_URL || "/") + "data/trending.json";
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load trending.json");
        return r.json();
      })
      .then(setApps)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

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
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Our All Applications
          </h1>
          <p className="text-slate-500 mt-2">
            Explore All Apps on the Market developed by us. We code for Millions
          </p>
        </div>

        {/* Top row: count + search */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <p className="text-sm sm:text-base font-semibold text-slate-700">
            ({loading ? "…" : filtered.length}) Apps Found
          </p>

          <div className="relative w-full max-w-xs sm:max-w-sm">
            <input
              type="text"
              placeholder="search Apps"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 pr-9 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {/* search icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 21l-4.3-4.3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              </svg>
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {(loading ? Array.from({ length: 12 }) : filtered).map((app, idx) => (
            <article
              key={app?.id ?? `skeleton-${idx}`}
              className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm hover:shadow transition"
            >
              {/* image / placeholder */}
              <div className="rounded-xl bg-slate-200 h-40 sm:h-44 md:h-48 w-full mb-3 overflow-hidden">
                {!loading && app?.image ? (
                  <img
                    src={app.image}
                    alt={app.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : null}
              </div>

              {/* title */}
              <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 min-h-[2.5rem]">
                {loading ? (
                  <span className="inline-block h-4 w-40 bg-slate-200 rounded" />
                ) : (
                  app.title
                )}
              </h3>

              {/* badges */}
              <div className="mt-3 flex items-center justify-between">
                {/* downloads */}
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 text-emerald-600 px-2 py-1 text-xs font-medium">
                  <img
                    src="/assets/icon-downloads.png"
                    alt="Downloads"
                    className="h-4 w-4"
                  />
                  {loading ? "…" : fmtDownloads(app.downloads)}
                </span>

                {/* rating */}
                <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 text-amber-600 px-2 py-1 text-xs font-semibold">
                  <img
                    src="/assets/icon-ratings.png"
                    alt="Ratings"
                    className="h-4 w-4"
                  />
                  {loading ? "…" : Math.round(app.ratingAvg || 0)}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
