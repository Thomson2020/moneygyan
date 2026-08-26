import "./PartnerCSS/Opportunity.css"

export default function Opportunity() {
  return (
    <section className="opportunity">
      <span className="opportunity-eyebrow">
        THE MARKET OPPORTUNITY
      </span>

      <h2>
        India is vast, growing, and
        <br />
        under-penetrated in mutual funds.
      </h2>

      <p className="opportunity-lead">
        Most Indian households still hold wealth in low-yield savings.
        Of those who invest, many are sold opaque products rather than sound principles.
        Bridging that gap with transparency is where a MoneyGYAN partner builds an enduring, high-trust practice.
      </p>

      <div className="opportunity-stats">
        <div className="opportunity-card">
          <h3>&lt;5%</h3>
          <p>
            of India's population invests in mutual funds —
            among the lowest MF-to-population ratios of any major economy.
          </p>
        </div>

        <div className="opportunity-card">
          <h3>1 : 10,000</h3>
          <p>
            approximate ratio of registered mutual fund distributors
            to India's population today.
          </p>
        </div>

        <div className="opportunity-card">
          <h3>↑↑↑</h3>
          <p>
            SIP accounts and mutual fund folios have grown
            steadily across India over the last several years.
          </p>
        </div>

        <div className="opportunity-card">
          <h3>₹0</h3>
          <p>
            capital required to start.
            This is a 100% digital, mutual-fund-only
            distribution business.
          </p>
        </div>
      </div>

      <p className="opportunity-disclaimer">
        Figures are directional and should be verified against
        current AMFI and SEBI data before publication.
        Mutual fund investments are subject to market risk.
      </p>
    </section>
  );
}