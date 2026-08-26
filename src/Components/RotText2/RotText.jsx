import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function RotatingText({
  text,
  duration = 2500,
  className = "",
}) {
  const words = Array.isArray(text) ? text : [text];

  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);

  const measureRef = useRef(null);

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (measureRef.current) {
        setWidth(measureRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [index]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, duration);

    return () => clearInterval(timer);
  }, [duration, words.length]);

  return (
    <>
      {/* Hidden element used only for measuring width */}
      <span
        ref={measureRef}
        className="rotating-measure"
      >
        {words[index]}
      </span>

      <motion.div
        className={`gradient-pill ${className}`}
        animate={{ width }}
        transition={{
          type: "spring",
          stiffness: 110,
          damping: 22,
          mass: 0.8,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            className="rotating-word"
            initial={{
              y: 35,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -35,
              opacity: 0,
            }}
            transition={{
              duration: 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </>
  );
}