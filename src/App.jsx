import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Apps from "./pages/Apps";
import AppDetails from "./pages/AppDetails";
import Installation from "./pages/Installation";
import Error404 from "./pages/Error404";
import LoadingOverlay from "./components/LoadingOverlay";

function App() {
  return (
    <div className="font-sans">
      {/* Global route-change loader */}
      <LoadingOverlay />

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="Hero.IO Logo" className="h-6 w-6" />
          <span className="text-2xl font-bold text-indigo-600">HERO.IO</span>
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <Link to="/apps" className="hover:text-indigo-600">Apps</Link>
          <Link to="/installation" className="hover:text-indigo-600">Installation</Link>
        </div>
        <a
          href="https://github.com/ovijit96"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition inline-flex items-center gap-2"
        >
          <img src="/assets/git.png" className="h-4 w-4 invert" alt="" />
          Contribute
        </a>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/apps/:id" element={<AppDetails />} />
        <Route path="/installation" element={<Installation />} />
        {/* 404 fallback */}
        <Route path="*" element={<Error404 />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-10">
        <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
      </footer>
    </div>
  );
}

export default App;
