import React from "react";
import { Compass, GraduationCap, Cpu } from "lucide-react";
import Features from "./pp2";
import Howitworks from "./howitworks"; 
import Whoisitfor from "./whoisitfor";
import Trail from "./trail";
import Opportunity from "./opp";
import Whatyouget from "./whatyouget";
import FAQ from "./faq";
import Form from "./form";
import Philosophy from "./Philosophy";
import "./PartnerCSS/Partners.css";

const PILLARS = [
  {
    tag: "Core Focus",
    icon: Compass,
    title: "One Product, Understood Properly",
    body: "No insurance, no loans, no cross-selling clutter. Just mutual funds executed with institutional discipline.",
  },
  {
    tag: "Certification",
    icon: GraduationCap,
    title: "Full Certification Support",
    body: "End-to-end guidance through NISM Series V-A preparation and securing your official ARN registration with AMFI.",
  },
  {
    tag: "Technology",
    icon: Cpu,
    title: "A Ready-Made Platform",
    body: "Paperless onboarding, live client portfolio analytics, automated reporting, and complete back-office ready on day one.",
  },
];

export default function Partners() {
  return (
    <>
      <section className="partner">
        <div className="partner-header">
          <span className="partner-eyebrow">WHY PARTNER WITH MONEYGYAN</span>
          <h1>
            Build a business around
            <br />
            <span>trust, not transactions.</span>
          </h1>
          <p className="partner-lead">
            Become an AMFI-registered mutual fund distributor with institutional technology, client-aligned incentives, and a turnkey platform.
          </p>
        </div>

        <Features />

        <div className="partner-rail-wrapper">
          <div className="partner-rail">
            {PILLARS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div className="partner-rail-item" key={idx}>
                  <div className="partner-rail-top">
                    <div className="partner-rail-icon">
                      <Icon size={20} />
                    </div>
                  </div>
                  <div className="partner-text-block">
                    <span className="rail-item-tag">{p.tag}</span>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Howitworks />
      <Opportunity />
      <Whoisitfor />
      <Trail />
      <Whatyouget />
      <Philosophy />
      <FAQ />
      <Form />
    </>
  );
}