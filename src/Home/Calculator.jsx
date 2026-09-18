import React, { useState, useMemo, useRef, useEffect } from "react";
import "./HomeCSS/Calculator.css";
import clsx from "clsx";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

import { playTickSound } from "@/lib/sound";

// ---------- HELPERS ----------

const clamp = (val, min, max) => Math.min(max, Math.max(min, val));

const rangeStyle = (value, min, max) => ({
  "--range-progress": `${clamp(((value - min) / (max - min)) * 100, 0, 100)}%`,
});

// ---------- ANIMATED COUNTER COMPONENT ----------

function AnimatedNumber({ value, format = true }) {
  const count = useMotionValue(value);
  const display = useTransform(count, (current) => {
    const rounded = Math.round(current) || 0;
    return format
      ? rounded.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })
      : rounded;
  });

  useEffect(() => {
    if (count.get() === value) return;

    const controls = animate(count, value, {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1], // Crisp, fluid deceleration curve
      onUpdate: () => {
        playTickSound(0.095, 60);
      },
    });

    return () => controls.stop();
  }, [value, count]);

  return <motion.span>{display}</motion.span>;
}

// ---------- FORM INPUTS ----------

function FormattedNumberInput({ id, value, min, max, prefix, suffix, className, onChange }) {
  const [isFocused, setIsFocused] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const inputRef = useRef(null);

  const displayValue = isFocused ? draft : value.toLocaleString("en-IN");

  return (
    <div className="calc-value-box">
      {prefix && <span className="calc-prefix">{prefix}</span>}
      <input
        ref={inputRef}
        id={id}
        type="text"
        inputMode="numeric"
        className={clsx("calc-value-input", className)}
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
      {suffix && <span className="calc-unit">{suffix}</span>}
    </div>
  );
}

function DraftNumberInput({ id, value, min, max, onChange, className }) {
  const [isFocused, setIsFocused] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const inputRef = useRef(null);

  const displayValue = isFocused ? draft : String(value);

  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      inputMode="decimal"
      className={clsx("calc-value-input", className)}
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

        if (raw === "" || raw === ".") {
          setDraft(raw);
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
        const finalValue = draft === "" || draft === "." ? min : clamp(Number(draft), min, max);
        onChange(finalValue);
        setDraft(String(finalValue));
        setIsFocused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") inputRef.current?.blur();
      }}
    />
  );
}

// ---------- MAIN CALCULATOR ----------

export default function Calculator() {
  const [mode, setMode] = useState("sip");

  // SIP Inputs
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [returnRate, setReturnRate] = useState(12);
  const [years, setYears] = useState(20);

  // Goal / Duration Inputs
  const [targetAmount, setTargetAmount] = useState(1000000);

  // 1. SIP Mode Calculation
  const sip = useMemo(() => {
    const r = Math.pow(1 + returnRate / 100, 1 / 12) - 1;
    const n = years * 12;

    const invested = monthlyInvestment * n;
    const futureValue =
      r === 0
        ? invested
        : monthlyInvestment * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const gain = Math.max(0, futureValue - invested);

    return {
      invested,
      gain,
      total: futureValue,
      label: "Est. Future Value",
      isEmpty: monthlyInvestment === 0,
    };
  }, [monthlyInvestment, returnRate, years]);

  // 2. Goal SIP Calculation
  const goalSip = useMemo(() => {
    const r = Math.pow(1 + returnRate / 100, 1 / 12) - 1;
    const months = years * 12;
    if (months === 0) {
      return { valid: false, monthlySip: 0, invested: 0, gain: 0, total: targetAmount, label: "Target Amount" };
    }

    const rawMonthlySip =
      r === 0
        ? targetAmount / months
        : (targetAmount * r) / ((Math.pow(1 + r, months) - 1) * (1 + r));

    const valid = isFinite(rawMonthlySip) && rawMonthlySip >= 0;
    const monthlySip = valid ? Math.round(rawMonthlySip) : 0;
    const invested = valid ? monthlySip * months : 0;
    const fv = valid
      ? r === 0
        ? invested
        : monthlySip * (((Math.pow(1 + r, months) - 1) / r) * (1 + r))
      : 0;
    const gain = Math.max(0, Math.floor(fv - invested));

    return {
      valid,
      monthlySip,
      invested,
      gain,
      total: targetAmount,
      label: "Target Amount",
      isEmpty: false,
    };
  }, [targetAmount, returnRate, years]);

  // 3. Duration Calculation
  const duration = useMemo(() => {
    const r = Math.pow(1 + returnRate / 100, 1 / 12) - 1;

    if (monthlyInvestment === 0) {
      return { valid: false, reason: "empty", invested: 0, gain: 0, total: targetAmount, label: "Target Amount" };
    }

    if (r === 0) {
      const exactMonths = targetAmount / monthlyInvestment;
      const roundedMonths = Math.ceil(exactMonths);
      const safeMonths = Math.max(1, roundedMonths);
      return {
        valid: true,
        months: safeMonths,
        years: Math.floor(safeMonths / 12),
        remainingMonths: safeMonths % 12,
        immediate: exactMonths < 1,
        invested: targetAmount,
        gain: 0,
        total: targetAmount,
        label: "Target Amount",
        isEmpty: false,
      };
    }

    const logArg = (targetAmount * r) / (monthlyInvestment * (1 + r)) + 1;

    if (!isFinite(logArg) || logArg <= 0) {
      return { valid: false, reason: "unreachable", invested: 0, gain: 0, total: targetAmount, label: "Target Amount" };
    }

    const exactMonths = Math.log(logArg) / Math.log(1 + r);

    if (!isFinite(exactMonths) || exactMonths < 0) {
      return { valid: false, reason: "unreachable", invested: 0, gain: 0, total: targetAmount, label: "Target Amount" };
    }

    if (exactMonths < 1 || monthlyInvestment >= targetAmount) {
      return {
        valid: true,
        months: 1,
        years: 0,
        remainingMonths: 1,
        immediate: true,
        invested: targetAmount,
        gain: 0,
        total: targetAmount,
        label: "Target Amount",
        isEmpty: false,
      };
    }

    // Continuous investment amount to ensure smooth circle animations without discrete jumps
    const rawInvested = monthlyInvestment * exactMonths;
    const invested = Math.min(targetAmount, Math.max(0, Math.round(rawInvested)));
    const gain = Math.max(0, targetAmount - invested);

    // Human-readable integer duration for result card
    const roundedMonths =
      exactMonths - Math.floor(exactMonths) < 0.05
        ? Math.floor(exactMonths)
        : Math.ceil(exactMonths);

    const safeMonths = Math.max(1, roundedMonths);

    return {
      valid: true,
      months: safeMonths,
      years: Math.floor(safeMonths / 12),
      remainingMonths: safeMonths % 12,
      immediate: false,
      invested,
      gain,
      total: targetAmount,
      label: "Target Amount",
      isEmpty: false,
    };
  }, [targetAmount, monthlyInvestment, returnRate]);

  // Unified chart state switching based on active mode
  const currentChartData = useMemo(() => {
    let source = sip;
    if (mode === "goal") source = goalSip;
    if (mode === "duration") source = duration;

    const total = source.total || 0;
    const invested = source.invested || 0;
    const gain = source.gain || 0;

    const investedPercent =
      total === 0 ? 0 : Math.min(100, Math.max(0, (invested / total) * 100));
    const gainPercent =
      total === 0 ? 0 : Math.min(100, Math.max(0, (gain / total) * 100));

    const numDigits = Math.round(total || 0).toString().length;
    const expansion = Math.min(14, Math.max(0, (numDigits - 6) * 2.5));
    const innerRadius = 72 + expansion;
    const outerRadius = 96 + expansion;

    const outerCircumference = 2 * Math.PI * outerRadius;
    const innerCircumference = 2 * Math.PI * innerRadius;

    const investedLength = (investedPercent / 100) * outerCircumference;
    const gainLength = (gainPercent / 100) * innerCircumference;

    const investedOffset = Math.max(0, outerCircumference - investedLength);
    const gainOffset = Math.max(0, innerCircumference - gainLength);

    let centerFontSize = "1.75rem";
    if (numDigits >= 14) centerFontSize = "0.95rem";
    else if (numDigits >= 12) centerFontSize = "1.08rem";
    else if (numDigits >= 10) centerFontSize = "1.22rem";
    else if (numDigits >= 9) centerFontSize = "1.35rem";
    else if (numDigits >= 8) centerFontSize = "1.48rem";
    else if (numDigits >= 7) centerFontSize = "1.62rem";

    const investedDigits = Math.round(invested || 0).toString().length;
    const gainDigits = Math.round(gain || 0).toString().length;

    let investedFontSize = "1.25rem";
    if (investedDigits >= 13) investedFontSize = "0.85rem";
    else if (investedDigits >= 10) investedFontSize = "0.98rem";
    else if (investedDigits >= 8) investedFontSize = "1.12rem";

    let gainFontSize = "1.25rem";
    if (gainDigits >= 14) gainFontSize = "0.80rem";
    else if (gainDigits >= 12) gainFontSize = "0.88rem";
    else if (gainDigits >= 10) gainFontSize = "0.98rem";
    else if (gainDigits >= 8) gainFontSize = "1.12rem";

    return {
      total,
      invested,
      gain,
      label: source.label,
      outerRadius,
      innerRadius,
      outerCircumference,
      innerCircumference,
      investedOffset,
      gainOffset,
      centerFontSize,
      investedFontSize,
      gainFontSize,
      isEmpty: source.isEmpty,
    };
  }, [mode, sip, goalSip, duration]);

  return (
    <section className="calculator-section">
      <div className="calculator-container">
        <div className="calculator-header">
          <p className="calculator-eyebrow">FINANCIAL TOOLS</p>
          <h2>
            Investment Calculator
          </h2>

          <div className="calculator-tabs" role="tablist" aria-label="Calculator mode">
            <button
              role="tab"
              aria-selected={mode === "sip"}
              className={mode === "sip" ? "active" : ""}
              onClick={() => setMode("sip")}
            >
              SIP Calculator
            </button>
            <button
              role="tab"
              aria-selected={mode === "goal"}
              className={mode === "goal" ? "active" : ""}
              onClick={() => setMode("goal")}
            >
              Goal SIP
            </button>
            <button
              role="tab"
              aria-selected={mode === "duration"}
              className={mode === "duration" ? "active" : ""}
              onClick={() => setMode("duration")}
            >
              Duration
            </button>
          </div>
        </div>

        <div className="calculator-unified">
          <div className="calculator-inputs-col">
            {mode === "sip" && (
              <>
                <p className="mode-hint">See what your monthly SIP could grow into over time.</p>

                <div className="calc-input-group">
                  <div className="calc-input-header">
                    <label htmlFor="sip-monthly">Monthly Investment</label>
                    <FormattedNumberInput
                      id="sip-monthly"
                      value={monthlyInvestment}
                      min={0}
                      max={100000000}
                      suffix="₹"
                      onChange={setMonthlyInvestment}
                    />
                  </div>
                  <input
                    aria-labelledby="sip-monthly"
                    type="range"
                    className="calc-range-slider"
                    min="0"
                    max="100000000"
                    step="500"
                    value={monthlyInvestment}
                    style={rangeStyle(monthlyInvestment, 0, 100000000)}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  />
                </div>

                <div className="calc-input-group">
                  <div className="calc-input-header">
                    <label htmlFor="sip-rate">Expected Return</label>
                    <div className="calc-value-box">
                      <DraftNumberInput
                        id="sip-rate"
                        value={returnRate}
                        min={0}
                        max={20}
                        onChange={setReturnRate}
                      />
                      <span className="calc-unit">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    className="calc-range-slider"
                    min="0"
                    max="20"
                    step="0.5"
                    value={returnRate}
                    style={rangeStyle(returnRate, 0, 20)}
                    onChange={(e) => setReturnRate(Number(e.target.value))}
                  />
                </div>

                <div className="calc-input-group">
                  <div className="calc-input-header">
                    <label htmlFor="sip-years">Investment Period</label>
                    <div className="calc-value-box">
                      <DraftNumberInput
                        id="sip-years"
                        value={years}
                        min={1}
                        max={50}
                        onChange={setYears}
                      />
                      <span className="calc-unit">Yrs</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    className="calc-range-slider"
                    min="1"
                    max="50"
                    value={years}
                    style={rangeStyle(years, 1, 50)}
                    onChange={(e) => setYears(Number(e.target.value))}
                  />
                </div>

                {sip.isEmpty ? (
                  <div className="empty-state">
                    Enter a monthly amount above to see your projected returns.
                  </div>
                ) : (
                  <div className="calc-results">
                    <div className={clsx("calc-result-card", "primary")}>
                      <span className="calc-result-label">Future Portfolio Value</span>
                      <h2><AnimatedNumber value={sip.total} /></h2>
                    </div>
                  </div>
                )}
              </>
            )}

            {mode === "goal" && (
              <>
                <p className="mode-hint">
                  Tell us your target and timeframe, and we'll work out the monthly SIP needed.
                </p>

                <div className="calc-input-group">
                  <div className="calc-input-header">
                    <label htmlFor="goal-target">Target Amount</label>
                    <FormattedNumberInput
                      id="goal-target"
                      value={targetAmount}
                      min={100000}
                      max={100000000}
                      suffix="₹"
                      className="large-input"
                      onChange={setTargetAmount}
                    />
                  </div>
                  <input
                    type="range"
                    className="calc-range-slider"
                    min="100000"
                    max="100000000"
                    step="50000"
                    value={targetAmount}
                    style={rangeStyle(targetAmount, 100000, 100000000)}
                    onChange={(e) => setTargetAmount(Number(e.target.value))}
                  />
                </div>

                <div className="calc-input-group">
                  <div className="calc-input-header">
                    <label htmlFor="goal-rate">Expected Return</label>
                    <div className="calc-value-box">
                      <DraftNumberInput
                        id="goal-rate"
                        value={returnRate}
                        min={0}
                        max={20}
                        onChange={setReturnRate}
                      />
                      <span className="calc-unit">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    className="calc-range-slider"
                    min="0"
                    max="20"
                    step="0.5"
                    value={returnRate}
                    style={rangeStyle(returnRate, 0, 20)}
                    onChange={(e) => setReturnRate(Number(e.target.value))}
                  />
                </div>

                <div className="calc-input-group">
                  <div className="calc-input-header">
                    <label htmlFor="goal-years">Investment Period</label>
                    <div className="calc-value-box">
                      <DraftNumberInput
                        id="goal-years"
                        value={years}
                        min={1}
                        max={50}
                        onChange={setYears}
                      />
                      <span className="calc-unit">Yrs</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    className="calc-range-slider"
                    min="1"
                    max="50"
                    value={years}
                    style={rangeStyle(years, 1, 50)}
                    onChange={(e) => setYears(Number(e.target.value))}
                  />
                </div>

                <div className="calc-results">
                  <div className={clsx("calc-result-card", "primary")}>
                    <span className="calc-result-label">Required Monthly SIP</span>
                    <h2>
                      {goalSip.valid ? <AnimatedNumber value={goalSip.monthlySip} /> : "-"}
                    </h2>
                  </div>
                </div>
              </>
            )}

            {mode === "duration" && (
              <>
                <p className="mode-hint">
                  See how long it'll take to reach your goal at this SIP amount.
                </p>

                <div className="calc-input-group">
                  <div className="calc-input-header">
                    <label htmlFor="dur-target">Target Amount</label>
                    <FormattedNumberInput
                      id="dur-target"
                      value={targetAmount}
                      min={100000}
                      max={100000000}
                      suffix="₹"
                      className="large-input"
                      onChange={setTargetAmount}
                    />
                  </div>
                  <input
                    type="range"
                    className="calc-range-slider"
                    min="100000"
                    max="100000000"
                    step="50000"
                    value={targetAmount}
                    style={rangeStyle(targetAmount, 100000, 100000000)}
                    onChange={(e) => setTargetAmount(Number(e.target.value))}
                  />
                </div>

                <div className="calc-input-group">
                  <div className="calc-input-header">
                    <label htmlFor="dur-monthly">Monthly Investment</label>
                    <FormattedNumberInput
                      id="dur-monthly"
                      value={monthlyInvestment}
                      min={0}
                      max={100000000}
                      suffix="₹"
                      onChange={setMonthlyInvestment}
                    />
                  </div>
                  <input
                    type="range"
                    className="calc-range-slider"
                    min="0"
                    max="100000000"
                    step="500"
                    value={monthlyInvestment}
                    style={rangeStyle(monthlyInvestment, 0, 100000000)}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  />
                </div>

                <div className="calc-input-group">
                  <div className="calc-input-header">
                    <label htmlFor="dur-rate">Expected Return</label>
                    <div className="calc-value-box">
                      <DraftNumberInput
                        id="dur-rate"
                        value={returnRate}
                        min={0}
                        max={20}
                        onChange={setReturnRate}
                      />
                      <span className="calc-unit">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    className="calc-range-slider"
                    min="0"
                    max="20"
                    step="0.5"
                    value={returnRate}
                    style={rangeStyle(returnRate, 0, 20)}
                    onChange={(e) => setReturnRate(Number(e.target.value))}
                  />
                </div>

                {!duration.valid ? (
                  <div className="empty-state">
                    {duration.reason === "empty"
                      ? "Enter a monthly amount above to calculate the time needed."
                      : "This target isn't reachable at the current monthly amount and return rate. Try increasing one of them."}
                  </div>
                ) : (
                  <div className="calc-results">
                    <div className={clsx("calc-result-card", "primary")}>
                      <span className="calc-result-label">Time to Reach Goal</span>
                      <h2>
                        {duration.immediate ? (
                          "Less than a month"
                        ) : (
                          <>
                            <AnimatedNumber value={duration.years} format={false} /> Yrs{" "}
                            <AnimatedNumber value={duration.remainingMonths} format={false} /> Months
                          </>
                        )}
                      </h2>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Chart & Results Panel */}
          <div className="calculator-chart-col">
            <div className="calc-chart-circle">
              <svg viewBox="0 0 240 240">
                {/* Outer ring: Invested arc */}
                <circle
                  cx="120"
                  cy="120"
                  r={currentChartData.outerRadius}
                  className={clsx("calc-chart-bg", "calc-chart-bg-outer")}
                />
                <circle
                  cx="120"
                  cy="120"
                  r={currentChartData.outerRadius}
                  className="calc-chart-invested"
                  strokeDasharray={`${currentChartData.outerCircumference} ${currentChartData.outerCircumference}`}
                  strokeDashoffset={currentChartData.investedOffset}
                  transform="rotate(-90 120 120)"
                  style={{ opacity: currentChartData.invested <= 0 ? 0 : 1 }}
                />

                {/* Inner ring: Gain arc */}
                <circle
                  cx="120"
                  cy="120"
                  r={currentChartData.innerRadius}
                  className={clsx("calc-chart-bg", "calc-chart-bg-inner")}
                />
                <circle
                  cx="120"
                  cy="120"
                  r={currentChartData.innerRadius}
                  className="calc-chart-gain"
                  strokeDasharray={`${currentChartData.innerCircumference} ${currentChartData.innerCircumference}`}
                  strokeDashoffset={currentChartData.gainOffset}
                  transform="rotate(-90 120 120)"
                  style={{ opacity: currentChartData.gain <= 0 ? 0 : 1 }}
                />
              </svg>

              <div
                className="calc-chart-center"
                style={{ "--center-font-size": currentChartData.centerFontSize }}
              >
                <h2><AnimatedNumber value={currentChartData.total} /></h2>
                <p>{currentChartData.label}</p>
              </div>
            </div>

            {/* Donut Chart Legend */}
            <div className="calc-legend">
              <div className="calc-legend-item">
                <span className={clsx("calc-legend-dot", "invested")}></span>
                <span>Invested</span>
              </div>
              <div className="calc-legend-item">
                <span className={clsx("calc-legend-dot", "gain")}></span>
                <span>Est. Returns</span>
              </div>
            </div>

            {/* Bottom Breakdown Cards */}
            <div className="calc-chart-details">
              <div className="calc-result-grid">
                <div className="calc-mini-result">
                  <span>Your Total Investment</span>
                  <strong className="val-invested" style={{ fontSize: currentChartData.investedFontSize }}>
                    <AnimatedNumber value={currentChartData.invested} />
                  </strong>
                </div>
                <div className="calc-mini-result">
                  <span>Your Total Returns</span>
                  <strong className="val-returns" style={{ fontSize: currentChartData.gainFontSize }}>
                    <AnimatedNumber value={currentChartData.gain} />
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