import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import RotatingText from "../Components/RotText2/RotText";
import "./HomeCSS/Hero.css";

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <section ref={heroRef} className="hero">
<div className="hero-content">
        <h1 ref={titleRef} className="hero-title">
          <span className="money">Money</span>
          <RotatingText
            text={[
              "Matters", 
              "Compounds",  // New - Investment focused
              "Works", 
              "Multiplies", // New - Growth focused
              "Secures", 
              "Empowers",   // New - Emotion focused
              "Builds",      // New - Future focused
              "Moves"
            ]}
          />
        </h1>
      </div>
    </section>
  );
}