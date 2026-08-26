import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ScrollToTop from "./Home/scrtotop";
import Header from "./Home/header";
import Footer from "./Home/footer";
import Home from "./home";
import About from "./AboutUs/about";
import Contact from "./Contact/contact";
import Partners from "./Partners/partners";
import Terms from "./Terms/terms";
import FAQpage from "./FAQ/faqpage";
import Disclosure from "./Disclosure/disclosure";
import Privacy from "./Privacy/privacy";
import { cn } from "@/lib/utils";
import WelcomeHero from "./Home/WelcomeHero";
import LineWaves from "./Home/LineWaves";

function RedirectToHome() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, []);

  return null;
}

export default function App() {
  const [started, setStarted] = useState(false);
  
  // Update this block:
  const [isLight, setIsLight] = useState(() => {
    // 1. Check local storage first
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "light";
    }
    // 2. Fallback to document attributes if nothing is saved
    return (
      document.documentElement.classList.contains("light") || 
      document.documentElement.getAttribute("data-theme") === "light"
    );
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(
        document.documentElement.classList.contains("light") || 
        document.documentElement.getAttribute("data-theme") === "light"
      );
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return () => observer.disconnect();
  }, []);

  // Lock scrolling while the welcome screen is visible
useEffect(() => {
  const html = document.documentElement;
  const body = document.body;

  if (!started) {
    html.classList.add("welcome-locked");
    body.classList.add("welcome-locked");

    window.scrollTo(0, 0);
  } else {
    html.classList.remove("welcome-locked");
    body.classList.remove("welcome-locked");
  }

  return () => {
    html.classList.remove("welcome-locked");
    body.classList.remove("welcome-locked");
  };
}, [started]);

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      
{/* BACKGROUND LINE WAVES */}
<div
  style={{
    position: "fixed",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
    backgroundColor: isLight ? "#ffffff" : "var(--bg-primary)",
    transition: "background-color 0.35s ease",
  }}
>
  <div
    style={{
      width: "100%",
      height: "100%",
      opacity: isLight ? 0.5 : 0.5,
      // mixBlendMode: isLight ? "multiply" : "normal",
    }}
  >
    <LineWaves
      color1={isLight ? "#000000" : "#06b6d4"}
      color2={isLight ? "#838383" : "#8b5cf6"}
      color3={isLight ? "#ffffff" : "#3b82f6"}
      speed={0.1}
      // colorCycleSpeed={5}
      rotation={-45}
      brightness={isLight ? 0.1 : 0.1}
      edgeFadeWidth={0}
      mouseInfluence={1.5}
      enableMouseInteraction={true}
    />
  </div>
</div>

      {!started && <WelcomeHero onStart={() => setStarted(true)} isLight={isLight} />}

      <div className={`main-app-wrapper ${started ? "is-visible" : "is-hidden"}`} style={{ position: "relative", zIndex: 2 }}>
        <BrowserRouter>
          <RedirectToHome />
          <ScrollToTop />
          <Header />

          <main className={cn("min-h-screen relative z-10 bg-transparent transition-colors duration-300")}>
            <Routes>
              <Route path="/"         element={<Home />} />
              <Route path="/about"    element={<About />} />
              <Route path="/contact"  element={<Contact />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/terms"    element={<Terms />} />
              <Route path="/privacy"  element={<Privacy />} />
              <Route path="/disclosure" element={<Disclosure/>}/>
              <Route path="/faqpage" element={<FAQpage/>}/>
            </Routes>
          </main>

          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}