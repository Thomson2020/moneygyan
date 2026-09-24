import "./HomeCSS/footer.css";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* =========================================
            TOP SECTION: Brand Info & App Download
        ========================================= */}
        <div className="footer-top">
          
          {/* LEFT: Logo, Tagline & Navigation */}
          <div className="footer-brand">
            <div className="footer-logo">
              <Link to="/">
                <span className="footer-logo-money">Money</span> <span>GYAN</span>
              </Link>
            </div>

            <p className="footer-tagline">
              Moneygyan.com is an AMFI Registered Mutual Fund Distributor. <br />
              ARN-144200 | Initial Reg: 25th April 2018 | Valid Till: 24th April 2027.
            </p>

            <nav className="footer-nav">
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/partners">Partners</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/faqpage">FAQ</Link>
              <Link to="/disclosure">Disclosure</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </nav>
          </div>

{/* RIGHT: Get the App (App Store / Play Store) */}
<div className="app-store-group">
  {/* Apple App Store */}
  <a
    href="https://apps.apple.com/app/your-app-id"
    target="_blank"
    rel="noopener noreferrer"
    className="modern-store-btn"
    aria-label="Download on the App Store"
  >
    <FaApple className="store-icon" />
    <div className="store-text">
      <span>Download on the</span>
      <strong>App Store</strong>
    </div>
  </a>

  {/* Google Play Store */}
  <a
    href="https://play.google.com/store/apps/details?id=com.moneygyan.app&hl=en_IN"
    target="_blank"
    rel="noopener noreferrer"
    className="modern-store-btn"
    aria-label="Get it on Google Play"
  >
    <FaGooglePlay className="store-icon" />
    <div className="store-text">
      <span>GET IT ON</span>
      <strong>Google Play</strong>
    </div>
  </a>
</div>
        </div>

        {/* =========================================
            MIDDLE SECTION: Compliance Disclaimer
        ========================================= */}
        <div className="footer-disclaimer">
          <p>
            {/* <strong>Disclaimer:</strong> Mutual Fund investments are subject to market risks, read all scheme related documents carefully before investing. There is no assurance or guarantee that the objective of any scheme will be achieved. We distribute regular plans only, where we earn trailing commission. */}
            <strong>Disclaimer:</strong> Mutual Funds Investments are subject to market risks and there is no assurance or guarantee that the objective of the Scheme will be achieved. <br /> Past performance of the Sponsor/AMC/Fund or that of any scheme of the fund does not indicate the future performance of the Schemes of the fund. <br /> Please read all scheme related documents carefully before investing.
          </p>
        </div>

        {/* =========================================
            BOTTOM SECTION: Copyright & Socials
        ========================================= */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>© {new Date().getFullYear()} Moneygyan.com. All Rights Reserved.</p>
          </div>

          <div className="social-icons">
            <a href="https://x.com/moneygyan" target="_blank" rel="noreferrer" aria-label="Twitter / X">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/moneygyaan" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/moneygyaan/" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://www.youtube.com/channel/UClaXqdsXU4S1hn_jwvFYDGQ" target="_blank" rel="noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}