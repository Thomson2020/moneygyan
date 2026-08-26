import { Link } from "react-router-dom";
import {
  Building2,
  Smartphone,
  Users,
  MapPin,
  Layers,
  ShieldCheck,
  Percent,
  Landmark,
  Lightbulb,
  Compass,
  TrendingUp,
  FileText,
  Target,
  Headphones,
  ArrowRight,
  Phone,
  Mail,
  Clock,
  Calendar,
  FileBadge,
  Sparkles
} from "lucide-react";

export default function AboutHero() {
  return (
    <>
      <section className="about-hero">
        <div className="about-left">
          <span className="about-eyebrow">ABOUT MONEYGYAN</span>

          <h1>
            Money, and <span>Gyan</span> to use it well.
          </h1>

          <p className="about-description">
            MoneyGYAN is an AMFI-registered Mutual Fund Distributor helping
            investors and distribution partners build wealth through a transparent,
            fund-neutral platform.
          </p>

          <div className="about-buttons">
            <Link to="/" className="about-primary-btn" style={{ textDecoration: "none" }}>
              START INVESTING →
            </Link>

            <Link to="/partners" className="about-secondary-btn" style={{ textDecoration: "none" }}>
              BECOME A PARTNER
            </Link>
          </div>
        </div>

        <div className="about-right">
          <div className="about-info-card">
            <div className="info-row">
              <div className="info-label-group">
                <Building2 size={16} className="info-icon" />
                <span>ENTITY TYPE</span>
              </div>
              <strong>AMFI Registered Mutual Fund Distributor</strong>
            </div>

            <div className="info-row">
              <div className="info-label-group">
                <Smartphone size={16} className="info-icon" />
                <span>PLATFORM</span>
              </div>
              <strong>Web & Mobile</strong>
            </div>

            <div className="info-row">
              <div className="info-label-group">
                <Users size={16} className="info-icon" />
                <span>SERVES</span>
              </div>
              <strong>Investors & Distribution Partners</strong>
            </div>

            <div className="info-row">
              <div className="info-label-group">
                <MapPin size={16} className="info-icon" />
                <span>HEADQUARTERED</span>
              </div>
              <strong>Vashi, Navi Mumbai</strong>
            </div>

            <div className="info-row">
              <div className="info-label-group">
                <Layers size={16} className="info-icon" />
                <span>FUND HOUSES</span>
              </div>
              <strong>All Major AMCs</strong>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="about-stats">
        <div className="about-stat">
          <div className="about-stat-icon-wrapper">
            <ShieldCheck size={20} />
          </div>
          <h3>AMFI-Registered</h3>
          <span>NATIONAL DISTRIBUTOR</span>
        </div>

        <div className="about-stat">
          <div className="about-stat-icon-wrapper">
            <Percent size={20} />
          </div>
          <h3>Zero</h3>
          <span>ACCOUNT OPENING CHARGES</span>
        </div>

        <div className="about-stat">
          <div className="about-stat-icon-wrapper">
            <Landmark size={20} />
          </div>
          <h3>Fund-Neutral</h3>
          <span>EVERY MAJOR AMC AVAILABLE</span>
        </div>

        <div className="about-stat">
          <div className="about-stat-icon-wrapper">
            <Users size={20} />
          </div>
          <h3>Two Audiences</h3>
          <span>INVESTORS & PARTNERS</span>
        </div>
      </section>

{/* OUR STORY */}
      <section className="story-section">
        <div className="story-left">
          <span className="story-label">OUR STORY</span>

          <h2>Why MoneyGYAN exists.</h2>

          <div className="story-text-group">
            <p>
              MoneyGYAN was built on a simple observation: people lose their
              hard-earned money not because markets are unkind, but because
              investment decisions are made without the knowledge to back them.
            </p>

            <p>
              The name reflects that belief directly. <strong>Money</strong> is
              one of the most important tools for building a life.{" "}
              <strong>Gyan</strong> is the wisdom that helps people use that tool
              well.
            </p>

            <p>
              Today we serve both investors and distribution partners through one
              transparent, paperless platform.
            </p>
          </div>
        </div>

        <div className="story-right">
          <div className="story-quote">
            <div className="quote-icon">“</div>
            <p>
              Whether you're investing your own money or helping someone else
              invest theirs, the job is the same: understand it well enough to
              hold it steady.
            </p>
            <span>— THE MONEYGYAN APPROACH</span>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="values-header">
          <span className="values-label">WHAT WE STAND FOR</span>

          <h2>
            Knowledge first. <br />
            <span>Product second.</span>
          </h2>

          <p>
            Our mission is straightforward: help clients and partners make
            informed, appropriate investment decisions rather than convenient ones.
          </p>
        </div>

        <div className="values-grid">
          <div className="value-card">
            <div className="value-card-header">
              <div className="value-icon-badge">
                <Lightbulb size={20} />
              </div>
            </div>
            <h3>Gyan Before Product</h3>
            <p>
              We believe education comes first. Better-informed investors naturally
              make better investment decisions.
            </p>
          </div>

          <div className="value-card">
            <div className="value-card-header">
              <div className="value-icon-badge">
                <Compass size={20} />
              </div>
            </div>
            <h3>Fund-Neutral, Always</h3>
            <p>
              Every major AMC is available on our platform. We have no incentive
              to favour one fund house over another.
            </p>
          </div>

          <div className="value-card">
            <div className="value-card-header">
              <div className="value-icon-badge">
                <TrendingUp size={20} />
              </div>
            </div>
            <h3>Trail-Based Alignment</h3>
            <p>
              We earn only when clients remain invested and continue growing their
              wealth over time.
            </p>
          </div>

          <div className="value-card">
            <div className="value-card-header">
              <div className="value-icon-badge">
                <FileText size={20} />
              </div>
            </div>
            <h3>Paperless by Default</h3>
            <p>
              Investments, redemptions and servicing happen digitally, reducing
              friction and unnecessary paperwork.
            </p>
          </div>

          <div className="value-card">
            <div className="value-card-header">
              <div className="value-icon-badge">
                <Target size={20} />
              </div>
            </div>
            <h3>Focused Expertise</h3>
            <p>
              We specialise exclusively in mutual funds so every recommendation
              stays focused and unbiased.
            </p>
          </div>

          <div className="value-card">
            <div className="value-card-header">
              <div className="value-icon-badge">
                <Headphones size={20} />
              </div>
            </div>
            <h3>Human Support</h3>
            <p>
              Technology handles the paperwork. People remain available whenever
              real financial conversations matter.
            </p>
          </div>
        </div>
      </section>
      
      <section className="audience-section">
        <div className="audience-heading">
          <div className="audience-heading-inner">
            <span className="audience-label">WHO WE SERVE</span>
            <h2>
              Two Audiences
              <br />
              One Platform
            </h2>
          </div>
        </div>

        <div className="audience-grid">
          <div className="audience-card">
            <div className="audience-content">
              <span className="audience-type">FOR INVESTORS</span>

              <h3>
                Build wealth without
                <br />
                a demat account.
              </h3>

              <p>
                Open a mutual fund account in minutes with zero account opening
                charges. Invest in carefully researched schemes, monitor your
                portfolio and build long-term wealth through a completely paperless
                experience.
              </p>
            </div>

            <div className="audience-footer">
              <Link to="/">Start Investing →</Link>
            </div>
          </div>

          <div className="audience-card">
            <div className="audience-content">
              <span className="audience-type">FOR PARTNERS</span>

              <h3>
                Build a distribution
                <br />
                business with us.
              </h3>

              <p>
                Financial professionals—from insurance advisors and CAs to
                independent distributors—can onboard clients digitally, manage
                investments efficiently and build recurring trail income on the
                MoneyGYAN platform.
              </p>
            </div>

            <div className="audience-footer">
              <Link to="/partners">Become a Partner →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="regulation-section">
        <div className="regulation-top">
          <div className="regulation-header">
            <span className="section-eyebrow">REGISTRATION & CREDENTIALS</span>

            <h2>
              Regulated, registered, <br />
              <span>and on the record.</span>
            </h2>

            <p>
              MoneyGYAN operates as an AMFI-registered Mutual Fund Distributor.
              We are not a SEBI-registered Investment Adviser, and any guidance
              we provide is incidental to distribution, in line with AMFI's Code
              of Conduct.
            </p>
          </div>

          <div className="regulation-details">
            <div className="reg-item">
              <div className="reg-icon-row">
                <FileBadge size={16} />
                <span>ENTITY</span>
              </div>
              <strong>MoneyGYAN.com</strong>
            </div>

            <div className="reg-item">
              <div className="reg-icon-row">
                <ShieldCheck size={16} />
                <span>ARN CODE</span>
              </div>
              <strong>ARN-144200</strong>
            </div>

            <div className="reg-item">
              <div className="reg-icon-row">
                <Calendar size={16} />
                <span>VALID TILL</span>
              </div>
              <strong>24/04/2027</strong>
            </div>

            <div className="reg-item">
              <div className="reg-icon-row">
                <Sparkles size={16} />
                <span>REG STATUS</span>
              </div>
              <strong>Active &amp; Certified</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="location-section">
        <div className="location-left">
          <span className="section-eyebrow">WHERE WE ARE</span>

          <h2>
            Based in Navi Mumbai.
            <br />
            Working across India.
          </h2>

          <p>
            Our registered office is located in Vashi, Navi Mumbai, while our
            completely paperless platform serves investors and partners
            throughout India.
          </p>
        </div>

        <div className="location-card">
          <div className="location-row">
            <div className="location-icon-label">
              <MapPin size={15} />
              <span>ADDRESS</span>
            </div>
            <p>
              308, 3rd Floor, Thacker Tower, Sector 17, Vashi, Navi Mumbai -
              400703
            </p>
          </div>

          <div className="location-row">
            <div className="location-icon-label">
              <Phone size={15} />
              <span>PHONE</span>
            </div>
            <p>022-4454-4475</p>
          </div>

          <div className="location-row">
            <div className="location-icon-label">
              <Mail size={15} />
              <span>EMAIL</span>
            </div>
            <p>info@moneygyan.com</p>
          </div>

          <div className="location-row">
            <div className="location-icon-label">
              <Clock size={15} />
              <span>HOURS</span>
            </div>
            <p>Monday – Saturday • 10 AM – 7 PM</p>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <span className="section-eyebrow">GET STARTED</span>

        <h2>
          Whichever side of the table you're on,
          <br />
          we're built for it.
        </h2>

        <p>
          Start investing on your own, or build a distribution business on our
          platform — either way, it begins with the same knowledge-first approach.
        </p>

        <div className="about-cta-buttons">
          <Link to="/" className="about-primary-btn" style={{ textDecoration: "none" }}>
            START INVESTING
          </Link>

          <Link
            to="/partners"
            className="about-secondary-btn"
            style={{ textDecoration: "none" }}
          >
            BECOME A PARTNER
          </Link>
        </div>
      </section>
    </>
  );
}