import { useState } from "react";
import Select from "react-select";

import "./PartnerCSS/Form.css";
import "./PartnerCSS/arn.css";

export default function Form() {
  const [profession, setProfession] = useState(null);
  const [hasArn, setHasArn] = useState(null);
  const [arnNumber, setArnNumber] = useState("");
  const [agree, setAgree] = useState(false);

  const professionOptions = [
    { value: "student", label: "Student" },
    { value: "professional", label: "Working Professional" },
    { value: "business", label: "Business Owner" }
  ];

  const arnOptions = [
    { value: "no", label: "No — I need help getting one" },
    { value: "yes", label: "Yes — I already have an ARN" }
  ];

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "transparent",
      border: "none",
      borderBottom: state.isFocused ? "1px solid var(--primary)" : "1px solid var(--input-border)",
      borderRadius: "0",
      padding: "6px 0",
      boxShadow: "none",
      cursor: "pointer",
      "&:hover": {
        borderBottomColor: "var(--primary)",
      }
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0"
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--text-primary)",
      fontSize: "0.95rem",
      marginLeft: "0"
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "var(--text-muted)",
      fontSize: "0.9rem",
      letterSpacing: "1.5px",
      marginLeft: "0"
    }),
    menu: (provided) => ({
      ...provided,
      background: "var(--bg-card)",
      border: "1px solid var(--card-border)",
      borderRadius: "14px",
      boxShadow: "var(--card-shadow)",
      overflow: "hidden",
      padding: "4px 0",
      zIndex: 10
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected 
        ? "var(--primary)" 
        : state.isFocused 
        ? "var(--btn-bg-hover)" 
        : "transparent",
      color: state.isSelected ? "#ffffff" : "var(--text-primary)",
      padding: "10px 16px",
      fontSize: "0.9rem",
      cursor: "pointer",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "var(--text-muted)",
      padding: "0",
      "&:hover": { color: "var(--primary)" }
    })
  };

  return (
    <section className="form-section">
      <div className="form-container">
        
        {/* Left Side: Callouts */}
        <div className="form-left">
          <span className="form-eyebrow">BECOME A PARTNER</span>
          <h2>
            The index doesn't chase headlines.
            <br />
            <span>Neither should you.</span>
          </h2>
          <p className="form-lead-desc">
            Tell us a little about yourself. We reply to every enquiry within 2 working days.
          </p>

          <div className="form-contact">
            <p className="contact-email">partners@moneygyan.com</p>
            <p className="contact-wa">WhatsApp: +91 XXXXX XXXXX</p>
            <a href="#" className="login-fallback">Already a partner? Log in →</a>
          </div>
        </div>

        {/* Right Side: Form Core */}
        <div className="form-right">
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="FULL NAME" required />
            <input type="tel" placeholder="PHONE NUMBER" required />
            <input type="text" placeholder="CITY" required />

            <div className="select-row-wrapper">
              <Select
                options={professionOptions}
                styles={customSelectStyles}
                placeholder="CURRENT PROFESSION"
                value={profession}
                onChange={setProfession}
                isSearchable={false}
              />
            </div>

            <div className="select-row-wrapper">
              <Select
                options={arnOptions}
                styles={customSelectStyles}
                placeholder="DO YOU HAVE AN ARN?"
                value={hasArn}
                onChange={setHasArn}
                isSearchable={false}
              />
            </div>

            <div className={`arn-expand-wrapper ${hasArn?.value === "yes" ? "open" : ""}`}>
              <div className="arn-expand-inner">
                <input
                  type="text"
                  placeholder="ENTER ARN NUMBER"
                  value={arnNumber}
                  onChange={(e) => setArnNumber(e.target.value)}
                  className="arn-input"
                  required={hasArn?.value === "yes"}
                />
              </div>
            </div>

            <textarea
              rows="2"
              placeholder="ANYTHING YOU'D LIKE US TO KNOW?"
            />

            <label className="agreement-row">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                required
              />
              <span className="checkmark"></span>
              <span className="agreement-text">
                By submitting, you agree to be contacted by <strong>MoneyGYAN</strong> regarding the partner program.
              </span>
            </label>

            <div className="form-submit-row">
              <button type="submit" className="submit-btn">
                SUBMIT APPLICATION
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}