import "./terms.css";

export default function Terms() {
  return (
    <section className="terms-section">
      <div className="terms-container">
        
        {/* Header Title & Date */}
        <div className="terms-header">
          <span className="terms-badge">Legal &amp; Compliance</span>
          <h1 className="terms-title">
            Terms of <span>Use</span>
          </h1>
          <p className="terms-updated">
            Last updated: {new Date().getFullYear()}
          </p>
        </div>

        {/* Highlighted Summary Banner */}
        <div className="terms-summary-card">
          <div className="summary-indicator"></div>
          <div>
            <strong>Important Note:</strong> By accessing or using the Moneygyan.com application, you agree to be bound by these legally binding Terms of Use. Please read all sections carefully before using our platform.
          </div>
        </div>

        {/* Complete Official Legal Terms */}
        <div className="terms-content">
          
          {/* 1. AGREEMENT & DATA DISCLAIMER */}
          <div className="terms-card">
            <h2>1. Binding Agreement &amp; Data Disclaimer</h2>
            <p>
              Moneygyan.com is a web based application owned and operated by Moneygyan.com (&ldquo;Moneygyan.com/we/us/our&rdquo;). Please read these Terms of Use carefully before using or accessing the Moneygyan.com application. By accessing the Moneygyan.com application or clicking on the &ldquo;Accept&rdquo; button, you agree to be bound by these Terms of Use. These Terms of Use constitute a legally binding agreement between you, whether personally or on behalf of an entity (&ldquo;you/your/user&rdquo;) and Moneygyan.com. You agree that by accessing the application, you have read, understood, and agree to be bound by all of these Terms of use. <strong>IF YOU DO NOT AGREE WITH THESE TERMS OF USE, you must not access or use the Application.</strong>
            </p>
            <p style={{ marginTop: "14px" }}>
              Moneygyan.com provides and displays data of Mutual funds, investors and all data received from distributors of mutual funds/mutual fund houses or Exchanges and the data will be uploaded on regular basis by end of market hours. Moneygyan.com will not be liable for any data leakage, hacking of information, any mishaps or data breach or information which will be sent by distributors of mutual funds/mutual fund houses or Exchanges to Moneygyan.com. Moneygyan.com application will be used by different category of Users. Users can view their portfolio based on their category type of login. The data displayed on Moneygyan.com application with respect to mutual fund market is on an &ldquo;as is&rdquo; basis, and therefore, Moneygyan.com does not owe any responsibility for the validity, correctness, accurateness or completeness of data. Moneygyan.com is ONLY a facilitator to provide mutual fund data which enables systematic representation of information through this application.
            </p>
          </div>

          {/* 2. USE OF THE APPLICATION & THIRD-PARTY LINKS */}
          <div className="terms-card">
            <h2>2. Use of the Application &amp; Its Registration</h2>
            <p>
              We may at our sole discretion change these Terms of Use at any time. You may check the Terms of Use frequently while using the application. Using the application without reading these Terms of Use shall be considered as your acceptance to the Terms of Use modified from time to time.
            </p>
            <p style={{ marginTop: "14px" }}>
              Updates to the application may be issued. You need to update your application from time to time to enjoy seamless usage of the application. You may be charged for internet usage by your internet service provider.
            </p>
            <p style={{ marginTop: "14px" }}>
              The Application or any service may contain links to other independent third-party websites including exchange links (Third-party Sites). Through these links, User may be directed on Exchange platform and Users will have an option to access the exchange platform (Bombay Stock Exchange &amp; National Stock Exchange) for investing in mutual funds. If the User chooses to invest in any mutual fund through exchange links, the information provided by You for such purchase is not captured by the application and therefore, We are not responsible for any such transaction related data including the financial information provided by You.
            </p>
            <p style={{ marginTop: "14px" }}>
              For payment purpose the User will be directed to payment gateway integrated with the application. However, Moneygyan.com is not the owner of such payment gateway and therefore, We will not take any liability or responsibility of Your payment for purchasing/investing in mutual funds through these links. You are requested to read the terms and conditions of payment gateway carefully before making any such payment. Third-party Sites are not under our control, and we are not responsible for and do not endorse their content or their privacy policies (if any). You make your own independent judgement regarding your communication with any such Third-party Sites, including the purchase and use of any products or services accessible through these Third-party Sites.
            </p>
          </div>

          {/* 3. USAGE RIGHTS */}
          <div className="terms-card">
            <h2>3. Usage Rights</h2>
            <p>
              Your usage of Moneygyan.com application shall be treated as grant of usage rights on non-transferable, non-assignable and non-exclusive basis, subject to these Terms of Use including Privacy Policy and Disclaimer herein. All rights in the Moneygyan.com application, which are not expressly granted, are entirely and exclusively reserved by Us. We have not granted or assigned to you any right, title, interest or ownership in the application or Services in any manner.
            </p>
          </div>

          {/* 4. USAGE RESTRICTIONS */}
          <div className="terms-card">
            <h2>4. Usage Restrictions</h2>
            <p style={{ marginBottom: "12px" }}>
              Except as expressly set out in these Terms of Use or otherwise permitted by any law, You agree not to:
            </p>
            <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", color: "var(--muted)" }}>
              <li>Copy the application or documents, rent, lease, sub-license, merge, adapt, vary, alter, or modify, the application;</li>
              <li>Transfer any rights to the Application in part or as a whole with or without consideration to any other independent or third party;</li>
              <li>Disassemble, decompile, reverse-engineer or create derivative works based on the whole or any part of the application or attempt to do any such thing and/or to create any software that is substantially similar to the application;</li>
              <li>Remove or alter any trademark, logo, copyright or other proprietary notices, legends, symbols or labels in the application;</li>
              <li>Use the application or the content for any revenue generation endeavour, or any other purpose for which it is not designed or intended.</li>
            </ul>
          </div>

          {/* 5. PROPERTY RIGHTS & INTELLECTUAL PROPERTY */}
          <div className="terms-card">
            <h2>5. Property Rights &amp; Intellectual Property</h2>
            <p>
              All intellectual property rights, title and interest in and to the application, documents, technology and any derivative works thereof, including, but not limited to, all patent, copyright, trade secret, trademark and other Intellectual Property Rights associated therewith, anywhere in the world belong to Us, that rights in the application are licensed (not sold) to you, and that you have no rights in, or to, the application, documents or technology other than the right to use each of them in accordance with these Terms of Use.
            </p>
            <p style={{ marginTop: "14px" }}>
              You agree not to replicate or disseminate in any way any of the information made available on the application for any reason whatsoever except as provided in the application. You agree that if you do replicate or re-broadcast or disseminate any of the information from the application by any mean directly or indirectly, you shall be liable for actual and punitive damages, losses and claims as may be determined by Moneygyan.com and/or by Indian court of Law.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}