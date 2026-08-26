import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "./MenuOverlay.css";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function MenuOverlay({ isOpen, onClose, originRef }) {
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const footerRef = useRef(null);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("moneygyan-theme");
    const systemPrefersLight = window.matchMedia?.(
      "(prefers-color-scheme: light)"
    ).matches;
    const initial = saved || (systemPrefersLight ? "light" : "dark");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("moneygyan-theme", next);
  };

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    // Lock page scroll while menu is open
    document.body.style.overflow = isOpen ? "hidden" : "";

    if (isOpen) {
      // Work out where the hamburger button is, so the circle grows from there
      const rect = originRef.current?.getBoundingClientRect();
      const originX = rect ? rect.left + rect.width / 2 : window.innerWidth - 60;
      const originY = rect ? rect.top + rect.height / 2 : 40;
      const xPct = (originX / window.innerWidth) * 100;
      const yPct = (originY / window.innerHeight) * 100;

      gsap.set(el, {
        clipPath: `circle(0% at ${xPct}% ${yPct}%)`,
        visibility: "visible",
      });

      gsap.to(el, {
        clipPath: `circle(150% at ${xPct}% ${yPct}%)`,
        duration: 0.9,
        ease: "power4.out",
      });

      gsap.fromTo(
        linksRef.current,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.08,
          delay: 0.35,
        }
      );

      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.65 }
      );
    } else {
      gsap.to(el, {
        clipPath: `circle(0% at 92% 8%)`,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => gsap.set(el, { visibility: "hidden" }),
      });
    }
  }, [isOpen, originRef]);

  return (
    <div className="menu-overlay" ref={overlayRef}>
      <button
        className="menu-overlay__close"
        onClick={onClose}
        aria-label="Close menu"
      >
        <span />
        <span />
      </button>

      <nav className="menu-overlay__links">
        {LINKS.map((link, i) => (
          <Link
            to={link.to}
            key={link.to}
            className="menu-overlay__link"
            ref={(el) => (linksRef.current[i] = el)}
            onClick={onClose}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="menu-overlay__footer" ref={footerRef}>
        <button className="menu-overlay__theme" onClick={toggleTheme}>
          <span>{theme === "dark" ? "🌙" : "☀️"}</span>
          Switch to {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </div>
    </div>
  );
}
