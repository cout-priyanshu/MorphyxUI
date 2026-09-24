import React, { useState } from "react";

const Button = ({
  children = "Explore Now",
  variant = "aurora",
  size = "medium",
  accent = "#8b5cf6",
  secondaryAccent = "#06b6d4",
  radius = 14,
  disabled = false,
  loading = false,
  fullWidth = false,
  icon = "→",
  showIcon = true,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const sizes = {
    small: {
      padding: "9px 15px",
      fontSize: 12,
      minHeight: 38,
    },
    medium: {
      padding: "13px 20px",
      fontSize: 14,
      minHeight: 48,
    },
    large: {
      padding: "16px 25px",
      fontSize: 16,
      minHeight: 56,
    },
  };

  const currentSize = sizes[size] || sizes.medium;

  const isDisabled = disabled || loading;

  const variants = {
    aurora: {
      background: `linear-gradient(110deg, ${accent}, ${secondaryAccent})`,
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.15)",
    },

    glass: {
      background: hovered
        ? "rgba(255,255,255,0.11)"
        : "rgba(255,255,255,0.055)",
      color: "#fff",
      border: `1px solid ${hovered ? accent : "rgba(255,255,255,0.12)"}`,
    },

    outline: {
      background: "transparent",
      color: accent,
      border: `1px solid ${accent}`,
    },

    dark: {
      background: hovered ? "#1f2937" : "#111827",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.1)",
    },
  };

  const currentVariant = variants[variant] || variants.aurora;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        ...currentSize,
        width: fullWidth ? "100%" : "auto",
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        overflow: "hidden",
        borderRadius: radius,
        fontFamily: "Inter, system-ui, sans-serif",
        fontWeight: 800,
        letterSpacing: 0.2,
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.55 : 1,
        transform: pressed
          ? "scale(0.96)"
          : hovered
          ? "translateY(-3px)"
          : "translateY(0)",
        boxShadow:
          hovered && !isDisabled
            ? `0 12px 35px ${accent}45`
            : "0 6px 20px rgba(0,0,0,0.18)",
        transition: "all 250ms cubic-bezier(.2,.8,.2,1)",
        ...currentVariant,
      }}
    >
      {/* Animated shine */}
      <span
        style={{
          position: "absolute",
          top: 0,
          left: hovered ? "120%" : "-60%",
          width: "45%",
          height: "100%",
          transform: "skewX(-20deg)",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)",
          transition: "left 550ms ease",
          pointerEvents: "none",
        }}
      />

      {/* Aurora glow */}
      <span
        style={{
          position: "absolute",
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: secondaryAccent,
          filter: "blur(30px)",
          opacity: hovered && !isDisabled ? 0.35 : 0,
          right: -25,
          top: -25,
          transition: "opacity 300ms ease",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      {loading ? (
        <>
          <span
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.3)",
              borderTopColor: "#fff",
              animation: "aurora-spin 0.7s linear infinite",
            }}
          />
          Processing...
        </>
      ) : (
        <>
          <span style={{ position: "relative", zIndex: 1 }}>
            {children}
          </span>

          {showIcon && (
            <span
              style={{
                position: "relative",
                zIndex: 1,
                display: "inline-flex",
                fontSize: size === "small" ? 14 : 17,
                transform: hovered ? "translateX(4px)" : "translateX(0)",
                transition: "transform 250ms ease",
              }}
            >
              {icon}
            </span>
          )}
        </>
      )}

      {/* Spinner animation */}
      <style>
        {`
          @keyframes aurora-spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </button>
  );
};

export { Button };