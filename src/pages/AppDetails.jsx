import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AppDetails() {
  const { id } = useParams();

  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // per-app legacy or compect
  const storageKey = `installed_${id}`;
  const [installed, setInstalled] = useState(
    () => localStorage.getItem(storageKey) === "1"
  );
  const [toast, setToast] = useState(false);

  // installapps list
  const LS_KEY_LIST = "installedApps";
  const getInstalledList = () => {
    try {
      const raw = localStorage.getItem(LS_KEY_LIST);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };
  const setInstalledList = (arr) =>
    localStorage.setItem(LS_KEY_LIST, JSON.stringify(arr));

  useEffect(() => {
    setLoading(true);
    fetch("/data/trending.json")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load trending.json");
        return r.json();
      })
      .then((list) => {
        const found = list.find((x) => String(x.id) === String(id));
        setApp(found || null);
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleInstall = () => {
    // legacy flag
    setInstalled(true);
    localStorage.setItem(storageKey, "1");

    //  unified list of ids
    const list = getInstalledList();
    if (!list.includes(String(id))) {
      list.push(String(id));
      setInstalledList(list);
    }

    // toast
    setToast(true);
    setTimeout(() => setToast(false), 1800);
  };

  const fmt = (n) => {
    if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
    return String(n ?? 0);
  };

  // chart data: sort 5 star to 1 star
  const chartData = useMemo(() => {
    if (!app?.ratings) return [];
    return [...app.ratings]
      .map((r) => ({
        name: r.name,
        star: parseInt(String(r.name).trim(), 10) || 0,
        count: Number(r.count) || 0,
      }))
      .sort((a, b) => b.star - a.star);
  }, [app]);

  // ui stats
  if (loading) {
    return (
      <main className="min-h-[60vh] bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
          <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm flex items-center gap-3">
            <span className="h-5 w-5 rounded-full border-2 border-slate-300 border-t-indigo-600 animate-spin" />
            <span className="text-sm text-slate-700">Loading…</span>
          </div>
        </div>
      </main>
    );
  }

  if (err) {
    return (
      <main className="min-h-[60vh] bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-red-600 font-medium mb-4">Error: {err}</p>
          <Link
            to="/apps"
            className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
          >
            Back to Apps
          </Link>
        </div>
      </main>
    );
  }

  if (!app) {
    return (
      <main className="min-h-[60vh] bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="mx-auto w-full max-w-[420px]">
            <img
              src="/assets/404.png"
              alt="Not found"
              className="w-full h-auto object-contain"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-6">
            App not found!
          </h2>
          <p className="text-slate-500 mt-1 mb-6">
            The app you are trying to view is not available.
          </p>
          <Link
            to="/apps"
            className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
          >
            Back to Apps
          </Link>
        </div>
      </main>
    );
  }

  // main viewpoint
  return (
    <section className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* back link */}
        <div className="mb-4">
          <Link to="/apps" className="text-indigo-600 hover:underline text-sm">
            ← Back to Apps
          </Link>
        </div>

        {/* top: image + info */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6">
          <div className="grid md:grid-cols-12 gap-6">
            {/* left image */}
            <div className="md:col-span-3">
              <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
                {app.image ? (
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-slate-400 text-sm">No image</div>
                )}
              </div>
            </div>

            {/* right details */}
            <div className="md:col-span-9">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {app.title}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Developed by{" "}
                <span className="text-indigo-600">{app.companyName}</span>
              </p>

              {/* stats */}
              <div className="mt-4 grid grid-cols-3 gap-4 max-w-lg text-center">
                <div className="rounded-lg bg-emerald-50 p-3">
                  <p className="text-xs text-emerald-700">Downloads</p>
                  <p className="text-xl font-extrabold text-emerald-700">
                    {fmt(app.downloads)}
                  </p>
                </div>
                <div className="rounded-lg bg-amber-50 p-3">
                  <p className="text-xs text-amber-700">Average Ratings</p>
                  <p className="text-xl font-extrabold text-amber-700">
                    {Number(app.ratingAvg ?? 0).toFixed(1)}
                  </p>
                </div>
                <div className="rounded-lg bg-indigo-50 p-3">
                  <p className="text-xs text-indigo-700">Total Reviews</p>
                  <p className="text-xl font-extrabold text-indigo-700">
                    {fmt(app.reviews)}
                  </p>
                </div>
              </div>

              {/* install button */}
              <div className="mt-5">
                <button
                  onClick={handleInstall}
                  disabled={installed}
                  className={`px-4 py-2 rounded-lg text-white text-sm transition ${
                    installed
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {installed ? "Installed" : `Install Now (${fmt(app.size)} MB)`}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ratings chart */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-5 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Ratings</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 8, right: 16, left: 16, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={50}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 6, 6]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* description */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-5 md:p-6">
          <h2 className="text-lg font-semibold mb-3">Description</h2>
          {Array.isArray(app.description) ? (
            app.description.map((p, idx) => (
              <p key={idx} className="text-slate-700 mb-4 leading-7">
                {p}
              </p>
            ))
          ) : (
            <p className="text-slate-700 leading-7">
              {app.description || "No description provided for this app."}
            </p>
          )}
        </div>
      </div>

      {/* success toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
            ✅ App installed successfully
          </div>
        </div>
      )}
    </section>
  );
}
