import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import MenuOverlay from "./MenuOverlay";
import "./SiteHeader.css";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const hamburgerRef = useRef(null);

  const toggleMenu = () => setIsOpen((v) => !v);

  return (
    <>
      <header className="site-header">
        <div className="site-header__row">
          <Link to="/" className="site-header__logo">
            Money<span>GYAN</span>
          </Link>

          <div className="site-header__actions">
            <Link to="/calculators" className="site-header__cta">
              Get App
            </Link>

            <button
              ref={hamburgerRef}
              className={`site-header__hamburger ${isOpen ? "is-open" : ""}`}
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        originRef={hamburgerRef}
      />
    </>
  );
}
