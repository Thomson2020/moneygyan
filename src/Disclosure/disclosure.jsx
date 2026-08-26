import "./disclosure.css";
import { cn } from "@/lib/utils";
import { ShieldCheck, FileText, AlertTriangle, Scale, HelpCircle } from "lucide-react";

export default function Disclosure() {
  return (
    <section className="disclosure-section">
      <div className="disclosure-container">
        <header className="disclosure-header">
          <span className="disclosure-badge">STATUTORY & LEGAL</span>
          <h1 className="disclosure-title">
            Regulatory <span>Disclosures</span>
          </h1>
          <p className="disclosure-subtitle">
            Transparency, compliance, and regulatory adherence at MoneyGYAN.
          </p>
        </header>

        <div className="disclosure-content">
          {/* REGISTRATION DETAILS */}
          <section className="disclosure-card">
            <div className="disclosure-card-header">
              <div className="disclosure-icon-badge">
                <ShieldCheck size={20} />
              </div>
              <h2>Registration & Entity Information</h2>
            </div>
            <p>
              <strong>MoneyGYAN</strong> operates as an AMFI-registered Mutual Fund
              Distributor under ARN code <strong>ARN-144200</strong>, valid till{" "}
              <strong>24/04/2027</strong>.
            </p>
            <ul>
              <li>
                <strong>Registered Office:</strong> 308, 3rd Floor, Thacker Tower,
                Sector 17, Vashi, Navi Mumbai, Maharashtra – 400703.
              </li>
              <li>
                <strong>Entity Category:</strong> AMFI-Registered Mutual Fund
                Distributor (MFD).
              </li>
              <li>
                <strong>Official Portal:</strong> www.moneygyan.com
              </li>
              <li>
                <strong>Compliance & Support:</strong> info@moneygyan.com | 022-4454-4475
              </li>
            </ul>
          </section>

          {/* CAPACITY OF DISTRIBUTOR (NON-ADVISORY DISCLAIMER) */}
          <section className="disclosure-card">
            <div className="disclosure-card-header">
              <div className="disclosure-icon-badge">
                <Scale size={20} />
              </div>
              <h2>Capacity of Operation & Non-Advisory Disclaimer</h2>
            </div>
            <p>
              In accordance with SEBI (Investment Advisers) Regulations, 2013 and
              AMFI Code of Conduct:
            </p>
            <ul>
              <li>
                MoneyGYAN is an <strong>AMFI-registered Mutual Fund Distributor</strong>,
                not a SEBI-registered Investment Adviser (RIA).
              </li>
              <li>
                Any scheme suggestions, educational content, or portfolio reviews
                provided on this platform or by our representatives are incidental to
                our primary activity of mutual fund distribution.
              </li>
              <li>
                Investors are encouraged to assess their own risk appetite, investment
                horizon, and personal financial circumstances before making any
                investment decision.
              </li>
            </ul>
          </section>

          {/* COMMISSION DISCLOSURE */}
          <section className="disclosure-card">
            <div className="disclosure-card-header">
              <div className="disclosure-icon-badge">
                <FileText size={20} />
              </div>
              <h2>Commission & Revenue Disclosure</h2>
            </div>
            <p>
              As per SEBI circular (SEBI/IMD/CIR No. 4/ 168230/09), details of
              commissions earned by MoneyGYAN across various Asset Management Companies
              (AMCs) are disclosed under the following principles:
            </p>
            <ul>
              <li>
                <strong>Zero Upfront Commission:</strong> MoneyGYAN does not charge or
                receive any upfront commissions from investors or AMCs for mutual fund
                distribution.
              </li>
              <li>
                <strong>Trailing Commission:</strong> MoneyGYAN earns a recurring trail
                commission directly from respective AMCs out of the scheme’s Total
                Expense Ratio (TER) as long as clients remain invested.
              </li>
              <li>
                Commission rates vary across AMCs, asset classes (Equity, Debt, Hybrid),
                and geographic categories (T-30 vs B-30 cities) as defined by AMFI.
              </li>
              <li>
                Specific scheme-level commission rates are available upon request from our
                support desk and can also be accessed directly via AMFI’s annual
                distributor commission disclosure portal.
              </li>
            </ul>
          </section>

          {/* RISK FACTORS */}
          <section className={cn("disclosure-card", "disclosure-risk")}>
            <div className="disclosure-card-header">
              <div className="disclosure-icon-badge risk-badge">
                <AlertTriangle size={20} />
              </div>
              <h2>Statutory Risk Factors</h2>
            </div>

            <p className="risk-quote">
              Mutual Fund investments are subject to market risks. Read all scheme-related
              documents carefully before investing.
            </p>

            <ul>
              <li>
                Mutual fund schemes do not assure, promise, or guarantee any specific
                returns or capital preservation.
              </li>
              <li>
                Past performance of any mutual fund scheme or benchmark is not indicative
                of future results.
              </li>
              <li>
                Net Asset Values (NAV) of mutual fund schemes may fluctuate depending on
                prevailing interest rates, equity market movements, and macroeconomic
                conditions.
              </li>
              <li>
                Investors should carefully check and evaluate applicable Exit Loads,
                lock-in periods (e.g. ELSS Tax Savers), and tax implications before
                initiating transactions.
              </li>
            </ul>
          </section>

          {/* REGULAR PLANS VS DIRECT PLANS */}
          <section className="disclosure-card">
            <div className="disclosure-card-header">
              <div className="disclosure-icon-badge">
                <FileText size={20} />
              </div>
              <h2>Regular Plans vs. Direct Plans</h2>
            </div>
            <p>
              Mutual funds in India offer two distinct investment options:
            </p>
            <ul>
              <li>
                <strong>Direct Plans:</strong> Subscribed directly with the AMC with lower
                expense ratios because no distributor commission is involved. Direct Plans
                require self-management, self-rebalancing, and independent tracking.
              </li>
              <li>
                <strong>Regular Plans:</strong> Subscribed through registered
                distributors like MoneyGYAN. Regular Plans include continuous platform
                access, automated tracking, research guidance, goal planning, and
                dedicated relationship support.
              </li>
              <li>
                MoneyGYAN distributes Regular Plans only. Investors always retain the free
                choice to invest in Direct Plans directly with AMCs without distributor
                involvement.
              </li>
            </ul>
          </section>

          {/* GRIEVANCE REDRESSAL */}
          <section className="disclosure-card">
            <div className="disclosure-card-header">
              <div className="disclosure-icon-badge">
                <HelpCircle size={20} />
              </div>
              <h2>Investor Grievance Redressal</h2>
            </div>
            <p>
              At MoneyGYAN, investor satisfaction and ethical conduct are our highest
              priorities. If you have any complaint or query:
            </p>
            <ul>
              <li>
                <strong>Level 1 — Support Desk:</strong> Email{" "}
                <a href="mailto:info@moneygyan.com">info@moneygyan.com</a> or call{" "}
                <strong>022-4454-4475</strong> (Mon–Sat, 10 AM – 7 PM).
              </li>
              <li>
                <strong>Level 2 — Regulatory Escalation:</strong> If your grievance remains
                unresolved, you may lodge a complaint with SEBI through the centralized{" "}
                <strong>SEBI SCORES</strong> portal (
                <a
                  href="https://scores.sebi.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  scores.sebi.gov.in
                </a>
                ) or contact AMFI directly.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}