import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { LoadingScreen } from "./components/LoadingScreen";
import { useState, useEffect } from "react";

// Main router component that handles conditional loading
function AppRoutes() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  // Only apply loading state on home route
  const isHomePage = location.pathname === "/";
  
  useEffect(() => {
    // Only apply loading logic on the home page
    if (isHomePage) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3500); // 3.5 seconds total (includes 2.5s fade out time)
      
      return () => clearTimeout(timer);
    } else {
      // Immediately set loading to false for non-home routes
      setLoading(false);
    }
  }, [isHomePage]);

  // Show loading screen only for home page
  if (loading && isHomePage) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;