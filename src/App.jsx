import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { LoadingScreen } from "./components/LoadingScreen";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time and then hide the loading screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500); // 3.5 seconds total (includes 2.5s fade out time)
    
    return () => clearTimeout(timer);
  }, []);

  // Only render the loading screen while loading is true
  if (loading) {
    return <LoadingScreen />;
  }

  // Only render the main content after loading is complete
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;