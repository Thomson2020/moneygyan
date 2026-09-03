import { useState } from "react";
import "./faqpage.css";

const faqs = [
  {
    question: "What services does MoneyGYAN provide?",
    answer: "MoneyGYAN is an AMFI-registered Mutual Fund Distributor providing an intelligent, transparent platform for both individual investors and distribution partners. For investors, we offer goal-based mutual fund planning, portfolio tracking, and seamless paperless transactions across all major AMCs. For partners, we provide digital onboarding, client management tools, and an end-to-end platform to build a recurring trail-based distribution business."
  },
  {
    question: "Who does MoneyGYAN work with?",
    answer: "We serve two key audiences across India and globally: 1) Individual Investors (salaried professionals, business owners, retirees, and NRIs) seeking disciplined, research-backed mutual fund wealth creation without demat complexities; and 2) Distribution Partners (insurance advisors, CAs, tax consultants, and aspiring distributors) looking to build or scale a modern, paperless distribution business."
  },
  {
    question: "Who are your ideal clients and partners?",
    answer: "For investors, we love working with individuals who value financial knowledge ('Gyan'), practice long-term discipline, and tune out short-term market noise. For partners, our ideal associates are ethical, client-first professionals committed to growing transparent, enduring advisory practices."
  },
  {
    question: "Who might not be the right fit for MoneyGYAN?",
    answer: "We are not the right fit for speculative traders chasing overnight riches, day-to-day market timers, or anyone looking for speculative hot tips. We believe true wealth is built steadily through thoughtful asset allocation, patience, and compounding over time."
  },
  {
    question: "What does MoneyGYAN not do?",
    answer: "We don’t predict daily market swings, promise unrealistic guaranteed returns, churn portfolios for transaction commissions, or push proprietary in-house products. As a fund-neutral platform, our recommendations are driven purely by suitability, research, and your long-term financial goals."
  },
  {
    question: "Do you serve clients and partners outside Mumbai?",
    answer: "Absolutely. While our registered office is located in Vashi, Navi Mumbai, our platform is 100% digital and paperless. We serve investors and partners across all states in India as well as NRIs across 25+ countries globally through secure online onboarding and virtual reviews."
  },
  {
    question: "What is the core philosophy behind MoneyGYAN?",
    answer: "Our founding principle is 'Gyan Before Product.' Money is one of life’s most powerful tools, but without financial wisdom ('Gyan'), even high earnings get eroded. We believe informed investors make rational decisions, fewer portfolio churns yield higher net returns, and compounding works best when given uninterrupted time."
  },
  {
    question: "How do your investors build long-term wealth successfully?",
    answer: "Successful wealth creation comes from three pillars: clarity in life goals, conviction in asset allocation, and consistency in continuing investments through market cycles. By staying disciplined and avoiding panic during normal market corrections, our investors harness the full compounding power of Indian equities."
  },
  {
    question: "Where is MoneyGYAN located and how can I reach you?",
    answer: "Our registered office is located at 308, 3rd Floor, Thacker Tower, Sector 17, Vashi, Navi Mumbai – 400703. You can reach our dedicated support desk via phone at 022-4454-4475, email at info@moneygyan.com, or schedule an online session directly through our website."
  },
  {
    question: "Can I invest in direct stocks through MoneyGYAN?",
    answer: "We do not offer direct stock broking. We specialize exclusively in Mutual Funds and professionally managed portfolios. We believe diversified, professionally managed mutual funds provide the most consistent, risk-adjusted vehicle for long-term wealth accumulation for the vast majority of investors."
  },
  {
    question: "Can you review my existing mutual fund or insurance portfolio?",
    answer: "Yes. When you onboard with MoneyGYAN, we provide a holistic portfolio health check. We analyze your existing scheme allocation, fund overlap, expense ratios, and risk profile to align your existing holdings with your future financial goals."
  },
  {
    question: "What kind of returns can I expect on mutual fund investments?",
    answer: "Equity mutual funds in India have historically delivered inflation-beating annualized returns of 12%–15% over 7 to 10+ year horizons, while debt funds provide stability. Returns depend on chosen asset classes, market cycles, and staying power. We focus on maximizing net real returns tailored to your risk appetite."
  },
  {
    question: "How safe is my money when investing via MoneyGYAN?",
    answer: "Your funds are 100% safe. MoneyGYAN never holds or handles client funds directly. All transaction payments flow directly from your registered bank account to SEBI-regulated Clearing Corporations (such as NSE NMF II or BSE StAR MF) and the respective Asset Management Companies (AMCs). Your units are held directly with the mutual fund registrars (CAMS/KFintech)."
  },
  {
    question: "Do I need a demat account? How does digital onboarding work?",
    answer: "No demat account is required. Our onboarding is 100% digital, paperless, and takes just a few minutes using your PAN, Aadhaar KYC, and bank details. Once verified, a One-Time Bank Mandate (OTBM) enables hassle-free automated SIPs and instant lump-sum investments."
  },
  {
    question: "What happens to my investments if MoneyGYAN ever shuts down?",
    answer: "Your investments remain completely unaffected and secure. All mutual fund units are held in your legal name directly with the respective AMCs and registrars (CAMS/KFintech), fully protected under AMFI and SEBI regulations. You retain full ownership and direct access to your funds at all times."
  },
  {
    question: "What support and communication do investors receive?",
    answer: "You receive access to a modern digital dashboard for real-time portfolio tracking, periodic performance reports, capital gains statements, and direct access to our relationship managers and support desk via phone, email, and WhatsApp for prompt assistance."
  },
  {
    question: "How is MoneyGYAN different from traditional banks and brokerages?",
    answer: "Unlike banks driven by high monthly sales quotas and rotating relationship managers, MoneyGYAN is a dedicated, fund-neutral platform with zero product bias. We do not push proprietary products, and our trail-based alignment means we only thrive when your portfolio continues to grow over the long term."
  },
  {
    question: "What is your business model? How does MoneyGYAN earn?",
    answer: "MoneyGYAN charges zero fees to investors for account opening, platform usage, or ongoing servicing. As an AMFI-registered distributor, we receive a transparent trail commission directly from the Asset Management Companies (AMCs) from the scheme’s built-in expense ratio as long as you stay invested."
  },
  {
    question: "If I already have an existing advisor or distributor, can I switch to MoneyGYAN?",
    answer: "Yes. If you are seeking a more transparent, modern digital experience with active research support, we can seamlessly transfer your existing mutual fund folios under our ARN (ARN-144200) without any redemptions or tax consequences."
  },
  {
    question: "How does MoneyGYAN select and research mutual funds?",
    answer: "Our research framework evaluates both qualitative and quantitative metrics: rolling returns over multiple market cycles, risk-adjusted ratios (Sharpe, Sortino, Alpha), fund manager track record, portfolio concentration, and AMC governance. We focus on consistent quartile performers rather than short-term flavor-of-the-month funds."
  },
  {
    question: "Can you help me pick the single 'best' fund in the market?",
    answer: "There is no single 'best' fund for everyone. Long-term wealth creation is 90% driven by asset allocation (the right blend of Large, Mid, Small-cap equity, debt, and hybrid funds matched to your time horizon) and only 10% by specific scheme selection. We build balanced portfolios designed to perform across diverse economic environments."
  },
  {
    question: "I currently invest in Direct Plans. Can I use MoneyGYAN?",
    answer: "Direct Plans require self-management, self-rebalancing, and manual tracking directly across dozens of individual fund portals. On MoneyGYAN, we distribute Regular Plans, providing comprehensive portfolio tracking, automated rebalancing recommendations, tax statements, and dedicated human support under one unified platform."
  },
  {
    question: "How can I transfer my existing Regular Plan portfolio to MoneyGYAN?",
    answer: "Transferring is 100% paperless. With your simple online consent, we map your existing mutual fund folios under MoneyGYAN’s ARN. Your investments remain intact with zero tax impact, zero exit loads, and zero disruption to your active SIPs."
  },
  {
    question: "Does MoneyGYAN charge any upfront advisory or subscription fees?",
    answer: "No. We do not charge upfront advisory fees, platform subscription charges, or hidden maintenance costs. Our platform is completely free to open and operate."
  },
  {
    question: "What AMCs and mutual fund schemes are available on MoneyGYAN?",
    answer: "We offer complete access to every SEBI-registered Asset Management Company (AMC) in India—including SBI, HDFC, ICICI Prudential, Nippon India, Kotak, Axis, Mirae Asset, Parag Parikh, UTI, Tata, and more—across Equity, Debt, Hybrid, ELSS Tax-Saver, and Index categories."
  },
  {
    question: "What is the MoneyGYAN Partner Program and how do I join?",
    answer: "The MoneyGYAN Partner Program empowers independent financial advisors, CAs, insurance agents, and distributors to build their own mutual fund distribution business. We provide a full digital tech suite, seamless client onboarding, automated reporting, and transparent recurring trail revenue sharing. You can register via our Partners page in minutes."
  }
];

export default function FaqPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="faqpage-section">
      <div className="faqpage-container">
        
        <header className="faqpage-header">
          <span className="faqpage-eyebrow">FAQ</span>
          <h2 className="faqpage-title">
            Questions? <br />
            <span> We've got answers.</span>
          </h2>
          <p className="faqpage-subtitle">
            Everything you need to know about investing, planning,
            and working with us.
          </p>
        </header>

        <div className="faqpage-list">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            
            return (
              <div
                key={index}
                className={`faqpage-item ${isOpen ? "open" : ""}`}
                onMouseEnter={() => setOpenFaq(index)}
                onMouseLeave={() => setOpenFaq(null)}
              >
                <div className="faqpage-item-header">
                  <h3>{faq.question}</h3>
                  <span
                    className="faqpage-toggle-btn"
                    aria-hidden="true"
                    style={{
                      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                      display: "inline-block",
                    }}
                  >
                    ›
                  </span>
                </div>

                {/* Smooth expanding grid wrapper */}
                <div className={`faqpage-body-wrapper ${isOpen ? "open" : ""}`}>
                  <div className="faqpage-body-inner">
                    <div className="faqpage-body">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}