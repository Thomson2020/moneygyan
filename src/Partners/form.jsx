import { useState } from "react";
import Select from "react-select";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { sendToGoogleSheets } from "@/lib/webhook";

import "./PartnerCSS/Form.css";
import "./PartnerCSS/arn.css";

export default function Form() {
  const [profession, setProfession] = useState(null);
  const [hasArn, setHasArn] = useState(null);
  const [arnNumber, setArnNumber] = useState("");
  const [agree, setAgree] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    notes: "",
  });
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: "Please check the agreement box before submitting.",
      });
      return;
    }

    setSubmitStatus({ loading: true, success: false, error: null });

    try {
      const payload = {
        formType: "Partner Application",
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        profession: profession?.label || "Not specified",
        hasArn: hasArn?.value === "yes" ? `Yes (${arnNumber.trim()})` : "No",
        notes: formData.notes.trim() || "None",
      };

      await addDoc(collection(db, "partner_applications"), {
        ...payload,
        hasArn: hasArn?.value === "yes",
        arnNumber: hasArn?.value === "yes" ? arnNumber.trim() : null,
        agreedToContact: agree,
        createdAt: serverTimestamp(),
        status: "pending",
      });

      // Forward to Google Sheets + Instant Email Notification
      sendToGoogleSheets(payload);

      setSubmitStatus({ loading: false, success: true, error: null });
      setFormData({ fullName: "", phone: "", city: "", notes: "" });
      setProfession(null);
      setHasArn(null);
      setArnNumber("");
      setAgree(false);
    } catch (err) {
      console.error("Error submitting partner application:", err);
      setSubmitStatus({
        loading: false,
        success: false,
        error: "Unable to submit your application. Please check your network and try again.",
      });
    }
  };

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
      backgroundColor: "var(--dropdown-bg)",
      border: "1px solid var(--card-border)",
      borderRadius: "14px",
      boxShadow: "0 16px 40px rgba(0, 0, 0, 0.45)",
      overflow: "hidden",
      padding: "6px",
      marginTop: "8px",
      zIndex: 100,
      transformOrigin: "top center",
      animation: "dropdownSlideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards"
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "0",
      backgroundColor: "transparent"
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected 
        ? "var(--primary)" 
        : state.isFocused 
        ? "var(--btn-bg-hover)" 
        : "transparent",
      color: state.isSelected ? "#ffffff" : "var(--text-primary)",
      borderRadius: "8px",
      padding: "10px 14px",
      margin: "2px 0",
      fontSize: "0.9rem",
      cursor: "pointer",
      transition: "all 0.15s ease"
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
          <form onSubmit={handleSubmit}>
            {submitStatus.success && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  background: "rgba(16, 185, 129, 0.12)",
                  border: "1px solid rgba(16, 185, 129, 0.35)",
                  color: "#10b981",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  lineHeight: 1.5,
                  marginBottom: "16px",
                }}
              >
                ✓ Application received! Our team will contact you within 2 working days.
              </div>
            )}

            {submitStatus.error && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  background: "rgba(239, 68, 68, 0.12)",
                  border: "1px solid rgba(239, 68, 68, 0.35)",
                  color: "#ef4444",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  lineHeight: 1.5,
                  marginBottom: "16px",
                }}
              >
                ✕ {submitStatus.error}
              </div>
            )}

            <input
              type="text"
              name="fullName"
              placeholder="FULL NAME"
              value={formData.fullName}
              onChange={handleChange}
              required
              disabled={submitStatus.loading}
            />
            <input
              type="tel"
              name="phone"
              placeholder="PHONE NUMBER"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={submitStatus.loading}
            />
            <input
              type="text"
              name="city"
              placeholder="CITY"
              value={formData.city}
              onChange={handleChange}
              required
              disabled={submitStatus.loading}
            />

            <div className="select-row-wrapper">
              <Select
                options={professionOptions}
                styles={customSelectStyles}
                placeholder="CURRENT PROFESSION"
                value={profession}
                onChange={setProfession}
                isSearchable={false}
                isDisabled={submitStatus.loading}
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
                isDisabled={submitStatus.loading}
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
                  disabled={submitStatus.loading}
                />
              </div>
            </div>

            <textarea
              rows="2"
              name="notes"
              placeholder="ANYTHING YOU'D LIKE US TO KNOW?"
              value={formData.notes}
              onChange={handleChange}
              disabled={submitStatus.loading}
            />

            <label className="agreement-row">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                required
                disabled={submitStatus.loading}
              />
              <span className="checkmark"></span>
              <span className="agreement-text">
                By submitting, you agree to be contacted by <strong>MoneyGYAN</strong> regarding the partner program.
              </span>
            </label>

            <div className="form-submit-row">
              <button
                type="submit"
                className="submit-btn"
                disabled={submitStatus.loading}
                style={{ opacity: submitStatus.loading ? 0.7 : 1, cursor: submitStatus.loading ? "not-allowed" : "pointer" }}
              >
                {submitStatus.loading ? "SUBMITTING..." : "SUBMIT APPLICATION"}
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}