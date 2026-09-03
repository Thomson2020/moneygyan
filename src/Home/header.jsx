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
  const getAppRef = useRef(null);

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    
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
          if (getAppRef.current) {
            gsap.to(getAppRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.25,
              pointerEvents: "auto",
              ease: "power2.out",
            });
          }
        },
      });

      timeline.current
        .to(backdropRef.current, {
          autoAlpha: 1,
          pointerEvents: "auto",
          duration: 0.4,
          ease: "power3.out",
        })
        .from(
          cardRef.current,
          {
            y: -4,
            scale: 0.96,
            opacity: 0.1,
            duration: 0.1,
            ease: "power3.out",
          },
          "<"
        )
        .from(
          linksRef.current,
          {
            x: -8,
            opacity: 0,
            stagger: 0.015,
            duration: 0.18,
            ease: "power3.out",
          },
          "-=0.14"
        )
        .from(
          contactsRef.current,
          {
            opacity: 0,
            y: 6,
            duration: 0.16,
            ease: "power3.out",
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
      if (getAppRef.current) {
        gsap.to(getAppRef.current, {
          opacity: 0,
          y: -1,
          duration: 0.5,
          pointerEvents: "none",
          ease: "power2.out",
        });
      }
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
            Money<span>GYAN</span>
          </Link>
        </div>
        <div className="header-center-spacer"></div>
        <div className="header-right">
          <a
            ref={getAppRef}
            href="https://play.google.com/store/apps/details?id=com.moneygyan.app&hl=en_IN&pli=1"
            target="_blank"
            rel="noopener noreferrer"
            className="card-get-app"
          >
            Get App
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
              <a href="mailto:hello@moneygyan.com" className="radiance-contact-item">
                info@moneygyan.com
              </a>
            </div>

            <div className="radiance-card-footer">
              <Link
                to="/signin"
                className="card-get-app"
                onClick={toggleMenu}
              >
                Sign In
              </Link>
              
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