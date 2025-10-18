import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// unified storage key
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

export default function Installation() {
  const [installedApps, setInstalledApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const installedIds = getInstalledList();
    fetch("/data/trending.json")
      .then((r) => r.json())
      .then((all) => {
        const matched = all.filter((a) =>
          installedIds.includes(String(a.id))
        );
        setInstalledApps(matched);
      })
      .catch(() => setInstalledApps([]))
      .finally(() => setLoading(false));
  }, []);

  const handleUninstall = (id) => {
    
    const updated = installedApps.filter((a) => String(a.id) !== String(id));
    setInstalledApps(updated);

    
    const list = getInstalledList().filter((x) => x !== String(id));
    setInstalledList(list);

    
    setToast("❌ App uninstalled successfully");
    setTimeout(() => setToast(""), 1800);
  };

  if (loading) {
    return (
      <main className="min-h-[60vh] bg-gray-50 flex items-center justify-center">
        <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm flex items-center gap-3">
          <span className="h-5 w-5 rounded-full border-2 border-slate-300 border-t-indigo-600 animate-spin" />
          <span className="text-sm text-slate-700">Loading…</span>
        </div>
      </main>
    );
  }

  return (
    <section className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Your Installed Apps
          </h1>
          <p className="text-slate-500 mt-2">
            Explore All Trending Apps on the Market developed by us
          </p>
        </div>

        <p className="font-semibold text-slate-700 mb-6">
          {installedApps.length} Apps Found
        </p>

        {installedApps.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-600 mb-4">No installed apps found.</p>
            <Link
              to="/apps"
              className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
            >
              Browse Apps
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {installedApps.map((app) => (
              <div
                key={app.id}
                className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow transition"
              >
                {/* leftside : image + info */}
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-lg bg-slate-100 overflow-hidden flex items-center justify-center">
                    {app.image ? (
                      <img
                        src={app.image}
                        alt={app.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-slate-400 text-xs">No image</div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-800 text-sm sm:text-base">
                      {app.title}
                    </h2>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-500 mt-1">
                      <span className="text-emerald-600 font-medium flex items-center gap-1">
                        <img
                          src="/assets/icon-downloads.png"
                          alt=""
                          className="h-4 w-4"
                        />
                        {app.downloads >= 1_000_000
                          ? (app.downloads / 1_000_000).toFixed(1) + "M"
                          : app.downloads}
                      </span>
                      <span className="text-amber-600 flex items-center gap-1">
                        <img
                          src="/assets/icon-ratings.png"
                          alt=""
                          className="h-4 w-4"
                        />
                        {app.ratingAvg}
                      </span>
                      <span>{app.size} MB</span>
                    </div>
                  </div>
                </div>

                {/* uninstall button */}
                <button
                  onClick={() => handleUninstall(app.id)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm px-4 py-2 rounded-lg"
                >
                  Uninstall
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
            {toast}
          </div>
        </div>
      )}
    </section>
  );
}
