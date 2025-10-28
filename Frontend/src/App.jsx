// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // For global toasts
import AppRoutes from "./routes/AppRoutes";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">

      {/* ✅ Application Routing */}
      <Router>
        <Routes>
          {/* All role-based & protected routes live in one clean component */}
          <Route path="/*" element={<AppRoutes />} />

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
