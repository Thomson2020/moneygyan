import React from "react";
import "./privacy.css";
import { ShieldCheck, Lock, Eye, Server, RefreshCw, FileText, HelpCircle } from "lucide-react";

export default function Privacy() {
  return (
    <section className="privacy-section">
      <div className="privacy-container">
        
        {/* Header Title & Badge */}
        <header className="privacy-header">
          <span className="privacy-badge">PRIVACY & DATA PROTECTION</span>
          <h1 className="privacy-title">
            Privacy <span>Policy</span>
          </h1>
          <p className="privacy-subtitle">
            How MoneyGYAN collects, protects, and handles your personal and financial data.
          </p>
        </header>

        {/* Highlighted Summary Banner */}
        <div className="privacy-summary-card">
          <div className="privacy-indicator"></div>
          <div>
            <strong>Our Commitment to Privacy:</strong> At MoneyGYAN, your data privacy and security are paramount. We comply strictly with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, the <strong>Information Technology Act, 2000</strong>, and <strong>SEBI/AMFI regulatory data standards</strong>. We never sell or monetize your personal information.
          </div>
        </div>

        {/* Detailed Privacy Cards */}
        <div className="privacy-content">
          
          {/* 1. INTRODUCTION */}
          <section className="privacy-card">
            <div className="privacy-card-header">
              <div className="privacy-icon-badge">
                <FileText size={20} />
              </div>
              <h2>1. Introduction & Scope</h2>
            </div>
            <p>
              This Privacy Policy explains how <strong>MoneyGYAN</strong> ("MoneyGYAN", "we", "us", or "our"), an AMFI-registered Mutual Fund Distributor (ARN-144200), collects, stores, processes, and protects your personal and financial data when you access or use our website (www.moneygyan.com) and associated mobile applications.
            </p>
            <p style={{ marginTop: "12px" }}>
              By accessing our platform or availing our distribution services, you consent to the data practices described in this policy. If you do not agree with any part of this policy, please refrain from using the platform.
            </p>
          </section>

          {/* 2. DATA WE COLLECT */}
          <section className="privacy-card">
            <div className="privacy-card-header">
              <div className="privacy-icon-badge">
                <Eye size={20} />
              </div>
              <h2>2. Information We Collect</h2>
            </div>
            <p>
              To fulfill statutory KYC mandates and execute mutual fund orders on your behalf, we collect the following categories of information:
            </p>
            <ul>
              <li>
                <strong>Identity & KYC Information:</strong> Full name, Date of Birth, Permanent Account Number (PAN), gender, father's/spouse's name, photograph, and proof of identity/address as required by SEBI-registered KYC Registration Agencies (KRAs) and CKYC registry.
              </li>
              <li>
                <strong>Contact Information:</strong> Residential address, verified email address, and mobile phone number.
              </li>
              <li>
                <strong>Financial & Banking Data:</strong> Bank account numbers, IFSC codes, bank branch details, and One-Time Bank Mandates (OTBM) necessary for automated SIPs and redemption payouts directly to your verified bank account.
              </li>
              <li>
                <strong>Transaction & Folio Data:</strong> Investment history, scheme names, folio numbers, units allotted, NAVs, and holding valuations received from AMCs and Registrar and Transfer Agents (RTAs like CAMS and KFintech).
              </li>
              <li>
                <strong>Technical & Log Data:</strong> IP address, device identifier, browser type, operating system, and session timestamps collected to safeguard against unauthorized logins and fraud.
              </li>
            </ul>
          </section>

          {/* 3. PURPOSE OF PROCESSING */}
          <section className="privacy-card">
            <div className="privacy-card-header">
              <div className="privacy-icon-badge">
                <Server size={20} />
              </div>
              <h2>3. How We Use Your Information</h2>
            </div>
            <p>
              We process your data strictly for legitimate operational, statutory, and regulatory purposes:
            </p>
            <ul>
              <li>
                Facilitating order routing and mutual fund unit subscriptions/redemptions via SEBI-regulated transaction platforms (such as NSE NMF II and BSE StAR MF).
              </li>
              <li>
                Verifying your KYC status in compliance with Prevention of Money Laundering Act (PMLA) and SEBI guidelines.
              </li>
              <li>
                Generating real-time portfolio dashboards, capital gains tax statements, and consolidated performance summaries.
              </li>
              <li>
                Providing proactive customer support, transaction confirmations, and regulatory notices.
              </li>
              <li>
                Preventing financial fraud, unauthorized access, and ensuring cybersecurity compliance.
              </li>
            </ul>
          </section>

          {/* 4. DATA SHARING */}
          <section className="privacy-card">
            <div className="privacy-card-header">
              <div className="privacy-icon-badge">
                <RefreshCw size={20} />
              </div>
              <h2>4. Sharing of Information</h2>
            </div>
            <p>
              MoneyGYAN does <strong>not</strong> sell, rent, or trade your personal or financial data to any third-party marketing companies. Data is shared solely with authorized entities involved in fulfilling your financial transactions:
            </p>
            <ul>
              <li>
                <strong>Asset Management Companies (AMCs) & RTAs:</strong> CAMS, KFintech, and mutual fund houses to maintain your official folios.
              </li>
              <li>
                <strong>Stock Exchanges & Clearing Corporations:</strong> NSE, BSE, and clearing banks for payment settlement and execution.
              </li>
              <li>
                <strong>KYC Registration Agencies (KRAs):</strong> CVL, NDML, CAMS, KFintech, and DOTEX for regulatory KYC validation.
              </li>
              <li>
                <strong>Statutory & Law Enforcement Bodies:</strong> SEBI, AMFI, FIU-IND, tax authorities, or courts of law when mandated by applicable statutes.
              </li>
            </ul>
          </section>

          {/* 5. DATA SECURITY */}
          <section className="privacy-card">
            <div className="privacy-card-header">
              <div className="privacy-icon-badge">
                <Lock size={20} />
              </div>
              <h2>5. Data Security & Storage</h2>
            </div>
            <p>
              We implement industry-leading technical and organizational security measures to protect your data:
            </p>
            <ul>
              <li>
                <strong>256-Bit TLS/SSL Encryption:</strong> All data transmitted between your browser and our servers is encrypted using modern cryptographic standards.
              </li>
              <li>
                <strong>Access Controls & Audit Trails:</strong> Sensitive personal data is restricted to authorized personnel on a strict need-to-know basis and subject to confidentiality agreements.
              </li>
              <li>
                <strong>Secure Payment Infrastructure:</strong> MoneyGYAN never stores your bank net-banking passwords, UPI PINs, or debit card credentials. Payments are processed directly through bank-grade third-party gateways and clearing corporations.
              </li>
              <li>
                <strong>Data Retention:</strong> We retain your records only as long as necessary to provide distribution services and to satisfy mandatory statutory retention periods prescribed by SEBI and PMLA (minimum 5 years post account closure).
              </li>
            </ul>
          </section>

          {/* 6. USER RIGHTS */}
          <section className="privacy-card">
            <div className="privacy-card-header">
              <div className="privacy-icon-badge">
                <ShieldCheck size={20} />
              </div>
              <h2>6. Your Rights Under DPDP Act, 2023</h2>
            </div>
            <p>
              As a data principal under Indian data protection law, you are entitled to:
            </p>
            <ul>
              <li>
                <strong>Right to Access:</strong> Request a summary of your personal data processed by MoneyGYAN.
              </li>
              <li>
                <strong>Right to Correction:</strong> Request correction or updating of inaccurate or outdated personal details.
              </li>
              <li>
                <strong>Right to Erasure:</strong> Request deletion of your data (subject to mandatory SEBI/PMLA statutory retention obligations).
              </li>
              <li>
                <strong>Right to Grievance Redressal:</strong> Direct any privacy concerns to our designated Data Protection Officer.
              </li>
            </ul>
          </section>

          {/* 7. GRIEVANCE OFFICER */}
          <section className="privacy-card">
            <div className="privacy-card-header">
              <div className="privacy-icon-badge">
                <HelpCircle size={20} />
              </div>
              <h2>7. Data Protection & Grievance Officer</h2>
            </div>
            <p>
              If you have any questions, feedback, or grievances regarding the processing of your personal data, please contact our Data Protection Officer:
            </p>
            <ul>
              <li>
                <strong>Designated Officer:</strong> Grievance Redressal Officer
              </li>
              <li>
                <strong>Email:</strong> <a href="mailto:info@moneygyan.com">info@moneygyan.com</a>
              </li>
              <li>
                <strong>Telephone:</strong> 022-4454-4475 (Mon–Sat, 10:00 AM – 7:00 PM IST)
              </li>
              <li>
                <strong>Office Address:</strong> MoneyGYAN, 308, 3rd Floor, Thacker Tower, Sector 17, Vashi, Navi Mumbai, Maharashtra – 400703.
              </li>
            </ul>
          </section>

        </div>
      </div>
    </section>
  );
}
