import { useState } from "react";
import "./HomeCSS/TestimonialsFAQ.css";
import { cn } from "@/lib/utils";

export default function TestimonialsFAQ() {
  const [openFaq, setOpenFaq] = useState(null);

  const testimonials = [
    {
      initial: "R",
      avatarColor: "avatar-orange",
      quote:
        "\"Mujhe pehle invest karna bahut complicated lagta था. MoneyGYAN ने सब आसान कर दिया। Ab ₹500 से start किया है, और returns dekh ke khushi ho rahi है!\"",
      name: "Rohit Sharma",
      role: "Delhi · Gig Delivery Partner",
    },
    {
      initial: "P",
      avatarColor: "avatar-green",
      quote:
        "\"The 60-second KYC is actually real! I set up my SIP on my lunch break. No branch, no queue, no headache. My FD money has now moved here.\"",
      name: "Priya Nair",
      role: "Mumbai · Freelance Designer",
    },
    {
      initial: "A",
      avatarColor: "avatar-blue",
      quote:
        "\"Started with ₹100 just to test. Now investing ₹3,000 every month. The calculator showed me exactly how much I was losing keeping money in a savings account.\"",
      name: "Arun Patel",
      role: "Ahmedabad · Small Business Owner",
    },
  ];

  const faqs = [
    {
      question: "Are there any hidden platform charges or commission fees?",
      answer:
        "No, MoneyGYAN is completely free to use for investors. We deal in direct mutual funds, meaning there are zero distributor commissions or hidden intermediary fees cutting into your returns.",
    },
    {
      question: "Can I stop, pause, or modify my SIP anytime?",
      answer:
        "Yes, you have full control over your investments. You can pause, stop, or step up your monthly SIP amount at any time with zero penalties or exit charges from our side.",
    },
    {
      question: "How is my money taxed when I withdraw?",
      answer:
        "Taxation depends on the type of mutual fund and how long you stay invested. For Equity funds, gains redeemed within 1 year are taxed at 20% (STCG), while gains after 1 year above ₹1.25 lakh are taxed at 12.5% (LTCG). Debt funds are taxed according to your income tax slab.",
    },
    {
      question: "What documents are required to complete the 60-second KYC?",
      answer:
        "Since most users in India are already KYC-compliant via Aadhaar and PAN database integration, you only need your PAN card number and Aadhaar-linked mobile number for quick OTP verification.",
    },
    {
      question: "Can I invest in lump sum instead of a monthly SIP?",
      answer:
        "Yes, you can choose either a monthly SIP or a one-time lump sum investment depending on your financial goals and available capital.",
    },
    {
      question: "Is my money safe?",
      answer:
        "Yes. All mutual fund transactions are processed directly via SEBI-regulated depositories and Asset Management Companies (AMCs). We never hold your investment funds directly.",
    },
  ];

  return (
    <div className="tf-wrapper">
      {/* =========================================
          SECTION 1: TESTIMONIALS
      ========================================= */}
      <section className="testimonials-section">
        <div className="tf-container">
          <h2 className="tf-title">
            What our investors <span>say</span>
          </h2>

          <div className="testimonials-grid">
            {testimonials.map((item, index) => (
              <div className="testimonial-card" key={index}>
                <div className={`avatar-circle ${item.avatarColor}`}>
                  {item.initial}
                </div>
                <p className="testimonial-quote">{item.quote}</p>
                <div className="testimonial-author">
                  <h4>{item.name}</h4>
                  <span>{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: FAQ ACCORDION (HOVER TO OPEN)
      ========================================= */}
      <section className="home-faq-section">
        <div className={cn('tf-container', 'home-faq-container')}>
          <h2 className="tf-title">
            Questions? <br />We&apos;ve got <span>answers.</span>
          </h2>

  <div className="home-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`home-faq-item ${isOpen ? "open" : ""}`}
                  onMouseEnter={() => setOpenFaq(index)}
                  onMouseLeave={() => setOpenFaq(null)}
                >
                  <div className="home-faq-header">
                    <h3>{faq.question}</h3>
                    <span
                      className="home-faq-toggle-btn"
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
                  <div className={`home-faq-body-wrapper ${isOpen ? "open" : ""}`}>
                    <div className="home-faq-body-inner">
                      <div className="home-faq-body">
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
    </div>
  );
}