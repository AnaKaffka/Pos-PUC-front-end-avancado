import { useEffect, useRef, useState } from "react";

const revealVectors = {
  up: { x: "0px", y: "14px" },
  left: { x: "20px", y: "0px" },
  right: { x: "-20px", y: "0px" },
  down: { x: "0px", y: "-14px" },
};

function RevealBlock({
  children,
  className = "",
  delay = 0,
  direction = "up",
  style = {},
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const vector = revealVectors[direction] || revealVectors.up;

  useEffect(() => {
    if (!ref.current) {
      return undefined;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{
        "--reveal-delay": `${delay}ms`,
        "--reveal-x": vector.x,
        "--reveal-y": vector.y,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default RevealBlock;