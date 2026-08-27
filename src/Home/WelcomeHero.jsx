import React, { useRef } from "react";
import { gsap } from "gsap";
import LineWaves from "./LineWaves";
import "./HomeCSS/WelcomeHero.css";
import { cn } from "@/lib/utils";
import { playWelcomeTransitionSound } from "@/lib/sound";

export default function WelcomeHero({ onStart, isLight }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);

  const handleStart = () => {
    playWelcomeTransitionSound(0.4);

    const tl = gsap.timeline({
      onComplete: () => {
        if (onStart) onStart();
      },
    });

    tl.to(cardRef.current, {
      scale: 1,
      z: 50,
      opacity: 0,
      filter: "blur(30px)",
      duration: 0.9,
      ease: "power3.inOut",
    }).to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.7,
      },
      "-=0.4"
    );
  };

  return (
    <div
      ref={overlayRef}
      className={cn("vos-hero-container", isLight && "light")}
      style={{
        background: isLight
          ? "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(2, 132, 199, 0.08) 0%, transparent 70%), radial-gradient(ellipse 70% 50% at 90% 85%, rgba(99, 102, 241, 0.06) 0%, transparent 60%), #f8fafc"
          : "var(--bg-primary, #030812)",
        color: isLight ? "#0f172a" : "var(--text-primary, #fff)",
        transition: "background 0.35s ease, color 0.35s ease",
      }}
    >
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
      rotation={-45}
      brightness={isLight ? 0.1 : 0.1}
      edgeFadeWidth={0}
      mouseInfluence={1.5}
      enableMouseInteraction={true}
    />
  </div>
</div>


      <div ref={cardRef} className="vos-center-hero" style={{ position: "relative", zIndex: 1 }}>
        <h1 className="vos-title">
          Money<span>GYAN</span>
        </h1>

        <div className="vos-btn-wrapper" onClick={handleStart}>
          <div className="shape-blur-container"></div>
          <div className="btn-text">
            <span>INVEST</span>
            <span>NOW</span>
          </div>
        </div>
      </div>
    </div>
  );
}