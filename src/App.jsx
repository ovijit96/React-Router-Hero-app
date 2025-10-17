import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Apps from "./pages/Apps";
import Installation from "./pages/Installation";

export default function App() {
  return (
    <div className="font-sans">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/installation" element={<Installation />} />
      </Routes>

      <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-10">
        <p>Copyright © 2025 - All right reserved</p>
      </footer>
    </div>
  );
}
