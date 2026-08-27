import React, { useState, useMemo, useRef, useEffect } from "react";
import clsx from "clsx";
import { motion, useSpring, useTransform } from "framer-motion";
import "./trail.css";

import { playTickSound } from "@/lib/sound";

// ---------- HELPERS ----------
const clamp = (val, min, max) => Math.min(max, Math.max(min, val));

const rangeStyle = (value, min, max) => ({
  "--range-progress": `${clamp(((value - min) / (max - min)) * 100, 0, 100)}%`,
});

// ---------- ANIMATED COUNTER COMPONENT ----------
function AnimatedNumber({ value, format = true, suffix = "" }) {
  const spring = useSpring(value, { mass: 0.5, stiffness: 120, damping: 20 });
  const display = useTransform(spring, (current) => {
    const rounded = Math.round(current) || 0;
    const formatted = format
      ? rounded.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        })
      : rounded.toLocaleString("en-IN");
    return suffix ? `${formatted} ${suffix}` : formatted;
  });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsubscribe = display.on("change", () => {
      if (Math.abs(spring.get() - value) > 1) {
        playTickSound();
      }
    });
    return () => unsubscribe();
  }, [display, value, spring]);

  return <motion.span>{display}</motion.span>;
}

// ---------- FORM INPUTS ----------
function FormattedNumberInput({ id, value, min, max, prefix, suffix, className, onChange }) {
  const [isFocused, setIsFocused] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const inputRef = useRef(null);

  const displayValue = isFocused ? draft : value.toLocaleString("en-IN");

  return (
    <div className="trail-value-box">
      {prefix && <span className="trail-prefix">{prefix}</span>}
      <input
        ref={inputRef}
        id={id}
        type="text"
        inputMode="numeric"
        className={clsx("trail-value-input", className)}
        value={displayValue}
        onFocus={() => {
          setIsFocused(true);
          setDraft(String(value));
        }}
        onChange={(e) => {
          const raw = e.target.value.replace(/[^0-9]/g, "");
          if (raw === "") {
            setDraft("");
            return;
          }
          const num = Number(raw);
          if (num > max) {
            setDraft(String(max));
            onChange(max);
          } else {
            setDraft(raw);
            onChange(num);
          }
        }}
        onBlur={() => {
          const finalValue = draft === "" ? min : clamp(Number(draft), min, max);
          onChange(finalValue);
          setIsFocused(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") inputRef.current?.blur();
        }}
      />
      {suffix && <span className="trail-unit">{suffix}</span>}
    </div>
  );
}

function DraftNumberInput({ id, value, min, max, onChange, className, suffix }) {
  const [isFocused, setIsFocused] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const inputRef = useRef(null);

  const displayValue = isFocused ? draft : String(value);

  return (
    <div className="trail-value-box">
      <input
        ref={inputRef}
        id={id}
        type="text"
        inputMode="decimal"
        className={clsx("trail-value-input", className)}
        value={displayValue}
        onFocus={() => {
          setIsFocused(true);
          setDraft(String(value));
        }}
        onChange={(e) => {
          let raw = e.target.value.replace(/[^0-9.]/g, "");
          const firstDot = raw.indexOf(".");
          if (firstDot !== -1) {
            raw = raw.slice(0, firstDot + 1) + raw.slice(firstDot + 1).replace(/\./g, "");
          }
          setDraft(raw);
          if (raw !== "" && raw !== "." && !raw.endsWith(".")) {
            const num = Number(raw);
            if (!isNaN(num)) onChange(clamp(num, min, max));
          }
        }}
        onBlur={() => {
          const num = Number(draft);
          const finalValue = isNaN(num) || draft === "" ? min : clamp(num, min, max);
          onChange(finalValue);
          setDraft(String(finalValue));
          setIsFocused(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") inputRef.current?.blur();
        }}
      />
      {suffix && <span className="trail-unit">{suffix}</span>}
    </div>
  );
}

// ==================== MAIN COMPONENT ====================
export default function Trail() {
  const [portfolio, setPortfolio] = useState(1000000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [commissionRate, setCommissionRate] = useState(0.8);
  const [years, setYears] = useState(15);

  // Calculations
  const finalAUM = useMemo(() => {
    return portfolio * Math.pow(1 + expectedReturn / 100, years);
  }, [portfolio, expectedReturn, years]);

  const cumulativeTrailEarned = useMemo(() => {
    const r = expectedReturn / 100;
    const commissionFraction = commissionRate / 100;
    const fullYears = Math.floor(years);
    const fraction = years - fullYears;

    let cumulative = 0;
    for (let t = 1; t <= fullYears; t++) {
      cumulative += portfolio * Math.pow(1 + r, t) * commissionFraction;
    }

    if (fraction > 0) {
      const t = fullYears + fraction;
      cumulative += portfolio * Math.pow(1 + r, t) * commissionFraction * fraction;
    }

    return cumulative;
  }, [portfolio, expectedReturn, commissionRate, years]);

  const monthlyTrailFinalYear = useMemo(() => {
    const annualTrail = finalAUM * (commissionRate / 100);
    return annualTrail / 12;
  }, [finalAUM, commissionRate]);

  // Dynamic Chart & Typography Metrics
  const chartMetrics = useMemo(() => {
    const numDigits = Math.round(cumulativeTrailEarned || 0).toString().length;
    const expansion = Math.min(14, Math.max(0, (numDigits - 6) * 2.5));
    const innerRadius = 72 + expansion;
    const outerRadius = 96 + expansion;

    const outerCircumference = 2 * Math.PI * outerRadius;
    const innerCircumference = 2 * Math.PI * innerRadius;

    // Percent ratios
    const trailRatio = Math.min(100, Math.max(15, (cumulativeTrailEarned / Math.max(1, finalAUM * 0.4)) * 100));
    const aumGrowthRatio = Math.min(100, Math.max(25, (finalAUM / Math.max(1, portfolio * 8)) * 100));

    const trailLength = (trailRatio / 100) * outerCircumference;
    const aumLength = (aumGrowthRatio / 100) * innerCircumference;

    const outerOffset = outerCircumference - trailLength;
    const innerOffset = innerCircumference - aumLength;

    let centerFontSize = "1.75rem";
    if (numDigits >= 14) centerFontSize = "0.95rem";
    else if (numDigits >= 12) centerFontSize = "1.08rem";
    else if (numDigits >= 10) centerFontSize = "1.22rem";
    else if (numDigits >= 9) centerFontSize = "1.35rem";
    else if (numDigits >= 8) centerFontSize = "1.48rem";
    else if (numDigits >= 7) centerFontSize = "1.62rem";

    const aumDigits = Math.round(finalAUM || 0).toString().length;
    let aumFontSize = "1.25rem";
    if (aumDigits >= 13) aumFontSize = "0.85rem";
    else if (aumDigits >= 10) aumFontSize = "0.98rem";
    else if (aumDigits >= 8) aumFontSize = "1.12rem";

    return {
      outerRadius,
      innerRadius,
      outerCircumference,
      innerCircumference,
      outerOffset,
      innerOffset,
      centerFontSize,
      aumFontSize,
    };
  }, [cumulativeTrailEarned, finalAUM, portfolio]);

  return (
    <section className="trail-section">
      <div className="trail-container">
        
        {/* Section Header */}
        <div className="trail-header">
          <span className="trail-eyebrow">THE REVENUE MODEL</span>
          <h2>
            Trail commissions <span>compound quietly.</span>
          </h2>
          <p className="trail-subtitle">
            Unlike traditional sales roles with one-time payouts, mutual fund distributors earn an
            ongoing share of the total assets managed (AUM). As your clients' wealth compounds over
            time, your trailing revenue expands dynamically alongside them.
          </p>
        </div>

        {/* Unified Luxury Card */}
        <div className="trail-unified">
          
          {/* Left Panel: Sliders & Formatted Inputs */}
          <div className="trail-inputs-col">
            <p className="trail-mode-hint">
              Adjust initial AUM, growth rate, and horizon to simulate your passive revenue stream.
            </p>

            <div className="trail-inputs-list">
              
              {/* Initial Equity AUM */}
              <div className="trail-input-group">
                <div className="trail-input-header">
                  <label htmlFor="trail-aum">Initial Equity AUM</label>
                  <FormattedNumberInput
                    id="trail-aum"
                    value={portfolio}
                    min={100000}
                    max={100000000}
                    suffix="₹"
                    onChange={setPortfolio}
                  />
                </div>
                <input
                  type="range"
                  className="trail-range-slider"
                  min={100000}
                  max={100000000}
                  step={100000}
                  value={portfolio}
                  style={rangeStyle(portfolio, 100000, 100000000)}
                  onChange={(e) => setPortfolio(Number(e.target.value))}
                />
              </div>

              {/* Expected Return */}
              <div className="trail-input-group">
                <div className="trail-input-header">
                  <label htmlFor="trail-return">Expected Annual Return</label>
                  <DraftNumberInput
                    id="trail-return"
                    value={expectedReturn}
                    min={1}
                    max={30}
                    suffix="%"
                    onChange={setExpectedReturn}
                  />
                </div>
                <input
                  type="range"
                  className="trail-range-slider"
                  min={1}
                  max={30}
                  step={0.5}
                  value={expectedReturn}
                  style={rangeStyle(expectedReturn, 1, 30)}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                />
              </div>

              {/* Commission Rate */}
              <div className="trail-input-group">
                <div className="trail-input-header">
                  <label htmlFor="trail-commission">Annual Commission Rate</label>
                  <DraftNumberInput
                    id="trail-commission"
                    value={commissionRate}
                    min={0.1}
                    max={3}
                    suffix="%"
                    onChange={setCommissionRate}
                  />
                </div>
                <input
                  type="range"
                  className="trail-range-slider"
                  min={0.1}
                  max={3}
                  step={0.05}
                  value={commissionRate}
                  style={rangeStyle(commissionRate, 0.1, 3)}
                  onChange={(e) => setCommissionRate(Number(e.target.value))}
                />
              </div>

              {/* Time Period */}
              <div className="trail-input-group">
                <div className="trail-input-header">
                  <label htmlFor="trail-years">Investment Horizon</label>
                  <DraftNumberInput
                    id="trail-years"
                    value={years}
                    min={1}
                    max={40}
                    suffix="Yrs"
                    onChange={setYears}
                  />
                </div>
                <input
                  type="range"
                  className="trail-range-slider"
                  min={1}
                  max={40}
                  step={1}
                  value={years}
                  style={rangeStyle(years, 1, 40)}
                  onChange={(e) => setYears(Number(e.target.value))}
                />
              </div>

            </div>
          </div>

          {/* Right Panel: Interactive Donut Chart & Breakdown Cards */}
          <div className="trail-chart-col">
            
            <div className="trail-chart-circle">
              <svg viewBox="0 0 240 240">
                {/* Outer ring: Cumulative Trail Payout */}
                <circle
                  cx="120"
                  cy="120"
                  r={chartMetrics.outerRadius}
                  className={clsx("trail-chart-bg", "trail-chart-bg-outer")}
                />
                <circle
                  cx="120"
                  cy="120"
                  r={chartMetrics.outerRadius}
                  className="trail-chart-trail"
                  strokeDasharray={`${chartMetrics.outerCircumference} ${chartMetrics.outerCircumference}`}
                  strokeDashoffset={chartMetrics.outerOffset}
                  transform="rotate(-90 120 120)"
                />

                {/* Inner ring: AUM Expansion */}
                <circle
                  cx="120"
                  cy="120"
                  r={chartMetrics.innerRadius}
                  className={clsx("trail-chart-bg", "trail-chart-bg-inner")}
                />
                <circle
                  cx="120"
                  cy="120"
                  r={chartMetrics.innerRadius}
                  className="trail-chart-aum"
                  strokeDasharray={`${chartMetrics.innerCircumference} ${chartMetrics.innerCircumference}`}
                  strokeDashoffset={chartMetrics.innerOffset}
                  transform="rotate(-90 120 120)"
                />
              </svg>

              <div
                className="trail-chart-center"
                style={{ "--trail-center-font-size": chartMetrics.centerFontSize }}
              >
                <h2><AnimatedNumber value={cumulativeTrailEarned} /></h2>
                <p>Est. Trail Earnings</p>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="trail-legend">
              <div className="trail-legend-item">
                <span className={clsx("trail-legend-dot", "trail-dot")}></span>
                <span>Cumulative Trail</span>
              </div>
              <div className="trail-legend-item">
                <span className={clsx("trail-legend-dot", "aum-dot")}></span>
                <span>AUM Expansion</span>
              </div>
            </div>

            {/* Breakdown Mini Tiles */}
            <div className="trail-chart-details">
              <div className="trail-result-grid">
                <div className="trail-mini-result">
                  <span>Final Client AUM</span>
                  <strong style={{ fontSize: chartMetrics.aumFontSize }}>
                    <AnimatedNumber value={finalAUM} />
                  </strong>
                </div>

                <div className="trail-mini-result">
                  <span>Monthly Trail (Yr {years})</span>
                  <strong>
                    <AnimatedNumber value={monthlyTrailFinalYear} />
                  </strong>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}