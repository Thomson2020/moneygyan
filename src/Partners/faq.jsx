import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./PartnerCSS/FAQ.css"

export default function FAQ() {
  const [open, setOpen] = useState(-1);

  const faqs = [
    {
      q: "Do I need a finance background?",
      a: "No. Many successful partners started in insurance, accounting, sales, teaching, or completely unrelated fields. What matters most is trust, consistency, and completing the NISM certification process."
    },
    {
      q: "Is NISM-V-A certification and an ARN mandatory?",
      a: "Yes. To distribute mutual funds in India, you must clear the NISM-V-A exam and obtain an ARN registration."
    },
    {
      q: "Can I do this part-time?",
      a: "Yes. Many partners begin alongside their existing profession and gradually build a client base."
    },
    {
      q: "How and when am I paid?",
      a: "You earn trail commissions from assets under management. Revenue grows as your clients remain invested."
    },
    {
      q: "Is there any cost to join MoneyGYAN?",
      a: "No significant capital investment is required. We help you get started with the required certification and onboarding process."
    },
    {
      q: "Does MoneyGYAN offer investment advice?",
      a: "MoneyGYAN provides the platform, processes, and support. All activities must comply with applicable AMFI and SEBI regulations."
    }
  ];

  return (
    <section className="partner-faq-section">
      <span className="partner-faq-eyebrow">QUESTIONS</span>
      <h2>Before you apply</h2>

      <div className="partner-faq-list">
        {faqs.map((item, index) => {
          const isOpen = open === index;
          
          return (
            <div 
              key={index} 
              className="partner-faq-item"
              // Open when mouse enters the container zone
              onMouseEnter={() => setOpen(index)}
              // Close when mouse leaves the container zone
              onMouseLeave={() => setOpen(-1)}
              style={{ paddingBottom: "8px" }} // Subtle padding prevents accidental mouse-leave gaps
            >
              <div
                className="partner-faq-question"
                aria-expanded={isOpen}
                style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  width: "100%",
                  textAlign: "left"
                }}
              >
                <span>{item.q}</span>
                <span
                  className={`partner-faq-icon ${isOpen ? "partner-faq-icon-open" : ""}`}
                  style={{
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                    display: "inline-block"
                  }}
                >
                  ›
                </span>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="partner-faq-answer">
                      <p style={{ margin: "8px 0 0 0" }}>{item.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}