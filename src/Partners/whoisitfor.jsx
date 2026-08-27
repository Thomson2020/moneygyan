import { useEffect, useRef } from "react";
import gsap from "gsap";

const audiences = [
  "Investment Advisors",
  "Insurance Agents",
  "Chartered Accountants",
  "Cost Accountants",
  "Direct Selling Agents (Loans)",
  "Postal & Chit-Fund Agents",
  "Stock Brokers",
  "Retired Bank Managers",
  "Financial Services Professionals Going Independent",
];

export default function Whoisitfor() {
  const trackRef = useRef(null);

  useEffect(() => {
    // gsap.context ensures clean unmounting and avoids React 18 strict mode duplicate bugs
    let ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;
      
      // Continuous seamless infinite loop
      const animation = gsap.to(track, {
        yPercent: -50,
        ease: "none",
        duration: 18,
        repeat: -1,
      });

      // timeScale: 0.2 slows it down to 20% speed instead of completely stopping it (0)
      const handleMouseEnter = () => gsap.to(animation, { timeScale: 0.2, duration: 0.8, ease: "power2.out" });
      const handleMouseLeave = () => gsap.to(animation, { timeScale: 1, duration: 0.8, ease: "power2.inOut" });

      track.addEventListener("mouseenter", handleMouseEnter);
      track.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        track.removeEventListener("mouseenter", handleMouseEnter);
        track.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="audience">
      <div className="audience-container">
        
        {/* Left Side Static Content */}
        <div className="audience-left">
          <span className="audience-eyebrow">— WHO THIS IS FOR</span>
          <h2>You don't need a finance background. You need trust.</h2>
          <p className="audience-lead">
            MoneyGYAN focuses solely on mutual funds — zero insurance push, zero lending products, and zero cross-selling noise. The most successful partners come from relationship-driven professions:
          </p>
        </div>

        {/* Right Side Carousel Window */}
        <div className="audience-right">
          <div className="carousel-viewport">
            <div className="carousel-track" ref={trackRef}>
              <div className="carousel-list">
                {audiences.map((name, i) => (
                  <div key={`orig-${i}`} className="audience-text-item">
                    {name}
                  </div>
                ))}
              </div>

              <div className="carousel-list" aria-hidden="true">
                {audiences.map((name, i) => (
                  <div key={`dup-${i}`} className="audience-text-item">
                    {name}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}