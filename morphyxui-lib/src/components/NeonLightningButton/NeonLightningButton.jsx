import React from "react";

export const NeonLightningButton = ({ text = "Click Me", bg = "#1b1015", textColor = "#f5eff2", borderColor = "#f43f5e", size = "md", disabled = false, onClick = () => {} }) => {
  const sizes = { sm: "8px 16px", md: "11px 24px", lg: "14px 32px" };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: bg,
        color: textColor,
        padding: sizes[size],
        borderRadius: "10px",
        border: "2px solid " + borderColor,
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: "600",
        fontSize: "14px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        boxShadow: "0 0 5px " + borderColor + ", 0 0 10px " + borderColor + ", 0 0 15px " + borderColor,
        opacity: disabled ? 0.6 : 1,
        transition: "all 0.3s"
      }}
    >
      {text}
    </button>
  );
};