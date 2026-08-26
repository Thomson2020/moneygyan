import React, { useState, useRef, useEffect } from "react";
import { 
  FaApple, 
  FaGooglePlay, 
  FaShieldAlt, 
  FaBolt, 
  FaChartLine,
  FaArrowUp
} from "react-icons/fa";
import "./HomeCSS/AppShowcase.css";
import { cn } from "@/lib/utils";

export default function AppShowcase() {
  const phoneRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg)"
  );

  // Array of 5 app screenshots located in the public/ folder
  const screenshots = [
    "/mgapp2.png",
    "/mgapp4.png",
    "/mgapp.png",
    "/mgapp3.png",
    "/mgapp5.png",
    "/mgapp6.png",
    "/mgapp7.png"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically switch image every 3 seconds with swipe effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [screenshots.length]);

  // 3D Mouse Tilt Tracking Math
  const handleMouseMove = (e) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const rotateX = (y / (rect.height / 2)) * -14;
    const rotateY = (x / (rect.width / 2)) * 14;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`
    );
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  const features = [
    {
      icon: <FaBolt />,
      title: "Real-Time Portfolio Sync",
      desc: "Track SIPs, mutual funds, and NAV updates instantly with zero latency.",
    },
    {
      icon: <FaChartLine />,
      title: "Smart Analytics & Alerts",
      desc: "Get AI-driven insights on portfolio rebalancing and goal tracking.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Bank-Grade Security",
      desc: "256-bit encryption with SEBI-compliant infrastructure & biometric auth.",
    },
  ];

  return (
    <section className="app-showcase-section">
      <div className={cn('ambient-glow', 'glow-cyan')}></div>
      <div className={cn('ambient-glow', 'glow-purple')}></div>

      <div className="app-showcase-container">
        
        {/* LEFT COLUMN */}
        <div className="app-content-col">
          <div className="app-pill-badge">
            <span className="live-dot"></span>
            Next-Gen Wealth App
          </div>

          <h2 className="app-title">
            Your Financial Future, <br />
            <span>In Your Pocket.</span>
          </h2>

          <p className="app-subtitle">
            Say goodbye to clunky spreadsheets and outdated dashboards. Experience seamless mutual fund execution, instant XIRR tracking, and complete control over your wealth—anytime, anywhere.
          </p>

          <div className="app-feature-grid">
            {features.map((item, index) => (
              <div className="feature-card-appshowcase" key={index}>
                <div className="feature-icon-wrapper">{item.icon}</div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="store-buttons-group">
            <button className="modern-store-btn">
              <FaApple className="store-icon" />
              <div className="store-text">
                <span>Download on the</span>
                <strong>App Store</strong>
              </div>
            </button>

            <button className="modern-store-btn">
              <FaGooglePlay className="store-icon" />
              <div className="store-text">
                <span>GET IT ON</span>
                <strong>Google Play</strong>
              </div>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Phone Mockup with Swipe Track */}
        <div 
          className="app-visual-col"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className={cn('floating-widget', 'widget-top-left')}>
            <div className={cn('widget-icon', 'success')}>
              <FaArrowUp />
            </div>
            <div className="widget-info">
              <span>SIP Executed</span>
              <strong>+₹ 15,000.00</strong>
            </div>
          </div>

          <div 
            ref={phoneRef}
            className="phone-mockup-frame"
            style={{ transform: transformStyle }}
          >
            <div className="phone-notch"></div>
            
            {/* Sliding Track for horizontal swipe animation */}
            <div 
              className="phone-slider-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {screenshots.map((src, index) => (
                <img 
                  key={index}
                  src={src} 
                  alt={`MoneyGYAN Mobile App Screen ${index + 1}`} 
                  className="phone-screenshot-img"
                />
              ))}
            </div>
          </div>

          <div className={cn('floating-widget', 'widget-bottom-right')}>
            <span className="widget-sub">Total Returns</span>
            <strong>+₹ 3,42,800</strong>
            <span className="widget-tag">All-Time High 🔥</span>
          </div>
        </div>

      </div>
    </section>
  );
}