import React, { useState, useRef, useEffect } from "react";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  TrendingUp,
  Briefcase,
  Building2,
  HelpCircle,
  ChevronDown,
  Check,
  UserCheck,
  Calendar,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const userRoles = [
  {
    id: "investor",
    label: "Individual Investor",
    subtext: "SIPs & Wealth Creation",
    icon: TrendingUp,
  },
  {
    id: "partner",
    label: "Prospective Partner",
    subtext: "Mutual Fund Distribution",
    icon: Briefcase,
  },
  {
    id: "corporate",
    label: "Corporate / NRI",
    subtext: "Treasury & Global Portfolios",
    icon: Building2,
  },
  {
    id: "general",
    label: "General Inquiry",
    subtext: "Servicing & Operational Support",
    icon: HelpCircle,
  },
];

export default function ContactHero() {
  const [selectedRole, setSelectedRole] = useState(userRoles[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <section className="contact-hero">
        <div className="contact-heading">
          <span className="contact-tag">— CONTACT US</span>

          <h1>
            Questions about wealth
            <br />
            deserve a clear <span>answer.</span>
          </h1>

          <p className="contact-subtitle">
            Whether you're an investor seeking scheme clarity, a prospective partner
            exploring distribution, or simply have an inquiry, we're here to help.
            We reply to every message within 2 working days.
          </p>
        </div>

        <div className="contact-card">
          {/* LEFT SIDE: Direct Reach */}
          <div className="contact-info">
            <div className="contact-card-header">
              <span className="contact-card-eyebrow">— REACH US DIRECTLY</span>
              <h3>Get in touch</h3>
            </div>

            <div className="contact-info-list">
              <div className="info-item">
                <div className="info-icon-box">
                  <MapPin size={18} />
                </div>
                <div className="info-text">
                  <span className="info-label">REGISTERED OFFICE</span>
                  <p>
                    308, 3rd Floor, Thacker Tower, Sector 17, Vashi, Navi Mumbai - 400703, Maharashtra
                  </p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <Phone size={18} />
                </div>
                <div className="info-text">
                  <span className="info-label">PHONE DESK</span>
                  <a href="tel:+912244544475">022-4454-4475</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <Mail size={18} />
                </div>
                <div className="info-text">
                  <span className="info-label">EMAIL SUPPORT</span>
                  <a href="mailto:info@moneygyan.com">info@moneygyan.com</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <Clock size={18} />
                </div>
                <div className="info-text">
                  <span className="info-label">DESK HOURS</span>
                  <p>Monday – Saturday • 10:00 AM – 7:00 PM</p>
                </div>
              </div>
            </div>

            <div className="contact-social-wrap">
              <span className="social-label">Follow MoneyGYAN</span>
              <div className="contact-social-icons">
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

          {/* RIGHT SIDE: Message Form */}
          <div className="contact-form-side">
            <div className="contact-card-header">
              <span className="contact-card-eyebrow">— SEND A MESSAGE</span>
              <h3>Write to our desk</h3>
            </div>

            <form className="contact-form-body" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row-2">
                <div className="form-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>

                {/* CUSTOM SELECT DROPDOWN */}
                <div className={cn('form-field', 'custom-select-wrapper')} ref={dropdownRef}>
                  <label>I Am An</label>
                  <button
                    type="button"
                    className={`custom-select-trigger ${dropdownOpen ? "is-open" : ""}`}
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    aria-expanded={dropdownOpen}
                  >
                    <div className="select-selected-content">
                      {React.createElement(selectedRole.icon, { size: 16, className: "select-role-icon" })}
                      <span className="select-selected-label">{selectedRole.label}</span>
                    </div>
                    <ChevronDown size={16} className={`select-chevron ${dropdownOpen ? "is-rotated" : ""}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="custom-select-menu">
                      {userRoles.map((role) => {
                        const IconComp = role.icon;
                        const isSelected = selectedRole.id === role.id;
                        return (
                          <button
                            key={role.id}
                            type="button"
                            className={`custom-select-option ${isSelected ? "is-selected" : ""}`}
                            onClick={() => {
                              setSelectedRole(role);
                              setDropdownOpen(false);
                            }}
                          >
                            <div className="option-icon-box">
                              <IconComp size={15} />
                            </div>
                            <div className="option-text">
                              <span className="option-main">{role.label}</span>
                              <span className="option-sub">{role.subtext}</span>
                            </div>
                            {isSelected && <Check size={15} className="option-check" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-field">
                <label>Message</label>
                <textarea
                  rows="4"
                  placeholder="How can we assist you with mutual funds or partnership?"
                  required
                ></textarea>
              </div>

              <div className="form-bottom-bar">
                <button type="submit" className="send-btn">
                  <span>SEND MESSAGE →</span>
                </button>
                <p className="response-time-note">
                  Reply within 2 working days
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 2ND SECTION: QUICK HELP TILES */}
      <section className="quick-help">
        <div className="help-card">
          <div className="help-card-top">
            <div className="help-icon-badge">
              <TrendingUp size={18} />
            </div>
            <span>INVESTORS</span>
          </div>

          <h3>Open an account</h3>
          <p>
            No demat account needed. Start a SIP or lump-sum mutual fund investment with full research guidance in a few clicks.
          </p>

          <Link to="/" className="help-link">
            Start Investing →
          </Link>
        </div>

        <div className="help-card">
          <div className="help-card-top">
            <div className="help-icon-badge">
              <Briefcase size={18} />
            </div>
            <span>PARTNERS</span>
          </div>

          <h3>Join partner network</h3>
          <p>
            Build an enduring mutual fund distribution practice on our paperless, AMFI-registered platform.
          </p>

          <Link to="/partners" className="help-link">
            Learn More →
          </Link>
        </div>

        <div className="help-card">
          <div className="help-card-top">
            <div className="help-icon-badge">
              <UserCheck size={18} />
            </div>
            <span>EXISTING CLIENTS</span>
          </div>

          <h3>Portfolio support</h3>
          <p>
            Already investing with us? Log in to your dashboard or call our desk directly for seamless servicing.
          </p>

          <Link to="/" className="help-link">
            Client Portal →
          </Link>
        </div>
      </section>

      {/* 3RD SECTION: REGISTERED OFFICE */}
      <section className="office-section">
        <span className="office-tag">— VISIT US</span>

        <h2>Our registered office.</h2>

        <div className="office-wrapper">
          {/* GOOGLE MAP */}
          <div className="office-map">
            <iframe
              title="MoneyGYAN Office Location"
              src="https://www.google.com/maps?q=Thacker+Tower+Sector+17+Vashi+Navi+Mumbai&output=embed"
              loading="lazy"
            ></iframe>
          </div>

          {/* OFFICE HOURS */}
          <div className="office-hours">
            <h4>— OFFICE HOURS</h4>

            <div className="hour">
              <div className="hour-label">
                <Calendar size={14} />
                <span>Monday – Friday</span>
              </div>
              <p>10:00 AM – 7:00 PM</p>
            </div>

            <div className="hour">
              <div className="hour-label">
                <Calendar size={14} />
                <span>Saturday</span>
              </div>
              <p>10:00 AM – 5:00 PM</p>
            </div>

            <div className="hour">
              <div className="hour-label">
                <Clock size={14} />
                <span>Sunday</span>
              </div>
              <p>Closed</p>
            </div>

            <div className="hour">
              <div className="hour-label">
                <Sparkles size={14} />
                <span>Public Holidays</span>
              </div>
              <p>Closed</p>
            </div>

            <small>
              Markets don't wait for office hours, but people do. Send us an
              email anytime and we'll reply on the next working day.
            </small>
          </div>
        </div>
      </section>
    </>
  );
}