import { Link } from "react-router-dom";
import "./HomeCSS/partnerprogram.css"

export default function PartnerProgram() {
  return (
    <section className="pfive">
      <div className="pfive-content">

        <p className="eyebrow">PARTNER PROGRAM</p>

        <h1>
          Build an Income Stream With
          <br /><br />
          Money<span className="gradient-text">GYAN</span>
        </h1>

        <h2>
          Sell discipline, Not predictions.
        </h2>

        <p className="subtitle">
          You don't need a finance degree to start. <br />
          You need people who already trust you and
          five minutes to see how it works.
        </p>

        <div className="cta-group">
        <Link to="https://moneygyan.investwell.app/app/#/login"style={{ textDecoration: 'none' }} className="secondary-btn">
          Become a Partner
        </Link>

        <Link to="/partners"style={{ textDecoration: 'none' }} className="secondary-btn">
          See How It Works
        </Link>
        </div>

      </div>
    </section>
  );
}