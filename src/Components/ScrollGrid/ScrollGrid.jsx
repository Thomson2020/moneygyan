import { useEffect, useRef } from "react";
import "./ScrollGrid.css";

/**
 * Fixed, full-viewport dot-grid background that drifts vertically as the
 * page scrolls, at a fraction of scroll speed — a classic parallax "the
 * background is further away than the content" effect.
 *
 * Mount this ONCE near the root of the app (e.g. directly inside <App />,
 * before your routes/sections), not per-page.
 */
export default function ScrollGrid({ speed = 0.15 }) {
  const patternRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y = window.scrollY * speed;
      if (patternRef.current) {
        patternRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // set initial position (handles landing mid-scroll on refresh)

    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    <div className="scroll-grid" aria-hidden="true">
      <div className="scroll-grid-pattern" ref={patternRef} />
      <div className="scroll-grid-vignette" />
    </div>
  );
}
