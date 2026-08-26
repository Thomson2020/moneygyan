import "./PartnerCSS/howitworks.css"

export default function Howitworks() {
  return (
    <section className="hiw">
      <div className="hiw-header">
        <div>
          <span className="hiw-tag">— HOW IT WORKS</span>

          <h1>
            From curious to
            <br />
            fully certified.
          </h1>
        </div>
        <p>
          Anyone distributing mutual fund schemes in India is
          required to hold an AMFI Registration Number (ARN). <br />
          <b style={{color: "#06b6d4" }}>We guide you through the entire process.</b>
        </p>
      </div>

      <div className="hiw-step">
        <span>01</span>
        <h3>Register Interest</h3>
        <p>
          Fill the partner form below. We'll set up a short call
          to understand your background and goals.
        </p>
      </div>

      <div className="hiw-step">
        <span>02</span>
        <h3>NISM-V-A Prep</h3>
        <p>
          We guide you through the NISM syllabus with study
          material and mock tests.
        </p>
      </div>

      <div className="hiw-step">
        <span>03</span>
        <h3>Certification & ARN</h3>
        <p>
          Clear the NISM exam and obtain your ARN registration.
        </p>
      </div>

      <div className="hiw-step">
        <span>04</span>
        <h3>Empanel With MoneyGYAN</h3>
        <p>
          Get onboarded onto the MoneyGYAN platform and begin
          servicing clients.
        </p>
      </div>

      <div className="hiw-step">
        <span>05</span>
        <h3>Learn the Playbook</h3>
        <p>
          Access scheme buckets, client communication guides,
          and operational resources.
        </p>
      </div>

      <div className="hiw-step">
        <span>06</span>
        <h3>Launch</h3>
        <p>
          Start onboarding your first clients with support
          from our team.
        </p>
      </div>
    </section>
  );
}