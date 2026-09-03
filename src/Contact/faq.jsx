import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CFAQ() {
  const [open, setOpen] = useState(-1);

  const faqs = [
    {
      question: "How quickly will I hear back?",
      answer:
        "We reply to every serious enquiry within 2 working days. For urgent account servicing, calling our direct phone desk during working hours provides instant assistance.",
    },
    {
      question: "I already have a folio with MoneyGYAN. Where do I go?",
      answer:
        "Log in directly at our client portal to view live portfolio valuations, download capital gains statements, or initiate fresh SIPs without waiting on email.",
    },
    {
      question: "Can I visit the Navi Mumbai office in person?",
      answer:
        "You are welcome to visit during office hours. We recommend calling ahead so our advisory team can ensure the right representative is available to assist you.",
    },
    {
      question: "Does MoneyGYAN offer personalized advice over email or phone?",
      answer:
        "MoneyGYAN operates as an AMFI-registered Mutual Fund Distributor. We provide platform guidance, fund comparison metrics, and operational support in accordance with AMFI's Code of Conduct.",
    },
  ];

  return (
    <section className="contact-faq-section">
      <div className="contact-faq-header">
        <span className="contact-faq-eyebrow">— FREQUENTLY ASKED</span>
        <h2>Before you write in</h2>
        <p className="contact-faq-subtitle">
          Quick answers to common questions about accounts, appointments, and servicing.
        </p>
      </div>

      <div className="contact-faq-list">
        {faqs.map((item, index) => {
          const isOpen = open === index;
          return (
            <div
              key={index}
              className={`contact-faq-item ${isOpen ? "is-active" : ""}`}
              onMouseEnter={() => setOpen(index)}
              onMouseLeave={() => setOpen(-1)}
            >
              <button
                type="button"
                className="contact-faq-question"
                onClick={() => setOpen(isOpen ? -1 : index)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>

                <span className={`contact-faq-icon ${isOpen ? "contact-faq-icon-open" : ""}`}>
                  ›
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="contact-faq-answer contact-faq-answer-open">
                      <p>{item.answer}</p>
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