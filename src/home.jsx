import { useEffect } from "react";
import Lenis from "lenis";
import Hero from "./Home/hero";
import More from "./Home/Calculator";
import PartnerProgram from "./Home/partnerprogram";
import ScrollPartners from "./Home/scrollpartner";
import AppShowcase from "./Home/AppShowcase";
import TestimonialsFAQ from "./Home/TestimonialFAQ";
import "./index.css"; // Clean relative import
// import LineWaves from "./Home/LineWaves";

export default function Home() {
  // 1. Lenis Smooth Scrolling (with safe cleanup)
  useEffect(() => {
    const lenis = new Lenis();
    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // 2. Disable Copy / Cut / Right-Click
  useEffect(() => {
    const handleCopyCut = (e) => e.preventDefault();
    const handleContextMenu = (e) => e.preventDefault();

    document.addEventListener("copy", handleCopyCut);
    document.addEventListener("cut", handleCopyCut);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("copy", handleCopyCut);
      document.removeEventListener("cut", handleCopyCut);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <>
    {/* <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
  <LineWaves
    color1="#025ec4"
    color2="#020764"
    color3="#030812"
    speed={0.1}
    rotation={-45}
    brightness={0.2}
  />
</div> */}
    <div className="page-wrapper">
      {/* <div className="aurora" /> */}
      <Hero />
      <More />
      <PartnerProgram />
      <AppShowcase />
      <TestimonialsFAQ />
      <ScrollPartners />
    </div>
    </>
  );
}