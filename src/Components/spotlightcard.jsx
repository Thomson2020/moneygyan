import { useRef, useState } from "react";

export default function SpotlightCard({ title, description, badge, icon: Icon }) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      style={{
        position: "relative",
        borderRadius: "24px",
        border: "1px solid var(--card-border)",
        backgroundColor: "transparent",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        padding: "32px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.3s ease",
      }}
      className="spotlight-card"
    >
      {/* Dynamic Cursor Spotlight Effect */}
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          opacity,
          transition: "opacity 0.3s ease",
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(6, 182, 212, 0.15), transparent 40%)`,
        }}
      />

      {/* Card Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {badge && (
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "2px",
              color: "var(--primary)",
              textTransform: "uppercase",
              display: "inline-block",
              marginBottom: "12px",
            }}
          >
            {badge}
          </span>
        )}

        <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
          {title}
        </h3>

        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
          {description}
        </p>
      </div>
    </div>
  );
}