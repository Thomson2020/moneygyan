import "./PartnerCSS/WhatYouGet.css";

const features = [
  {
    title: "Paperless Transactions",
    desc: "Complete onboarding, KYC, SIPs and investments without paperwork."
  },
  {
    title: "Portfolio Reports",
    desc: "Beautiful reports with insights, performance and holdings."
  },
  {
    title: "Easy Scheme Selection",
    desc: "Discover and compare funds with intelligent recommendations."
  },
  {
    title: "Fund-Neutral Platform",
    desc: "Access all major fund houses without bias."
  },
  {
    title: "Marketing Support",
    desc: "Ready-made content to help you acquire and educate investors."
  },
  {
    title: "Business Dashboard",
    desc: "Track revenue, commissions and client growth in one place."
  }
];

export default function WhatYouGet() {
  return (
    <section className="what-section">

      <div className="what-header">
        <span className="eyebrow">WHAT YOU GET</span>

        <h2>
          Everything you need to <br />
          <span> scale your advisory practice.</span>
        </h2>

        <p>
          A turnkey, paperless ecosystem for mutual fund distributors — from instant client onboarding
          and KYC to live portfolio analytics, automated reporting, and revenue tracking.
        </p>
      </div>

      <div className="feature-layout">

        {features.map((item, idx) => (
          <div className="feature-card" key={idx}>

            <div className="feature-content">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>

            <div className="feature-glow"></div>

          </div>
        ))}

      </div>

    </section>
  );
}