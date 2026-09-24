import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Moon, Sun } from "lucide-react";
import "./HomeCSS/Header.css";
import { cn } from "@/lib/utils";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const urlTheme = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("theme") : null;
    const savedTheme = urlTheme || localStorage.getItem("theme") || "dark";
    
    if (savedTheme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.classList.add("light");
      document.body.setAttribute("data-theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.classList.remove("light");
      document.body.setAttribute("data-theme", "dark");
      setIsDark(true);
    }
  }, []);

  const handleThemeToggle = () => {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.classList.add("light");
      document.body.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.classList.remove("light");
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

useEffect(() => {
  if (menuOpen) {
    document.body.classList.add('menu-open');
  } else {
    document.body.classList.remove('menu-open');
  }
  return () => document.body.classList.remove('menu-open');
}, [menuOpen]);

  const menuOpenRef = useRef(false);
  menuOpenRef.current = menuOpen;

  const backdropRef = useRef(null);
  const cardRef = useRef(null);
  const linksRef = useRef([]);
  const contactsRef = useRef(null);
  const timeline = useRef();

  const items = [
    { label: "Home", link: "/" },
    { label: "Partners", link: "/partners" },
    { label: "About Us", link: "/about" },
    { label: "Contacts", link: "/contact" },
    { label: "Learn", link: "/learn" },
    { label: "FAQ", link: "/faqpage"},
    { label: "Disclosure", link: "/disclosure"}
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(backdropRef.current, {
        autoAlpha: 0,
        pointerEvents: "none",
      });

      timeline.current = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
          setHeaderHidden(false);
        },
      });

      timeline.current
        .to(backdropRef.current, {
          autoAlpha: 1,
          pointerEvents: "auto",
          duration: 0.35,
          ease: "power2.out",
        })
        .from(
          cardRef.current,
          {
            y: -10,
            scale: 0.97,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          "<0.05"
        )
        .from(
          linksRef.current,
          {
            y: 8,
            opacity: 0,
            stagger: 0.02,
            duration: 0.24,
            ease: "power2.out",
          },
          "-=0.18"
        )
        .from(
          contactsRef.current,
          {
            opacity: 0,
            y: 8,
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.15"
        );
    });

    return () => ctx.revert();
  }, []);

  const toggleMenu = () => {
    if (!timeline.current) return;

    if (menuOpen) {
      setMenuOpen(false);
      timeline.current.timeScale(1.4).reverse();
    } else {
      setMenuOpen(true);
      setHeaderHidden(true);
      timeline.current.timeScale(1).play();
    }
  };

  return (
    <>
      <div className={`progressive-blur ${headerHidden ? "menu-open" : ""}`} aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <header className={`site-header ${headerHidden ? "menu-open" : ""}`}>
        <div className="header-logo">
          <Link to="/" onClick={() => menuOpen && toggleMenu()}>
            <span className="head-money">Money</span><span>GYAN</span>
          </Link>
        </div>
        <div className="header-center-spacer"></div>
        <div className="header-right">
          <a
            href="https://moneygyan.investwell.app/app/#/login"
            target="_blank"
            rel="noopener noreferrer"
            className="card-get-app"
          >
            <span>Sign In</span>
          </a>
          <button
            className={`menu-button ${menuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Menu"
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div ref={backdropRef} className="radiance-backdrop" onClick={toggleMenu}>
        <div ref={cardRef} className="radiance-card" onClick={(e) => e.stopPropagation()}>
          <nav className="radiance-nav">
            {items.map((item, index) => (
              <Link
                key={item.label}
                ref={(el) => (linksRef.current[index] = el)}
                to={item.link}
                className="radiance-link"
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div ref={contactsRef} className="radiance-contacts">
            <div className="radiance-contact-links">
              <a href="mailto:info@moneygyan.com" className="radiance-contact-item">
                info@moneygyan.com
              </a>
            </div>

            <div className="radiance-card-footer">
              <a
                href="https://play.google.com/store/apps/details?id=com.moneygyan.app&hl=en_IN&pli=1"
                target="_blank"
                rel="noopener noreferrer"
                className="card-get-app"
                onClick={toggleMenu}
              >
                <span>Get App</span>
              </a>
              
              {/* SINGLE THEME TOGGLE BUTTON */}
              <button
                type="button"
                onClick={handleThemeToggle}
                className="theme-toggle-btn"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}