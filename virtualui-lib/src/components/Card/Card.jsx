import React, { useState } from "react";

const Card = ({
  title = "Create Without Limits",
  description = "Turn your ideas into something extraordinary.",
  buttonText = "Get Started",
  accent = "#8b5cf6",
  secondaryAccent = "#06b6d4",
  width = 380,
  radius = 28,
  icon = "✦",
}) => {
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);
  const [liked, setLiked] = useState(false);

  const glow = hover || active;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width,
        maxWidth: "100%",
        padding: 1,
        borderRadius: radius,
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(135deg, ${
          glow ? accent : "rgba(255,255,255,0.15)"
        }, ${glow ? secondaryAccent : "rgba(255,255,255,0.04)"})`,
        boxShadow: glow
          ? `0 25px 80px ${accent}35`
          : "0 20px 60px rgba(0,0,0,0.35)",
        transform: hover ? "translateY(-8px) scale(1.015)" : "translateY(0)",
        transition: "all 450ms cubic-bezier(.2,.8,.2,1)",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Aurora background */}
      <div
        style={{
          position: "absolute",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: accent,
          filter: "blur(70px)",
          opacity: glow ? 0.28 : 0.12,
          top: -90,
          right: -50,
          transition: "all 500ms ease",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: secondaryAccent,
          filter: "blur(65px)",
          opacity: glow ? 0.22 : 0.08,
          bottom: -80,
          left: -50,
          pointerEvents: "none",
        }}
      />

      {/* Main glass */}
      <div
        style={{
          position: "relative",
          padding: 26,
          borderRadius: radius - 1,
          overflow: "hidden",
          color: "#fff",
          background:
            "linear-gradient(145deg, rgba(18,18,30,0.96), rgba(8,8,15,0.98))",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 17,
              display: "grid",
              placeItems: "center",
              fontSize: 23,
              color: "#fff",
              background: `linear-gradient(135deg, ${accent}, ${secondaryAccent})`,
              boxShadow: `0 10px 30px ${accent}35`,
              transform: hover ? "rotate(-8deg) scale(1.08)" : "rotate(0)",
              transition: "all 350ms ease",
            }}
          >
            {icon}
          </div>

          <button
            onClick={() => setLiked(!liked)}
            aria-label="Like"
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.09)",
              background: "rgba(255,255,255,0.045)",
              color: liked ? "#fb7185" : "#777",
              fontSize: 19,
              cursor: "pointer",
              transition: "all 250ms ease",
              transform: liked ? "scale(1.12)" : "scale(1)",
            }}
          >
            {liked ? "♥" : "♡"}
          </button>
        </div>

        {/* Heading */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "6px 10px",
            marginBottom: 14,
            borderRadius: 999,
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            color: "#c4b5fd",
            background: `${accent}12`,
            border: `1px solid ${accent}25`,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: accent,
              boxShadow: `0 0 10px ${accent}`,
            }}
          />
          Featured
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: 31,
            lineHeight: 1.08,
            letterSpacing: -1.2,
            fontWeight: 850,
            background: `linear-gradient(90deg, #fff, #c4b5fd)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title}
        </h2>

        <p
          style={{
            margin: "14px 0 26px",
            color: "rgba(255,255,255,0.52)",
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          {description}
        </p>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
            marginBottom: 22,
          }}
        >
          {[
            ["01", "Idea"],
            ["∞", "Possibilities"],
            ["24/7", "Creative"],
          ].map(([value, label]) => (
            <div
              key={label}
              style={{
                padding: "12px 8px",
                textAlign: "center",
                borderRadius: 15,
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.055)",
              }}
            >
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#fff",
                }}
              >
                {value}
              </div>
              <div
                style={{
                  marginTop: 3,
                  fontSize: 9,
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase",
                  letterSpacing: 0.7,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => setActive(!active)}
          style={{
            width: "100%",
            height: 52,
            border: "none",
            borderRadius: 16,
            cursor: "pointer",
            color: "#fff",
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 0.2,
            background: active
              ? "rgba(255,255,255,0.07)"
              : `linear-gradient(100deg, ${accent}, ${secondaryAccent})`,
            boxShadow: active ? "none" : `0 12px 30px ${accent}30`,
            transition: "all 300ms ease",
          }}
        >
          {active ? "✓  You're In" : `${buttonText}  →`}
        </button>

        {/* Bottom indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 18,
            color: "rgba(255,255,255,0.3)",
            fontSize: 10,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: active ? "#34d399" : "#64748b",
              boxShadow: active ? "0 0 12px #34d399" : "none",
              transition: "all 300ms ease",
            }}
          />
          {active ? "Experience activated" : "Ready when you are"}
        </div>
      </div>
    </div>
  );
};

export { Card };