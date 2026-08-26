import React from "react";
import { ShieldCheck, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";
import "./PartnerCSS/Features.css";

const FEATURE_CARDS = [
  {
    icon: ShieldCheck,
    tag: "Fund-Neutral",
    title: "AMFI-Registered",
    highlight: "100% AMC Agnostic",
    desc: "A fund-neutral distribution platform with zero bias towards any single AMC. Built for absolute objectivity and client trust.",
    glowColor: "rgba(6, 182, 212, 0.22)",
    iconBg: "linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(14, 165, 233, 0.08))",
    iconColor: "var(--primary)",
  },
  {
    icon: TrendingUp,
    tag: "Aligned Incentives",
    title: "Trail-Only Model",
    highlight: "Compounding Revenue",
    desc: "Earn recurring trail commissions as your clients' wealth compounds, creating an enduring asset without transaction churn.",
    glowColor: "rgba(139, 92, 246, 0.22)",
    iconBg: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.08))",
    iconColor: "var(--secondary)",
  },
  {
    icon: Sparkles,
    tag: "Zero Capex",
    title: "₹ 0 Setup Cost",
    highlight: "Turnkey Platform",
    desc: "Launch a digital, paperless mutual fund distribution business with zero platform fees and complete empanelment support.",
    glowColor: "rgba(56, 189, 248, 0.22)",
    iconBg: "linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(6, 182, 212, 0.08))",
    iconColor: "#0284c7",
  },
];

export default function Features() {
  return (
    <div className="partner-features-grid">
      {FEATURE_CARDS.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div className="partner-feature-card" key={idx}>
            <div
              className="card-ambient-glow"
              style={{ background: `radial-gradient(circle at 50% 0%, ${card.glowColor}, transparent 70%)` }}
            />
            
            <div className="card-top-row">
              <div className="card-icon-box" style={{ background: card.iconBg, color: card.iconColor }}>
                <Icon size={24} />
              </div>
              <span className="card-badge">{card.tag}</span>
            </div>

            <div className="card-body">
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.desc}</p>
            </div>

            <div className="card-footer">
              <div className="card-highlight-pill">
                <CheckCircle2 size={14} className="check-icon" />
                <span>{card.highlight}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}


