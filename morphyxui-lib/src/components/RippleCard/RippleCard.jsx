import React, { useState } from "react";

export const RippleCard = ({
  title = "Ripple Effect",
  description = "Experience the soothing flow of water with this elegant card.",
  accent = "#f43f5e",
  bg = "#0e0a0d",
  rippleColor = "#fbcfe8"
}) => {
  const [ripple, setRipple] = useState(false);

  const handleMouseDown = (e) => {
    setRipple(true);
    const ripple = e.currentTarget;
    const x = e.clientX - ripple.getBoundingClientRect().left;
    const y = e.clientY - ripple.getBoundingClientRect().top;
    ripple.style.setProperty("--ripple-x", x + "px");
    ripple.style.setProperty("--ripple-y", y + "px");
    setTimeout(() => setRipple(false), 600);
  };

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        position: "relative",
        background: bg,
        borderRadius: "20px",
        padding: "20px",
        width: "300px",
        color: "#f5eff2",
        fontFamily: "system-ui,sans-serif",
        boxShadow: "0 20px 50px rgba(0,0,0,0.85)",
        overflow: "hidden"
      }}
    >
      <h3 style={{ fontSize: "18px", fontWeight: "700", margin: "0 0 10px" }}>{title}</h3>
      <p style={{ fontSize: "14px", color: "rgba(245,239,242,0.7)", margin: "0" }}>{description}</p>
      {ripple && (
        <span style={{
          position: "absolute",
          borderRadius: "50%",
          background: rippleColor,
          width: "100px",
          height: "100px",
          left: "var(--ripple-x)",
          top: "var(--ripple-y)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          animation: "ripple 0.6s linear" 
        }} />
      )}
      <style>{`@keyframes ripple { to { transform: scale(4); opacity: 0; }}`}</style>
    </div>
  );
};