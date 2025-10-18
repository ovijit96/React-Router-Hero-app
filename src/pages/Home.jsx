import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/trending.json")
      .then((res) => res.json())
      .then((data) => setApps(data.slice(0, 6))) 
      .catch(() => console.error("Failed to load apps"))
      .finally(() => setLoading(false));
  }, []);

  const formatCount = (n) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n;
  };

  return (
    <main className="bg-gray-50 text-gray-900">
      {/* hero section */}
      <section className="text-center py-14 px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          We Build{" "}
          <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
            Productive
          </span>{" "}
          Apps
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto mt-4 mb-8 text-sm sm:text-base">
          At <strong>HERO.IO</strong>, we craft innovative apps designed to make
          everyday life simpler, smarter, and more exciting. <br />Our goal is to turn
          your ideas into digital experiences that truly make an impact.
        </p>

        {/* app and google play btn*/}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          <a
  href="https://play.google.com/store/apps"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 border border-gray-300 bg-white rounded-lg px-3 py-2 hover:bg-gray-50 transition"
>
  <img src="/assets/google-play-icon.png" alt="Google Play" className="h-5 w-5" />
  <span className="text-sm sm:text-base">Google Play</span>
</a>

          <a
  href="https://www.apple.com/app-store/"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 border border-gray-300 bg-white rounded-lg px-3 py-2 hover:bg-gray-50 transition"
>
  <img src="/assets/app-store-icon.png" alt="App Store" className="h-5 w-5" />
  <span className="text-sm sm:text-base">App Store</span>
</a>

        </div>

        {/* hero image */}
        <div className="flex justify-center ">
  <div className="w-full max-w-[600px] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[900px] rounded-3xl overflow-hidden shadow-2xl">
    <img
      src="/assets/hero.png"
      alt="App Preview"
      className="w-full h-full object-cover"
    />
  </div>
</div>

      </section>

      {/* status section*/}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-12">
        <div className="text-center">
          <h2 className="text-6xl sm:text-3xl font-bold mb-5">
            Trusted By Millions, Built For You
          </h2>
          <div className="flex flex-wrap justify-center gap-12">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold">29.6M</p>
              <p>Total Downloads</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold">906K</p>
              <p>Total Reviews</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold">132+</p>
              <p>Active Apps</p>
            </div>
          </div>
        </div>
      </section>

      {/* trending apps sections */}
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Trending Apps
            </h3>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Explore All Trending Apps on the Market developed by us
            </p>
          </div>

          {/* Grid 3x2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(loading ? Array.from({ length: 6 }) : apps).map((app, i) => (
              <div
                key={app?.id ?? i}
                className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm hover:shadow-md transition"
              >
                <div className="h-44 sm:h-48 w-full bg-slate-200 rounded-xl overflow-hidden mb-3">
                  {!loading && app?.image ? (
                    <img
                      src={app.image}
                      alt={app.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : null}
                </div>

                <h4 className="text-sm font-semibold text-slate-800 line-clamp-2 min-h-[2.5rem]">
                  {loading ? (
                    <span className="inline-block h-4 w-40 bg-slate-200 rounded" />
                  ) : (
                    app.title
                  )}
                </h4>

                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 text-emerald-600 px-2 py-1 text-xs font-medium">
                    <img
                      src="/assets/icon-downloads.png"
                      alt=""
                      className="h-4 w-4"
                    />
                    {loading ? "…" : formatCount(app.downloads)}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 text-amber-600 px-2 py-1 text-xs font-semibold">
                    <img
                      src="/assets/icon-ratings.png"
                      alt=""
                      className="h-4 w-4"
                    />
                    {loading ? "…" : Number(app.ratingAvg || 0).toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Show All Button */}
          <div className="text-center mt-8">
            <Link
              to="/apps"
              className="inline-block bg-indigo-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Show All
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
